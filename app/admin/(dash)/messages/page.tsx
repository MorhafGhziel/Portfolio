import { EmptyState, countryFlag, countryName } from "@/components/admin/ui";
import { prisma } from "@/lib/db";
import { load } from "@/lib/analytics/page-helpers";
import { deleteMessage, toggleRead, toggleReplied } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Messages" };

const PAGE_SIZE = 50;

export default async function MessagesPage() {
  const { data, error } = await load(async () => {
    const [messages, unread] = await Promise.all([
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: PAGE_SIZE,
      }),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);
    return { messages, unread };
  });

  if (error) {
    return <EmptyState title="Messages are not available" hint={error} />;
  }
  if (!data) return null;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="display d-sm text-ink">Messages</h1>
        {data.unread > 0 && (
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
            {data.unread} unread
          </span>
        )}
      </div>

      {data.messages.length === 0 ? (
        <EmptyState
          title="No messages yet."
          hint="Submissions from the contact form are stored here as well as emailed to you, so nothing is lost if an email goes astray."
        />
      ) : (
        <ul className="space-y-3">
          {data.messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-[6px] border bg-surface p-5 ${
                m.read ? "border-line" : "border-accent/40"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{m.subject}</p>
                  <p className="mt-0.5 truncate text-sm text-ink-muted">
                    {m.name} ·{" "}
                    <a href={`mailto:${m.email}`} className="ulink">
                      {m.email}
                    </a>
                    {m.country && (
                      <>
                        {" · "}
                        {countryFlag(m.country)} {countryName(m.country)}
                      </>
                    )}
                  </p>
                </div>
                <time
                  dateTime={m.createdAt.toISOString()}
                  className="shrink-0 font-mono text-[0.6875rem] tabular-nums text-ink-dim"
                >
                  {m.createdAt.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              <p className="mt-3 whitespace-pre-line border-t border-line pt-3 text-sm text-ink-muted">
                {m.message}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Action
                  action={toggleRead.bind(null, m.id, !m.read)}
                  label={m.read ? "Mark unread" : "Mark read"}
                />
                <Action
                  action={toggleReplied.bind(null, m.id, !m.replied)}
                  label={m.replied ? "Replied ✓" : "Mark replied"}
                  active={m.replied}
                />
                <a
                  href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted transition-colors duration-300 hover:border-line-2 hover:text-ink"
                >
                  Reply
                </a>
                <span className="ml-auto">
                  <Action
                    action={deleteMessage.bind(null, m.id)}
                    label="Delete"
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/**
 * A one-button form. Server actions need a form to post to, and this keeps the
 * page a server component — no client JavaScript is shipped for these controls.
 */
function Action({
  action,
  label,
  active = false,
}: {
  action: () => Promise<void>;
  label: string;
  active?: boolean;
}) {
  return (
    <form action={action}>
      <button
        type="submit"
        className={`rounded-full border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors duration-300 ${
          active
            ? "border-accent/50 bg-accent/10 text-accent"
            : "border-line text-ink-muted hover:border-line-2 hover:text-ink"
        }`}
      >
        {label}
      </button>
    </form>
  );
}
