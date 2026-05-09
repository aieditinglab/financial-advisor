const principles = [
  {
    number: "01",
    title: "Connect your selling platforms",
    description:
      "Link eBay, StockX, Amazon, Whatnot, and more. FlipLedger pulls in your sales data automatically — no manual entry, no copy-pasting from receipts.",
  },
  {
    number: "02",
    title: "Log what you paid",
    description:
      "Add your sourcing cost for each item — from thrift stores to liquidation pallets to retail arbitrage. We do the math on your true margin after every fee.",
  },
  {
    number: "03",
    title: "Watch your profits in real time",
    description:
      "As items sell, your dashboard updates live. See your best-performing categories, your worst, and exactly where your money is going.",
  },
  {
    number: "04",
    title: "Plan smarter with AI",
    description:
      "Ask FlipLedger's AI what's working, where you're losing margin, and how to hit your goals. Plain-English answers — no finance degree required.",
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      style={{
        background: "linear-gradient(160deg, #0F1C2E 0%, #162438 100%)",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          right: "-200px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="approach-grid"
        >
          {/* Left column */}
          <div>
            <span
              style={{
                display: "inline-block",
                color: "#10B981",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              How It Works
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 700,
                color: "#FAFAF8",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              Set up in minutes.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #10B981 0%, #6EE7B7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Insights in seconds.
              </span>
            </h2>
            <p
              style={{
                color: "rgba(250, 250, 248, 0.55)",
                lineHeight: 1.75,
                fontSize: "1rem",
                marginBottom: "2rem",
              }}
            >
              Most resellers run their business on gut feeling and a rough idea of what
              they paid for something. FlipLedger replaces guesswork with real numbers —
              so you can make faster, smarter decisions on every flip.
            </p>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#10B981",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              Get started free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {principles.map((p, i) => (
              <div
                key={p.number}
                style={{
                  padding: "1.75rem 0",
                  borderBottom: i < principles.length - 1 ? "1px solid rgba(250, 250, 248, 0.07)" : "none",
                  display: "flex",
                  gap: "1.5rem",
                }}
              >
                <span
                  style={{
                    color: "rgba(16, 185, 129, 0.45)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    flexShrink: 0,
                    paddingTop: "3px",
                    fontFamily: "monospace",
                  }}
                >
                  {p.number}
                </span>
                <div>
                  <h3
                    style={{
                      color: "#FAFAF8",
                      fontSize: "1rem",
                      fontWeight: 650,
                      marginBottom: "0.5rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ color: "rgba(250, 250, 248, 0.5)", fontSize: "0.875rem", lineHeight: 1.65 }}>
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .approach-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
