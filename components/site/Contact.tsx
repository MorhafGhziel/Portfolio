"use client";

import { useState } from "react";
import type { Copy } from "@/content/copy";
import type { Locale } from "@/content/types";
import { SETTINGS } from "@/content/settings";
import { track } from "@/lib/analytics/client";

type Props = { lang: Locale; copy: Copy["contact"] };

type Errors = Partial<Record<"name" | "email" | "type" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const TYPES = ["website", "ecommerce", "webapp", "interactive", "other"] as const;

export default function Contact({ lang, copy }: Props) {
  const [copied, setCopied] = useState(false);
  const [type, setType] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState("");

  const wa = `https://wa.me/${SETTINGS.whatsapp}?text=${encodeURIComponent(copy.whatsappText)}`;

  const copyEmail = async (e: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(SETTINGS.email);
      e.preventDefault();
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // No clipboard: let the mailto link do its job.
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = copy.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = copy.errors.email;
    if (!type) next.type = copy.errors.type;
    if (message.length < 10) next.message = copy.errors.message;
    setErrors(next);
    if (Object.keys(next).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"], [data-field="${Object.keys(next)[0]}"] button`);
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          projectType: type,
          budget: budget || undefined,
          timeline: timeline || undefined,
          website: String(fd.get("website") ?? ""), // honeypot
          locale: lang,
        }),
      });
      if (res.status === 400) {
        // The server is stricter than the checks above (e.g. "a@b.c"); show it on the field.
        const { fields = [] } = (await res.json().catch(() => ({}))) as { fields?: string[] };
        const map: Record<string, keyof Errors> = { name: "name", email: "email", message: "message", projectType: "type" };
        const bad: Errors = {};
        for (const f of fields) if (map[f]) bad[map[f]] = copy.errors[map[f]];
        if (Object.keys(bad).length) {
          setErrors(bad);
          setStatus("idle");
          return;
        }
      }
      if (!res.ok) throw new Error(String(res.status));
      setSentTo(email);
      setStatus("sent");
      track("contact_submit", { locale: lang });
      form.reset();
      setType("");
      setBudget("");
      setTimeline("");
    } catch {
      setStatus("error");
    }
  };

  const chips = (
    field: string,
    value: string,
    set: (v: string) => void,
    items: { id: string; label: string }[],
    label: string,
    optional?: boolean,
  ) => (
    <fieldset className="field" data-field={field} aria-describedby={errors[field as keyof Errors] ? `${field}-err` : undefined}>
      <legend>
        {label}
        {optional && <span className="field__opt"> · {copy.optional}</span>}
      </legend>
      <div className="chips">
        {items.map((it) => (
          <button
            type="button"
            key={it.id}
            className="chip"
            aria-pressed={value === it.id}
            onClick={() => {
              set(value === it.id ? "" : it.id);
              if (field === "type") setErrors((e) => ({ ...e, type: undefined }));
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
      {errors[field as keyof Errors] && (
        <p className="field__err" id={`${field}-err`} role="alert">
          {errors[field as keyof Errors]}
        </p>
      )}
    </fieldset>
  );

  return (
    <div className="contact__grid">
      <div className="contact__direct">
        <p className="contact__lead">
          {copy.lead} {SETTINGS.responseTime[lang]}.
        </p>
        <a className="direct" href={`mailto:${SETTINGS.email}`} onClick={copyEmail} data-cursor={copied ? "✓" : "COPY"}>
          <span className="mono direct__k">{copy.email}</span>
          <span className="direct__v" dir="ltr">
            {SETTINGS.email}
          </span>
          <span className="mono direct__act" aria-live="polite">
            {copied ? `${copy.copied} ✓` : copy.copy}
          </span>
        </a>
        <a className="direct" href={wa} target="_blank" rel="noopener" onClick={() => track("outbound_click", { name: "whatsapp", locale: lang })}>
          <span className="mono direct__k">{copy.whatsapp}</span>
          <span className="direct__v" dir="ltr">
            +{SETTINGS.whatsapp.replace(/^(\d{3})(\d{2})(\d{3})(\d{4})$/, "$1 $2 $3 $4")}
          </span>
          <span className="mono direct__act">{copy.whatsappOpen} ↗</span>
        </a>
      </div>

      <form className="form" noValidate onSubmit={submit}>
        {status === "sent" ? (
          <div className="form__done" role="status">
            <svg className="form__check" viewBox="0 0 52 52" aria-hidden="true">
              <circle cx="26" cy="26" r="24" />
              <path d="M16 26.5l7 7 13-14" />
            </svg>
            <h3>{copy.sentTitle}</h3>
            <p>
              {copy.sentLine.replace("{time}", SETTINGS.responseTime[lang])}{" "}
              <b dir="ltr">{sentTo}</b>
            </p>
            <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")}>
              {copy.sendAnother}
            </button>
          </div>
        ) : (
          <>
            <h3 className="form__title">{copy.formTitle}</h3>
            <div className="form__row">
              <label className="field">
                <span>{copy.name}</span>
                <input
                  name="name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-err" : undefined}
                />
                {errors.name && (
                  <em className="field__err" id="name-err" role="alert">
                    {errors.name}
                  </em>
                )}
              </label>
              <label className="field">
                <span>{copy.emailField}</span>
                <input
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  dir="ltr"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-err" : undefined}
                />
                {errors.email && (
                  <em className="field__err" id="email-err" role="alert">
                    {errors.email}
                  </em>
                )}
              </label>
            </div>
            {chips("type", type, setType, TYPES.map((t) => ({ id: t, label: copy.types[t] })), copy.type)}
            {chips("budget", budget, setBudget, SETTINGS.budgets.map((b) => ({ id: b.id, label: b.label[lang] })), copy.budget, true)}
            {chips("timeline", timeline, setTimeline, SETTINGS.timelines.map((b) => ({ id: b.id, label: b.label[lang] })), copy.timeline, true)}
            <label className="field">
              <span>{copy.message}</span>
              <textarea
                name="message"
                rows={5}
                placeholder={copy.messagePh}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-err" : undefined}
              />
              {errors.message && (
                <em className="field__err" id="message-err" role="alert">
                  {errors.message}
                </em>
              )}
            </label>
            {/* Honeypot: invisible to people, tempting to bots. */}
            <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form__foot">
              <button className="btn btn--light" type="submit" disabled={status === "sending"}>
                {status === "sending" ? copy.sending : copy.send}
              </button>
              {status === "error" && (
                <p className="field__err" role="alert">
                  {copy.errors.server} <a href={`mailto:${SETTINGS.email}`}>{SETTINGS.email}</a>
                </p>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
