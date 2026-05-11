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
        background: "var(--paper)",
        padding: "7rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "4rem", maxWidth: "600px" }}>
          <span
            style={{
              display: "inline-block",
              color: "var(--accent)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            How It Works
          </span>
          <h2
            className="serif-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              color: "var(--ink)",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
            }}
          >
            From scattered receipts to complete clarity.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7 }}>
            Four simple steps to transform your reselling business from guesswork into data-driven decisions.
          </p>
        </div>

        {/* Steps — editorial list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="fl-reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "2rem",
                paddingBottom: "2.5rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {/* Number */}
              <div
                className="serif"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 500,
                  color: "var(--accent)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {step.number}
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    margin: "0 0 0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    margin: 0,
                    maxWidth: "620px",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
