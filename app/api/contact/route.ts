import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

/**
 * The contact form's endpoint.
 *
 * Needs RESEND_API_KEY (and optionally RESEND_FROM_EMAIL / RESEND_TO_EMAIL).
 * Without the key it answers 503, and the form tells the visitor to email
 * directly — it never pretends a message went out.
 */

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().max(200),
  message: z.string().trim().min(1).max(10000),
  projectType: z.enum(["website", "ecommerce", "webapp", "interactive", "other"]),
  budget: z.string().max(40).optional(),
  timeline: z.string().max(40).optional(),
  locale: z.enum(["en", "ar"]).optional(),
  website: z.string().max(200).optional(), // honeypot
});

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[m]!);

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }
  const d = parsed.data;

  // A filled honeypot is a bot. Answer like a success so it moves on.
  if (d.website) return NextResponse.json({ ok: true });

  const subject = [d.projectType, d.budget, d.timeline].filter(Boolean).join(" · ");

  // Stored and emailed independently: if one path is down, the lead survives
  // in the other.
  await prisma.contactMessage
    .create({
      data: {
        name: d.name,
        email: d.email,
        subject: subject.slice(0, 300),
        message: d.message,
        country: request.headers.get("x-vercel-ip-country"),
      },
    })
    .catch((e) => console.error("[contact] could not store message:", e));

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "Email is not configured" }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ["Project", d.projectType],
    ["Budget", d.budget ?? "—"],
    ["Timeline", d.timeline ?? "—"],
    ["Language", d.locale ?? "—"],
  ];
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Portfolio Contact <contact@murhaf.site>",
    to: [process.env.RESEND_TO_EMAIL || "ghzielmorhaf@gmail.com"],
    replyTo: d.email,
    subject: `New project: ${subject}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px">
      ${rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v)}</p>`).join("")}
      <p style="white-space:pre-wrap;background:#f5f5f5;padding:14px;border-radius:6px">${escapeHtml(d.message)}</p>
    </div>`,
  });

  if (error || !data) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, id: data.id });
}
