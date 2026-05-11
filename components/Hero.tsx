import Link from "next/link";

const platforms = [
  { name: "eBay", color: "#D97757" },
  { name: "Depop", color: "#D97757" },
  { name: "StockX", color: "#D97757" },
  { name: "Mercari", color: "#D97757" },
  { name: "Poshmark", color: "#D97757" },
  { name: "Whatnot", color: "#D97757" },
];

export default function Hero() {
  return (
    <section
      style={{
        background: "var(--paper)",
        padding: "8rem 1.5rem 6rem",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "6rem",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* LEFT: Copy */}
        <div className="fl-reveal">
          {/* Kicker */}
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "1.5rem",
            }}
          >
            Reseller Operating System
          </div>

          {/* Headline */}
          <h1
            className="serif-display"
            style={{
              fontSize: "clamp(2.8rem, 5vw, 4rem)",
              color: "var(--ink)",
              lineHeight: 1.15,
              marginBottom: "1.75rem",
              maxWidth: "600px",
            }}
          >
            Know your numbers. Make better decisions.
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "520px",
              marginBottom: "2.5rem",
            }}
          >
            Track inventory across every marketplace. Get real-time AI insights on what's working, what's not, and exactly where to focus next.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
            <Link href="/login" className="bolt-btn-cta">
              Start Free
            </Link>
            <a href="#features" className="bolt-btn-ghost">
              See how it works
            </a>
          </div>

          {/* Platforms */}
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "0.9rem",
              }}
            >
              Works with
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {platforms.map((p) => (
                <div
                  key={p.name}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: p.color,
                    }}
                  />
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Product preview — Editorial dashboard */}
        <div className="fl-reveal hero-preview" style={{ animationDelay: "100ms" }}>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "1.75rem",
              position: "relative",
              boxShadow: "0 4px 12px rgba(26, 26, 26, 0.06)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "2rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: "0.4rem",
                  }}
                >
                  This Month
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  $4,827
                </div>
              </div>
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    marginBottom: "0.4rem",
                  }}
                >
                  Net Profit
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--accent)",
                    fontWeight: 600,
                  }}
                >
                  ↑ 23.4% vs last month
                </div>
              </div>
            </div>

            {/* Platform breakdown — Three pills */}
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Top Platforms
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <div
                  style={{
                    background: "var(--paper-soft)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    padding: "0.5rem 0.85rem",
                    fontSize: "0.8rem",
                    color: "var(--ink)",
                    fontWeight: 500,
                  }}
                >
                  StockX <span style={{ color: "var(--accent)" }}>$2,140</span>
                </div>
                <div
                  style={{
                    background: "var(--paper-soft)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    padding: "0.5rem 0.85rem",
                    fontSize: "0.8rem",
                    color: "var(--ink)",
                    fontWeight: 500,
                  }}
                >
                  eBay <span style={{ color: "var(--text-secondary)" }}>$1,420</span>
                </div>
                <div
                  style={{
                    background: "var(--paper-soft)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    padding: "0.5rem 0.85rem",
                    fontSize: "0.8rem",
                    color: "var(--ink)",
                    fontWeight: 500,
                  }}
                >
                  Depop <span style={{ color: "var(--text-secondary)" }}>$1,267</span>
                </div>
              </div>
            </div>

            {/* Key metric */}
            <div
              style={{
                background: "var(--accent-soft)",
                border: "1px solid var(--accent)",
                borderRadius: "4px",
                padding: "0.9rem 1.1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  marginBottom: "0.3rem",
                }}
              >
                Insight
              </div>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--ink)",
                  lineHeight: 1.5,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Reselling margin: <strong>28.5%</strong> — your best month yet.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          .hero-preview {
            max-width: 400px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
