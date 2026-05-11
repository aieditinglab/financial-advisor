const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Multi-Platform Tracking",
    description: "Track inventory and sales across eBay, Depop, StockX, Mercari, Poshmark, and Facebook Marketplace — all in one dashboard.",
    features: [
      "Unified inventory across platforms",
      "Automatic profit/loss calculation",
      "COGS, fees, and shipping tracking",
      "Real-time status updates",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    title: "AI-Powered Insights",
    description: "Get personalized briefings on your business health. The AI analyzes your data to surface wins, risks, and next steps.",
    features: [
      "Live auto-refreshing briefings",
      "Platform performance comparison",
      "Loss detection and alerts",
      "Actionable next-step suggestions",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    title: "Market Research",
    description: "Look up real sold prices from eBay to know exactly what items are worth before you buy or list them.",
    features: [
      "Real-time eBay sold price data",
      "Active listing price comparison",
      "Demand scoring by category",
      "Price trend history",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </svg>
    ),
    title: "Goals & Targets",
    description: "Set monthly profit and revenue goals. Track your progress and let the AI coach you toward hitting your targets.",
    features: [
      "Monthly profit targets",
      "Visual progress tracking",
      "AI goal recommendations",
      "Connected to profile analytics",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Fee Calculator",
    description: "Instantly calculate platform fees, shipping costs, and net profit for any item across all major platforms.",
    features: [
      "eBay, StockX, Depop, Mercari fees",
      "Shipping cost estimation",
      "Break-even price calculator",
      "Side-by-side platform comparison",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Vendor Sourcing",
    description: "Access our curated directory of verified vendors. Find quality suppliers and learn the full reselling process from start to finish.",
    features: [
      "Verified vendor directory",
      "Category-based filtering",
      "Step-by-step reselling guide",
      "Community vendor ratings",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="features"
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
              color: "var(--accent, #E2725B)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              marginBottom: "0.85rem",
            }}
          >
            Features
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
            Everything you need to flip profitably.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.65 }}>
            From sourcing to selling, Bolt Resell AI gives you the tools and intelligence to grow your reselling business.
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
          {services.map((svc, idx) => (
            <div
              key={svc.title}
              className="fl-card-premium fl-lift"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: idx % 3 === 0
                    ? "linear-gradient(135deg, var(--sage-soft), rgba(138,154,91,0.15))"
                    : idx % 3 === 1
                    ? "linear-gradient(135deg, var(--accent-soft), rgba(212,96,74,0.12))"
                    : "linear-gradient(135deg, var(--gold-soft), rgba(201,168,118,0.15))",
                  color: idx % 3 === 0
                    ? "var(--sage-deep, #5A6B3B)"
                    : idx % 3 === 1
                    ? "var(--accent-deep, #A03F2D)"
                    : "var(--gold-deep, #9F8454)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  flexShrink: 0,
                  border: "1px solid rgba(0,0,0,0.04)",
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
                        background: "var(--accent, #E2725B)",
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
