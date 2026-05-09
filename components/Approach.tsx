"use client";

import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Sign up in 30 seconds",
    description:
      "Email and password. We send a 6-digit code for two-step verification, then you're in.",
  },
  {
    number: "02",
    title: "Add your first item",
    description:
      "Log what you paid, where you sold it, fees, and shipping. We do the math on your real margin.",
  },
  {
    number: "03",
    title: "Watch profit update live",
    description:
      "Your dashboard fills in as you log items. See your best categories, your worst, and where cash is tied up.",
  },
  {
    number: "04",
    title: "Plan smarter with AI",
    description:
      "Ask plain-English questions about your numbers and get clear answers — no spreadsheets required.",
  },
];

export default function Approach() {
  return (
    <section
      id="how"
      style={{
        background: "var(--paper)",
        padding: "7rem 1.5rem",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="approach-grid"
        >
          <div>
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
              How it works
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                fontWeight: 500,
                color: "var(--ink)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              Set up in minutes. Insights in seconds.
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontSize: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              Most resellers run their business on gut feeling and a rough idea of what
              they paid for something. FlipLedger replaces guesswork with real numbers,
              so you can make faster, smarter decisions on every flip.
            </p>
            <Link
              href="/signup"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--accent-deep)",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              Get started free
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div>
            {steps.map((s, i) => (
              <div
                key={s.number}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  padding: "1.5rem 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)",
                }}
              >
                <span
                  className="mono"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    flexShrink: 0,
                    paddingTop: "5px",
                  }}
                >
                  {s.number}
                </span>
                <div>
                  <h3
                    className="serif"
                    style={{
                      color: "var(--ink)",
                      fontSize: "1.15rem",
                      fontWeight: 500,
                      marginBottom: "0.4rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: 1.6 }}>
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .approach-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
