import { ImageResponse } from "next/og";

const size = { width: 1200, height: 630 };

const INK = "#0a0a0b";
const BONE = "#f4f1ec";
const MUTE = "#8b8b93";
const DIM = "#5a5a62";
const LINE = "#232328";
const COPPER = "#cc9166";

/**
 * Google serves woff2 to modern browsers, which the image renderer can't
 * read — an old UA string gets us a TTF instead. If anything here fails we
 * fall back to the built-in sans rather than breaking the build.
 */
async function loadDisplayFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Instrument+Serif&text=${encodeURIComponent(text)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Version/5.1 Safari/534.30",
        },
      }
    ).then((r) => r.text());

    const url = css.match(/src: url\((.+?)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

const HEADLINE = "Full-stack developer who ships.";

const LEDGER = [
  ["05", "Years shipping"],
  ["18", "Projects built"],
  ["04", "Client builds"],
];

export default async function OgImage() {
  const fontData = await loadDisplayFont(HEADLINE + "MorhafGhziel0123456789");
  const display = fontData ? "Instrument Serif" : "serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "64px 72px",
          color: BONE,
        }}
      >
        {/* Status */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: COPPER,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 4,
              color: COPPER,
            }}
          >
            AVAILABLE FOR WORK
          </div>
          <div style={{ display: "flex", fontSize: 21, color: DIM }}>/</div>
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 4,
              color: MUTE,
            }}
          >
            RIYADH · GMT+3
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: display,
            fontSize: 128,
            lineHeight: 1.02,
            letterSpacing: -3,
            maxWidth: 940,
          }}
        >
          {HEADLINE}
        </div>

        {/* Ledger */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: BONE }}>
            Morhaf Ghziel
          </div>

          <div style={{ display: "flex", gap: 64 }}>
            {LEDGER.map(([value, label]) => (
              <div
                key={label}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <div
                  style={{
                    display: "flex",
                    fontFamily: display,
                    fontSize: 44,
                    color: BONE,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 18,
                    letterSpacing: 3,
                    color: DIM,
                  }}
                >
                  {label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "Instrument Serif",
              data: fontData,
              style: "normal",
              weight: 400,
            },
          ]
        : undefined,
    }
  );
}
