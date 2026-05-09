"use client";

const pillars = [
  {
    title: "No spreadsheets required",
    description:
      "We built FlipLedger because most resellers were tracking profits in Google Sheets — or not at all. You shouldn't need an accounting degree to know if you made money.",
    initials: "01",
  },
  {
    title: "Built for every seller",
    description:
      "Whether you flip 5 items a month or 500, FlipLedger scales with you. Teens starting out, side-hustlers, and full-time resellers all use the same clean, simple interface.",
    initials: "02",
  },
  {
    title: "AI that speaks reseller",
    description:
      "Our AI understands reselling — COGS, sell-through, platform fees, quarterly taxes. Ask it questions in plain English and get answers that actually make sense for your business.",
    initials: "03",
  },
];

export default function About() {
  return (
    <section id="about" style={{ background: "#F4F3EF", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem", maxWidth: "600px" }}>
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
            Why FlipLedger
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
            Built for resellers
            <br />
            who want real numbers.
          </h2>
          <p style={{ color: "#475569", lineHeight: 1.7, fontSize: "1.05rem" }}>
            Reselling is a real business. It deserves real financial tools — not a
            recycled accounting app that makes you feel like you need a CPA to use it.
          </p>
        </div>

        {/* Pillars grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "5rem",
          }}
        >
          {pillars.map((item) => (
            <div
              key={item.title}
              style={{
                background: "#FAFAF8",
                borderRadius: "14px",
                padding: "2.25rem",
                border: "1px solid #E8E6DF",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 40px rgba(15, 28, 46, 0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  color: "#10B981",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  letterSpacing: "0.04em",
                }}
              >
                {item.initials}
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
                {item.title}
              </h3>
              <p
                style={{
                  color: "#64748B",
                  fontSize: "0.875rem",
                  lineHeight: 1.65,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Community stats bar */}
        <div
          style={{
            background: "#0F1C2E",
            borderRadius: "16px",
            padding: "3rem 3.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            { value: "12,400+", label: "Active resellers" },
            { value: "15", label: "Platforms supported" },
            { value: "$8.2M+", label: "Profit tracked" },
            { value: "Free", label: "Core tier, always" },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#10B981",
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                }}
              >
                {item.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "rgba(250, 250, 248, 0.45)", letterSpacing: "0.02em" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
