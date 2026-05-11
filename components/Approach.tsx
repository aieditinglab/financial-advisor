const steps = [
  {
    number: "01",
    title: "Track Every Flip",
    description:
      "Log items as you source them — name, cost, platform, fees, shipping. Mark them sold when they sell. We do the math: real profit per item, automatically.",
  },
  {
    number: "02",
    title: "Connect Your Platforms",
    description:
      "Link your eBay, Depop, and Facebook Marketplace profiles. Get a unified view of performance across every marketplace you sell on.",
  },
  {
    number: "03",
    title: "Get AI Insights",
    description:
      "Our AI analyzes your numbers in real time. Which platform makes you the most? Which items lose money? What should you focus on next week?",
  },
  {
    number: "04",
    title: "Hit Your Goals",
    description:
      "Set monthly profit and revenue targets. Watch your progress. Get coached toward bigger flips, smarter sourcing, and better margins.",
  },
];

export default function Approach() {
  return (
    <section
      id="how-it-works"
      style={{
        background: "linear-gradient(180deg, var(--paper) 0%, var(--paper-soft) 100%)",
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background blobs */}
      <span
        aria-hidden="true"
        className="fl-blob"
        style={{
          top: "10%",
          right: "-100px",
          width: "300px",
          height: "300px",
          background: "rgba(212,96,74,0.08)",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* Section header */}
        <div style={{ marginBottom: "4.5rem", maxWidth: "680px" }}>
          <span
            style={{
              display: "inline-block",
              color: "var(--accent)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            How It Works
          </span>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              fontWeight: 500,
              color: "var(--ink)",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
            }}
          >
            From scattered receipts to <span className="fl-gradient-accent" style={{ fontStyle: "italic" }}>complete clarity</span>.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.08rem", lineHeight: 1.65, maxWidth: "560px" }}>
            Four steps to take your reselling business from guesswork to a data-driven engine.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="fl-card-premium fl-lift"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              {/* Number */}
              <div
                className="serif"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 400,
                  color: "var(--accent)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  fontStyle: "italic",
                  minWidth: "70px",
                }}
              >
                {step.number}
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                    fontWeight: 600,
                    color: "var(--ink)",
                    margin: "0 0 0.5rem",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.96rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: "640px",
                  }}
                >
                  {step.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--paper)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  flexShrink: 0,
                }}
                className="step-arrow"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .step-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}
