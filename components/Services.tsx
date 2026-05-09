"use client";

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Profit Per Item",
    description:
      "See your true margin on every item after COGS, platform fees, shipping, and taxes. Know if you made money before you celebrate the sale.",
    features: ["Real margin after all fees", "Per-SKU profit view", "Fee breakdown by platform", "Auto-calculated net payout"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
        <path d="M6 8h.01M9 8h6" strokeLinecap="round" />
        <path d="M6 11h.01M9 11h6" strokeLinecap="round" />
      </svg>
    ),
    title: "COGS & Expense Tracking",
    description:
      "Log what you paid for every item cleanly. Add sourcing costs, shipping in, prep costs — so your numbers are actually accurate.",
    features: ["Sourcing cost logs", "Prep & storage costs", "Bulk import support", "Cost-per-unit tracking"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 14l6-6" strokeLinecap="round" />
        <circle cx="9.5" cy="9.5" r="1.5" />
        <circle cx="14.5" cy="14.5" r="1.5" />
        <rect x="3" y="3" width="18" height="18" rx="3" />
      </svg>
    ),
    title: "Tax Estimates",
    description:
      "Get a running estimate of what you owe in quarterly taxes and self-employment tax — so April never blindsides you again.",
    features: ["Quarterly tax estimates", "Self-employment tax calc", "Year-end summary export", "1099 income tracking"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Cash Flow Dashboard",
    description:
      "See money in vs. money out in real time. Know when you can reinvest in more inventory and when to hold back.",
    features: ["Weekly P&L snapshot", "Reinvestment capacity", "Inflow vs. outflow chart", "Rolling 30/60/90-day view"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Platform Fee Calculator",
    description:
      "Before you list, know your net. eBay final value fees, StockX transaction fees, Amazon FBA, Whatnot — all calculated instantly.",
    features: ["eBay, StockX, Amazon FBA", "Whatnot & Mercari", "Fee % updates automatically", "Compare platforms side-by-side"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" strokeLinecap="round" />
        <path d="M12 17h.01" strokeLinecap="round" strokeWidth="2" />
      </svg>
    ),
    title: "AI Financial Insights",
    description:
      "Ask questions in plain English: \"What was my best category last month?\" or \"Am I on track for my profit goal?\" — and get clear answers fast.",
    features: ["Plain-English Q&A", "Trend summaries", "Goal progress tracking", "AI-powered suggestions*"],
  },
];

export default function Services() {
  return (
    <section id="services" style={{ background: "#FAFAF8", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem", maxWidth: "560px" }}>
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
            Features
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "#0F1C2E",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            Everything a reseller
            <br />
            actually needs.
          </h2>
          <p style={{ color: "#475569", lineHeight: 1.7, fontSize: "1.05rem" }}>
            No spreadsheets. No confusing dashboards. Just the numbers that tell you
            if your resale business is actually making money.
          </p>
        </div>

        {/* Services grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5px",
            background: "#E8E6DF",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1.5px solid #E8E6DF",
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                background: "#FAFAF8",
                padding: "2.25rem",
                transition: "background 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F3EF")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#FAFAF8")}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10B981",
                  marginBottom: "1.25rem",
                }}
              >
                {service.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 650,
                  color: "#0F1C2E",
                  marginBottom: "0.75rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  color: "#64748B",
                  fontSize: "0.9rem",
                  lineHeight: 1.65,
                  marginBottom: "1.25rem",
                }}
              >
                {service.description}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {service.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.82rem",
                      color: "#475569",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#10B981",
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

        {/* AI disclaimer note */}
        <p style={{ marginTop: "1.5rem", color: "#94A3B8", fontSize: "0.78rem", lineHeight: 1.5 }}>
          * AI-powered features are informational only and do not constitute financial, tax, or legal advice.
          Always verify important decisions with a qualified professional.{" "}
          <a href="/disclaimer" style={{ color: "#10B981", textDecoration: "none" }}>
            Read full disclaimer →
          </a>
        </p>
      </div>
    </section>
  );
}
