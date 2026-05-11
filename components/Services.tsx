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
        borderTop: "1px solid var(--border)",
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
            What You Get
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
            Everything a reseller needs.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7 }}>
            From tracking to insights to market research. One dashboard, all platforms.
          </p>
        </div>

        {/* Services list — editorial, no cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {services.map((svc) => (
            <div
              key={svc.title}
              className="fl-reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr",
                gap: "2rem",
                paddingBottom: "2.5rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  flexShrink: 0,
                }}
              >
                {svc.icon}
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: "0.5rem",
                    margin: 0,
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {svc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          [style*="grid-template-columns: 60px 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
