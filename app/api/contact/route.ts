import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// Initialize Resend lazily to avoid build-time errors
const getResend = () => {
  return new Resend(process.env.RESEND_API_KEY || "");
};

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Escape HTML to prevent XSS
    const escapeHtml = (text: string) => {
      const map: { [key: string]: string } = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    // Send email using Resend
    // Using verified domain morhaf.me for production
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Portfolio Contact <contact@morhaf.me>";
    const toEmail = process.env.RESEND_TO_EMAIL || "ghzielmorhaf@gmail.com";

    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Portfolio Contact: ${safeSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap;">
                ${safeMessage}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error details:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        {
          error: "Failed to send email",
          details: error.message || "Unknown error occurred",
        },
        { status: 500 }
      );
    }

    if (!data) {
      console.error("No data returned from Resend");
      return NextResponse.json(
        { error: "Failed to send email - no response from email service" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Internal server error",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
