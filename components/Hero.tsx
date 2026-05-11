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

        {/* RIGHT: Product preview */}
        <div className="fl-reveal hero-preview" style={{ animationDelay: "100ms" }}>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "2rem",
              position: "relative",
            }}
          >
            {/* Window header */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                marginBottom: "2rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#FFD700",
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#00FF00",
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#FF6347",
                }}
              />
            </div>

            {/* Stats */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Net Profit
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.7rem" }}>
                <span
                  className="serif"
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  $4,827
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--accent)",
                    fontWeight: 600,
                  }}
                >
                  ↑ 23.4%
                </span>
              </div>
            </div>

            {/* Sparkline */}
            <svg
              viewBox="0 0 280 60"
              style={{ width: "100%", height: 50, marginBottom: "1.5rem" }}
            >
              <defs>
                <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--accent)"
                    stopOpacity="0.2"
                  />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,45 Q35,42 60,38 T120,30 T180,22 T240,15 L280,12 L280,60 L0,60 Z"
                fill="url(#spark)"
              />
              <path
                d="M0,45 Q35,42 60,38 T120,30 T180,22 T240,15 L280,12"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
            </svg>

            {/* Insight card */}
            <div
              style={{
                background: "var(--paper-soft)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                padding: "1rem",
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
                AI Insight
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                StockX margins are{" "}
                <strong style={{ color: "var(--ink)" }}>14% higher</strong> than
                eBay. Reallocate inventory there.
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
