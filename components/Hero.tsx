"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      style={{
        background: "var(--paper)",
        position: "relative",
        overflow: "hidden",
        padding: "9rem 1.5rem 5rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <div style={{ maxWidth: "760px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              padding: "5px 14px",
              marginBottom: "1.75rem",
              fontSize: "0.78rem",
              color: "var(--text-secondary)",
              fontWeight: 500,
            }}
          >
            <span
              className="fl-pulse-dot"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            Built for resellers · eBay, StockX, Depop, Whatnot, Amazon &amp; more
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)",
              fontWeight: 500,
              color: "var(--ink)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              marginBottom: "1.5rem",
            }}
          >
            Reseller finance,
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--accent-deep)",
              }}
            >
              made simple.
            </em>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 1.9vw, 1.2rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "2.25rem",
              maxWidth: "600px",
            }}
          >
            Track real profit on every flip — after platform fees, shipping, and taxes.
            Whether you're moving 5 items a month or 500, FlipLedger replaces guesswork
            with numbers you can actually trust.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
            <Link
              href="/signup"
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
                padding: "0.85rem 1.6rem",
                borderRadius: "10px",
                fontWeight: 500,
                fontSize: "0.95rem",
                transition: "background 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--ink-2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--ink)";
              }}
            >
              Start tracking — it's free
            </Link>
            <a
              href="#features"
              style={{
                color: "var(--ink)",
                padding: "0.85rem 1.25rem",
                borderRadius: "10px",
                fontWeight: 500,
                fontSize: "0.95rem",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              See how it works
            </a>
          </div>

          <p style={{ marginTop: "1.25rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>
            Free forever tier · No credit card · Two-step verification by email
          </p>
        </div>

        {/* Dashboard preview */}
        <div
          style={{
            marginTop: "4rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "1.25rem",
            boxShadow: "0 30px 60px -30px rgba(31,30,29,0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              paddingBottom: "0.85rem",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "1rem",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8E2D2" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8E2D2" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8E2D2" }} />
            <span style={{ marginLeft: "auto", fontSize: "0.72rem", color: "var(--text-muted)" }}>
              flipledger.com / dashboard
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            {[
              { label: "Net profit", value: "$1,284.50", tone: "positive" },
              { label: "Revenue", value: "$3,420" },
              { label: "Margin", value: "37.6%" },
              { label: "Inventory", value: "12 items" },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  background: "var(--paper-soft)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "10px",
                  padding: "0.85rem 1rem",
                }}
              >
                <div style={{ color: "var(--text-secondary)", fontSize: "0.72rem", marginBottom: "4px" }}>
                  {c.label}
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: c.tone === "positive" ? "var(--accent-deep)" : "var(--ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {c.value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              border: "1px solid var(--border-subtle)",
              borderRadius: "10px",
              overflow: "hidden",
              fontSize: "0.82rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 0.8fr 0.7fr 0.7fr",
                gap: "1rem",
                padding: "0.6rem 1rem",
                background: "var(--paper-soft)",
                color: "var(--text-muted)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span>Item</span>
              <span>Platform</span>
              <span>Sale</span>
              <span style={{ textAlign: "right" }}>Profit</span>
            </div>
            {[
              { item: "Nike Dunk Low Panda", platform: "StockX", sale: "$158.00", profit: "+$44.78" },
              { item: "Vintage Carhartt jacket", platform: "Depop", sale: "$78.00", profit: "+$51.70" },
              { item: "PS5 DualSense Edge", platform: "eBay", sale: "$189.00", profit: "+$11.50" },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 0.8fr 0.7fr 0.7fr",
                  gap: "1rem",
                  padding: "0.7rem 1rem",
                  borderTop: "1px solid var(--border-subtle)",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "var(--ink)", fontWeight: 500 }}>{r.item}</span>
                <span style={{ color: "var(--text-secondary)" }}>{r.platform}</span>
                <span className="mono" style={{ color: "var(--text-secondary)" }}>{r.sale}</span>
                <span
                  className="mono"
                  style={{ color: "var(--accent-deep)", fontWeight: 600, textAlign: "right" }}
                >
                  {r.profit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
