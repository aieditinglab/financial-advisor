"use client";

import Link from "next/link";

const features = [
  {
    title: "Profit per item",
    description:
      "See your true margin on every flip after COGS, fees, and shipping. Know if you actually made money before celebrating.",
  },
  {
    title: "COGS & expenses",
    description:
      "Log what you paid — sourcing, prep, storage. Bulk import from spreadsheets. Cost-per-unit done automatically.",
  },
  {
    title: "Tax estimates",
    description:
      "Quarterly estimates and a year-end summary built for the 1099 grind. Hand it to your CPA and skip the spreadsheet shuffle.",
  },
  {
    title: "Cash flow dashboard",
    description:
      "Money in, money out, in real time. Know when to reinvest in inventory and when to hold back.",
  },
  {
    title: "Platform fee calculator",
    description:
      "eBay, StockX, Amazon FBA, Depop, Whatnot, Mercari. See your net payout before you list anything.",
  },
  {
    title: "AI insights",
    description:
      "Plain-English answers about your numbers. Best categories, slipping margins, what's tying up cash. *",
  },
];

export default function Services() {
  return (
    <section
      id="features"
      style={{
        background: "var(--surface)",
        padding: "7rem 1.5rem",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem", maxWidth: "640px" }}>
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
            Features
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
            Everything a reseller actually needs.
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              fontSize: "1.05rem",
              maxWidth: "560px",
            }}
          >
            No accounting degree required. Just the numbers that tell you whether your
            resale business is actually working — and where to fix it if it isn&apos;t.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            borderTop: "1px solid var(--border-subtle)",
            borderLeft: "1px solid var(--border-subtle)",
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{
                padding: "1.75rem",
                borderRight: "1px solid var(--border-subtle)",
                borderBottom: "1px solid var(--border-subtle)",
                background: "var(--surface)",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--paper-soft)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
            >
              <div
                className="mono"
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  marginBottom: "1rem",
                  letterSpacing: "0.08em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                className="serif"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  color: "var(--ink)",
                  marginBottom: "0.55rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.92rem",
                  lineHeight: 1.6,
                }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: "1.5rem", color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.55 }}>
          * AI-powered features are informational only and do not constitute financial,
          tax, or legal advice. Always verify important decisions with a qualified
          professional.{" "}
          <Link href="/disclaimer" style={{ color: "var(--accent-deep)" }}>
            Read the full disclaimer →
          </Link>
        </p>
      </div>
    </section>
  );
}
