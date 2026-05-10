const team = [
  {
    initials: "EH",
    name: "Eleanor Hartwell",
    role: "Founder & Lead Advisor",
    bio: "Eleanor founded Bolt Resell AI in 2004 after a decade at a wirehouse where she grew frustrated with commission-based conflicts. She serves clients with complex portfolios across retirement planning, tax strategy, and estate coordination.",
    credentials: ["CFP®", "CFA"],
  },
  {
    initials: "MC",
    name: "Marcus Chen",
    role: "Director of Investments",
    bio: "Marcus leads Bolt Resell AI's investment committee and portfolio construction process. He draws on 15 years of institutional experience to design low-cost, evidence-based portfolios that reflect each client's unique risk tolerance and time horizon.",
    credentials: ["CFA"],
  },
  {
    initials: "PN",
    name: "Priya Nair",
    role: "Senior Advisor, Estate & Tax",
    bio: "Priya specializes in the intersection of wealth management, estate law, and taxation. Her legal background allows Bolt Resell AI to offer deeply integrated estate and tax planning that most advisory firms outsource entirely.",
    credentials: ["CFP®", "J.D."],
  },
];

const firmStats = [
  { value: "2004", label: "Year Founded" },
  { value: "NAPFA", label: "Member" },
  { value: "Flat-Fee", label: "Fee Model" },
  { value: "SEC", label: "Registered RIA" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "var(--paper-soft)",
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
            The Team
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
            People who put your interests first.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.65 }}>
            Our advisors hold the industry&apos;s most rigorous credentials. More importantly, they genuinely care about the clients they serve.
          </p>
        </div>

        {/* Team cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
          className="team-grid"
        >
          {team.map((member) => (
            <div
              key={member.name}
              className="fl-lift"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-xl)",
                padding: "2rem 1.75rem",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--ink) 0%, var(--ink-3) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: "#C9A84C",
                    letterSpacing: "0.04em",
                  }}
                >
                  {member.initials}
                </span>
              </div>

              {/* Name + role */}
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "0.25rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--accent)",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  letterSpacing: "0.01em",
                }}
              >
                {member.role}
              </p>

              {/* Bio */}
              <p
                style={{
                  fontSize: "0.87rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: "1.25rem",
                }}
              >
                {member.bio}
              </p>

              {/* Credential tags */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {member.credentials.map((c) => (
                  <span
                    key={c}
                    style={{
                      display: "inline-block",
                      padding: "3px 10px",
                      borderRadius: "100px",
                      background: "var(--accent-soft)",
                      color: "var(--accent-deep)",
                      fontSize: "0.73rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Firm stats bar */}
        <div
          style={{
            background: "var(--ink)",
            borderRadius: "var(--r-xl)",
            padding: "2rem 3rem",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
          }}
          className="firm-stats"
        >
          {firmStats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                borderRight: i < firmStats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#C9A84C",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "0.35rem",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(250,250,248,0.5)",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .team-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) {
          .team-grid { grid-template-columns: 1fr !important; }
          .firm-stats { grid-template-columns: 1fr 1fr !important; padding: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
