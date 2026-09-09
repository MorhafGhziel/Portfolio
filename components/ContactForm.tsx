"use client";

import { useId, useState } from "react";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { track } from "@/lib/analytics/client";

type Field = "name" | "email" | "subject" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { t } = useLanguage();
  const uid = useId();

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const validate = (v: Values): Errors => {
    const next: Errors = {};
    if (!v.name.trim()) next.name = t("contact.form.errors.name");
    if (!v.email.trim()) next.email = t("contact.form.errors.email");
    else if (!EMAIL_RE.test(v.email.trim()))
      next.email = t("contact.form.errors.emailInvalid");
    if (!v.subject.trim()) next.subject = t("contact.form.errors.subject");
    if (!v.message.trim()) next.message = t("contact.form.errors.message");
    return next;
  };

  const set = (field: Field) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    // Clear an error as soon as the person starts fixing it, never before.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document
        .getElementById(`${uid}-${Object.keys(found)[0]}`)
        ?.focus({ preventScroll: false });
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues(EMPTY);
      toast.success(t("contact.form.sent"));
      track("contact_submit");
    } catch {
      setStatus("idle");
      toast.error(t("contact.form.failed"));
    }
  };

  const fieldClass = (field: Field) =>
    `w-full border-b bg-transparent py-3 text-[0.9375rem] text-ink placeholder:text-ink-dim outline-none transition-colors duration-300 ${
      errors[field] ? "border-accent" : "border-line focus:border-ink"
    }`;

  const rows: { field: Field; type?: string; help?: string }[] = [
    { field: "name" },
    { field: "email", type: "email", help: t("contact.form.emailHelp") },
    { field: "subject" },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {rows.map(({ field, type, help }) => (
        <div key={field}>
          <label
            htmlFor={`${uid}-${field}`}
            className="eyebrow block text-ink-dim"
          >
            {t(`contact.form.${field}`)}
          </label>
          <input
            id={`${uid}-${field}`}
            name={field}
            type={type ?? "text"}
            value={values[field]}
            onChange={set(field)}
            placeholder={t(`contact.form.${field}Placeholder`)}
            aria-invalid={Boolean(errors[field])}
            aria-describedby={
              errors[field]
                ? `${uid}-${field}-error`
                : help
                  ? `${uid}-${field}-help`
                  : undefined
            }
            autoComplete={
              field === "name" ? "name" : field === "email" ? "email" : "off"
            }
            className={`mt-2 ${fieldClass(field)}`}
          />
          {errors[field] ? (
            <p
              id={`${uid}-${field}-error`}
              role="alert"
              className="mt-2 text-[0.8125rem] text-accent"
            >
              {errors[field]}
            </p>
          ) : help ? (
            <p id={`${uid}-${field}-help`} className="mt-2 text-[0.8125rem] text-ink-dim">
              {help}
            </p>
          ) : null}
        </div>
      ))}

      <div>
        <label htmlFor={`${uid}-message`} className="eyebrow block text-ink-dim">
          {t("contact.form.message")}
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          placeholder={t("contact.form.messagePlaceholder")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          className={`mt-2 resize-y ${fieldClass("message")}`}
        />
        {errors.message && (
          <p
            id={`${uid}-message-error`}
            role="alert"
            className="mt-2 text-[0.8125rem] text-accent"
          >
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-[4px] bg-accent px-6 py-3.5 text-[0.9375rem] font-medium tracking-[-0.01em] text-canvas shadow-[0_6px_24px_-8px_var(--accent-glow)] transition-colors duration-300 hover:bg-accent-hover active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "sending" && (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          )}
          {status === "sending"
            ? t("contact.form.sending")
            : t("contact.form.send")}
        </button>

        {status === "sent" && (
          <p
            role="status"
            className="inline-flex items-center gap-2 text-[0.875rem] text-ink-muted"
          >
            <Check className="h-4 w-4 text-accent" aria-hidden />
            {t("contact.form.sent")}
          </p>
        )}
      </div>
    </form>
  );
}
