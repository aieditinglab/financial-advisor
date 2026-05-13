import type { Metadata } from "next";
import ShapeYourselfAdPlayer from "@/components/ShapeYourselfAdPlayer";

const SHAPE_URL =
  "https://shapeyourself.us/?utm_source=ad&utm_medium=remotion&utm_campaign=launch";

export const metadata: Metadata = {
  title: "Shape Yourself — The drop is live",
  description:
    "Premium streetwear designed for those who refuse to fit a mold. Bold by design. Built to last. Released in limited drops.",
  openGraph: {
    title: "Shape Yourself — The drop is live",
    description:
      "Premium streetwear designed for those who refuse to fit a mold. Try Shape Yourself today.",
    url: SHAPE_URL,
    siteName: "Shape Yourself",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shape Yourself — The drop is live",
    description: "Premium streetwear. Bold by design. Built to last.",
  },
};

export default function ShapeYourselfAdPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--paper)",
        color: "var(--ink)",
        paddingBottom: "6rem",
      }}
    >
      {/* Editorial nav */}
      <header
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "1.6rem 1.5rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            fontFamily: "var(--font-mono-app), ui-monospace, monospace",
            fontSize: "0.78rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
            }}
          />
          Shape Yourself · The Ad
        </div>
        <a
          href={SHAPE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono-app), ui-monospace, monospace",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent-hover)",
          }}
        >
          shapeyourself.us ↗
        </a>
      </header>

      {/* Hero copy */}
      <section
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "3.2rem 1.5rem 1.6rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono-app), ui-monospace, monospace",
            fontSize: "0.78rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--accent-hover)",
            marginBottom: "1.1rem",
          }}
        >
          A 28-second film
        </div>
        <h1
          className="serif-display"
          style={{
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
            margin: 0,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
          }}
        >
          The best clothing brand?
          <br />
          <span style={{ fontStyle: "italic", color: "var(--accent-hover)" }}>
            Shape Yourself.
          </span>
        </h1>
        <p
          style={{
            maxWidth: 640,
            margin: "1.4rem auto 0",
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.55,
          }}
        >
          A motion-graphics ad for shapeyourself.us. Press play for the full
          experience — AI voiceover, editorial motion design, and a one-tap path
          to the drop.
        </p>
      </section>

      {/* Player */}
      <section style={{ padding: "1.6rem 1.5rem 0" }}>
        <ShapeYourselfAdPlayer />
      </section>

      {/* Closing CTA strip */}
      <section
        style={{
          maxWidth: 980,
          margin: "4rem auto 0",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            borderRadius: 22,
            padding: "3rem 2.6rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            flexWrap: "wrap",
            boxShadow: "0 40px 100px -40px rgba(20,20,20,0.55)",
          }}
        >
          <div style={{ maxWidth: 520 }}>
            <div
              style={{
                fontFamily: "var(--font-mono-app), ui-monospace, monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "0.9rem",
              }}
            >
              The drop is live
            </div>
            <h2
              className="serif-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--paper)",
              }}
            >
              Try{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Shape Yourself
              </span>{" "}
              today.
            </h2>
            <p
              style={{
                marginTop: "0.9rem",
                color: "rgba(250,249,246,0.7)",
                fontSize: "1rem",
                lineHeight: 1.55,
              }}
            >
              Limited drops. Heavyweight cotton. No restocks.
            </p>
          </div>

          <a
            href={SHAPE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.7rem",
              background: "var(--accent)",
              color: "#fff",
              padding: "1rem 1.8rem",
              borderRadius: 999,
              fontSize: "1.05rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
              boxShadow: "0 18px 40px rgba(217,119,87,0.45)",
            }}
          >
            Shop the Collection
            <span aria-hidden style={{ fontSize: "1.15rem", lineHeight: 1 }}>
              →
            </span>
          </a>
        </div>

        <div
          style={{
            marginTop: "1.4rem",
            textAlign: "center",
            fontFamily: "var(--font-mono-app), ui-monospace, monospace",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          <a
            href={SHAPE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-secondary)" }}
          >
            shapeyourself.us ↗
          </a>
        </div>
      </section>
    </main>
  );
}
