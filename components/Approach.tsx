const principles = [
  {
    number: "01",
    title: "We're legally required to act in your interest.",
    description:
      "As a fiduciary, we are legally and ethically bound to put your interests before our own at all times — not just when it's convenient.",
  },
  {
    number: "02",
    title: "Planning comes before investing.",
    description:
      "We build your financial plan first. Your investment strategy flows from your goals, time horizon, and tax situation — not the other way around.",
  },
  {
    number: "03",
    title: "We follow evidence, not predictions.",
    description:
      "We don't chase trends or make market calls. We use decades of academic research to build low-cost, diversified portfolios that stand the test of time.",
  },
  {
    number: "04",
    title: "One flat fee. Full transparency.",
    description:
      "You pay one transparent fee for everything — no commissions, no fund kickbacks, no hidden costs. Our incentive is your success, not product sales.",
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      style={{
        background: "var(--ink)",
        padding: "7rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="approach-grid"
        >
          {/* Left column */}
          <div style={{ position: "sticky", top: "8rem" }} className="approach-left">
            <span
              style={{
                display: "inline-block",
                color: "#C9A84C",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                marginBottom: "0.85rem",
              }}
            >
              Our Philosophy
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4.5vw, 2.9rem)",
                fontWeight: 700,
                color: "#FAFAF8",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              Different by design — not by accident.
            </h2>
            <p
              style={{
                color: "rgba(250,250,248,0.58)",
                fontSize: "0.97rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Independent, fee-only advisory firms are a small fraction of the industry. We chose this model deliberately because it's the only structure that keeps our interests aligned with yours.
            </p>
            <a
              href="#contact"
              className="mw-btn-gold"
              style={{ display: "inline-flex" }}
            >
              Schedule a Free Consultation
            </a>
          </div>

          {/* Right column — principles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {principles.map((p, i) => (
              <div
                key={p.number}
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  padding: "2rem 0",
                  borderBottom: i === principles.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#C9A84C",
                      letterSpacing: "0.08em",
                      marginTop: "0.2rem",
                      flexShrink: 0,
                    }}
                  >
                    {p.number}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: "1.02rem",
                        fontWeight: 600,
                        color: "#FAFAF8",
                        marginBottom: "0.55rem",
                        lineHeight: 1.35,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "rgba(250,250,248,0.55)",
                        lineHeight: 1.7,
                      }}
                    >
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .approach-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .approach-left { position: static !important; }
        }
      `}</style>
    </section>
  );
}
