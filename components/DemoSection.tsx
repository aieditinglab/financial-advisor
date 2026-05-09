"use client";

import dynamic from "next/dynamic";

// Player + Remotion are heavy; load on the client only.
const RemotionDemo = dynamic(() => import("@/components/RemotionDemo"), { ssr: false });

export default function DemoSection() {
  return (
    <section
      id="demo"
      style={{
        background: "var(--surface)",
        padding: "5.5rem 1.5rem",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            color: "var(--accent-deep)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "0.85rem",
          }}
        >
          Watch a 30-second demo
        </span>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(1.85rem, 4vw, 2.6rem)",
            fontWeight: 500,
            color: "var(--ink)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            marginBottom: "0.75rem",
          }}
        >
          See how it works.
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            lineHeight: 1.55,
            maxWidth: "560px",
            margin: "0 auto 2.25rem",
          }}
        >
          Add an item, watch your dashboard fill in, get plain-English insights —
          all in under a minute.
        </p>
        <RemotionDemo />
      </div>
    </section>
  );
}
