import { Fragment, type ElementType } from "react";

/**
 * A section title in the site's mixed type: grotesk, with *starred* words in
 * the italic serif. Each forced line ("\n") is its own mask so lines rise in
 * sequence. Arabic is never split below the line.
 */
export default function Title({
  text,
  as: Tag = "h2",
  className = "",
  reveal = true,
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  reveal?: boolean;
  id?: string;
}) {
  const lines = text.split("\n");
  return (
    <Tag id={id} className={`title ${className}`} {...(reveal ? { "data-reveal": "" } : {})}>
      {lines.map((line, li) => (
        <span className="ln" key={li} style={{ ["--l" as string]: li }}>
          <span>
            {line.split(/(\*[^*]+\*)/g).map((part, i) =>
              part.startsWith("*") && part.endsWith("*") ? (
                <em key={i} className="serif">
                  {part.slice(1, -1)}
                </em>
              ) : (
                <Fragment key={i}>{part}</Fragment>
              ),
            )}
          </span>
        </span>
      ))}
    </Tag>
  );
}
