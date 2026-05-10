const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Wealth Management",
    description: "Comprehensive investment management aligned with your goals, tax situation, and risk tolerance — with no hidden fees.",
    features: [
      "Personalized investment policy statement",
      "Tax-efficient asset location",
      "Ongoing portfolio rebalancing",
      "Alternative investment access",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Retirement Planning",
    description: "Model your retirement timeline, optimize Social Security, and build a distribution strategy that keeps you financially secure for life.",
    features: [
      "Retirement income projections",
      "Social Security optimization",
      "Required minimum distribution planning",
      "Drawdown sequencing strategy",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Tax Strategy",
    description: "Year-round, proactive tax planning that reduces your lifetime tax burden — coordinated with your CPA for seamless execution.",
    features: [
      "Tax-loss harvesting",
      "Roth conversion analysis",
      "Capital gains management",
      "Business owner tax strategies",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Estate Planning",
    description: "Coordinate your estate documents, trust structures, and beneficiary designations to protect your wealth across generations.",
    features: [
      "Estate document review & coordination",
      "Beneficiary designation audit",
      "Trust planning strategies",
      "Charitable giving structures",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Risk Management",
    description: "Evaluate your insurance coverage gaps and construct a protection strategy that shields your family and assets from unexpected events.",
    features: [
      "Life and disability insurance analysis",
      "Long-term care planning",
      "Umbrella liability review",
      "Business risk assessment",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Financial Planning",
    description: "A written, comprehensive financial plan that maps every dimension of your financial life — updated annually as your circumstances change.",
    features: [
      "Written comprehensive financial plan",
      "Cash flow & savings analysis",
      "Education funding strategies",
      "Business succession planning",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{
        background: "var(--paper)",
        padding: "7rem 1.5rem",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "3.75rem", maxWidth: "620px" }}>
          <span
            style={{
              display: "inline-block",
              color: "var(--accent-deep)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              marginBottom: "0.85rem",
            }}
          >
            What We Do
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4.5vw, 2.9rem)",
              fontWeight: 700,
              color: "var(--ink)",
              letterSpacing: "-0.025em",
              lineHeight: 1.12,
              marginBottom: "1rem",
            }}
          >
            Comprehensive wealth advice — under one roof.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.65 }}>
            We bring every dimension of your financial life into a single, coordinated plan — so nothing falls through the cracks.
          </p>
        </div>

        {/* Service cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
          className="services-grid"
        >
          {services.map((svc) => (
            <div
              key={svc.title}
              className="fl-lift"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-xl)",
                padding: "1.75rem",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "var(--accent-soft)",
                  color: "var(--accent-deep)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.1rem",
                  flexShrink: 0,
                }}
              >
                {svc.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "0.55rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {svc.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "1.1rem",
                }}
              >
                {svc.description}
              </p>

              {/* Feature bullets */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {svc.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.55rem",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.45,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "var(--accent)",
                        marginTop: "0.45rem",
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
