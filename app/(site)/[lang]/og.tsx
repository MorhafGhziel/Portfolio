import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Google serves woff2 to modern browsers, which the image renderer can't
 * read — an old UA string gets a TTF instead. Any failure falls back to the
 * built-in sans rather than breaking the build.
 */
async function font(family: string, text: string, italic = false): Promise<ArrayBuffer | null> {
  try {
    const spec = italic ? `${family}:ital@1` : family;
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${spec}&text=${encodeURIComponent(text)}`,
      { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Version/5.1 Safari/534.30" } },
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

function dataUrl(publicPath: string): string | null {
  try {
    const b = readFileSync(path.join(process.cwd(), "public", publicPath));
    return `data:image/jpeg;base64,${b.toString("base64")}`;
  } catch {
    return null;
  }
}

/** One card for every page: a line in grotesk, one word in the italic serif. */
export async function og({ lead, accent, kicker, image }: { lead: string; accent: string; kicker: string; image?: string }) {
  const [sans, serif] = await Promise.all([
    font("Geist:wght@500", lead + kicker + "murhaf.site"),
    font("Instrument+Serif", accent, true),
  ]);
  const bg = image ? dataUrl(image) : null;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0b0b0c", color: "#f2f0eb", fontFamily: "Geist" }}>
        {bg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bg} alt="" width={1200} height={750} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 750, objectFit: "cover", opacity: 0.55 }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(180deg,#09090f 0%,#1b1829 35%,#4b3e5e 55%,#d69270 72%,#2a1f28 80%,#0b0b0c 100%)" }} />
        )}
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(180deg, rgba(11,11,12,0.2) 0%, rgba(11,11,12,0.85) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, letterSpacing: 3, color: "#d4d0c9" }}>
            <div style={{ width: 9, height: 9, borderRadius: 9, background: "#f2a76b" }} />
            {kicker.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1, letterSpacing: -3 }}>
            <span>{lead}</span>
            <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", letterSpacing: -1, fontSize: 100 }}>{accent}</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#9a9791" }}>murhaf.site</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        ...(sans ? [{ name: "Geist", data: sans, weight: 500 as const, style: "normal" as const }] : []),
        ...(serif ? [{ name: "Instrument Serif", data: serif, weight: 400 as const, style: "italic" as const }] : []),
      ],
    },
  );
}
