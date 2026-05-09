"use client";

const pillars = [
  {
    label: "Simple",
    title: "No spreadsheets required.",
    description:
      "We built FlipLedger because most resellers were tracking profits in Google Sheets — or not at all. You shouldn't need an accounting degree to know if you made money.",
  },
  {
    label: "Universal",
    title: "Built for every seller.",
    description:
      "Whether you flip 5 items a month or 500, the same clean interface scales with you. Teen sellers, side hustlers, full-time resellers — same tool, same simplicity.",
  },
  {
    label: "Smart",
    title: "AI that speaks reseller.",
    description:
      "COGS, sell-through, platform fees, quarterly taxes. Ask plain-English questions and get answers that actually make sense for your business.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "var(--surface)",
        padding: "7rem 1.5rem",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem", maxWidth: "620px" }}>
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
            Why FlipLedger
          </span>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: 500,
              color: "var(--ink)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Built for resellers who want real numbers.
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              fontSize: "1.05rem",
            }}
          >
            Reselling is a real business. It deserves real financial tools — not a
            recycled accounting app that makes you feel like you need a CPA to use it.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {pillars.map((p) => (
            <div
              key={p.title}
              className="fl-lift"
              style={{
                background: "var(--paper-soft)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "1.75rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  color: "var(--accent-deep)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                {p.label}
              </span>
              <h3
                className="serif"
                style={{
                  color: "var(--ink)",
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  marginBottom: "0.6rem",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.25,
                }}
              >
                {p.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
