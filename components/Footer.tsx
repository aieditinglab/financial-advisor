"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#060d17",
        borderTop: "1px solid rgba(16, 185, 129, 0.1)",
        padding: "4rem 2rem 2.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3.5rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 12l3.5-3.5 2.5 2.5 3.5-4.5 3 2.5" stroke="#0F1C2E" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#FAFAF8", letterSpacing: "-0.02em" }}>
                FlipLedger
              </span>
            </div>
            <p style={{ color: "rgba(250, 250, 248, 0.4)", fontSize: "0.85rem", lineHeight: 1.65, maxWidth: "280px" }}>
              The financial tracking tool built for resellers — track profit, COGS,
              taxes, and cash flow across every platform you sell on.
            </p>
            <p style={{ color: "rgba(250, 250, 248, 0.25)", fontSize: "0.75rem", lineHeight: 1.5, maxWidth: "280px", marginTop: "0.75rem" }}>
              AI outputs are informational only — not financial, tax, or legal advice.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 style={{ color: "#FAFAF8", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Features
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {["Profit Per Item", "COGS Tracking", "Tax Estimates", "Cash Flow Dashboard", "Platform Fee Calculator", "AI Insights"].map((s) => (
                <li key={s}>
                  <a href="#services" style={{ color: "rgba(250, 250, 248, 0.45)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#10B981")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 250, 248, 0.45)")}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: "#FAFAF8", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Company
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "How It Works", href: "#approach" },
                { label: "Seller Stories", href: "#testimonials" },
                { label: "Why FlipLedger", href: "#about" },
                { label: "Get Started", href: "#contact" },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.href} style={{ color: "rgba(250, 250, 248, 0.45)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#10B981")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 250, 248, 0.45)")}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: "#FAFAF8", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Legal
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "AI Disclaimer", href: "/disclaimer" },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.href} style={{ color: "rgba(250, 250, 248, 0.45)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#10B981")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 250, 248, 0.45)")}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "1.5rem" }}>
              <p style={{ color: "rgba(250, 250, 248, 0.3)", fontSize: "0.78rem", lineHeight: 1.5 }}>
                hello@flipledger.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: "1px solid rgba(250, 250, 248, 0.06)",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "rgba(250, 250, 248, 0.25)", fontSize: "0.78rem", lineHeight: 1.5, maxWidth: "600px" }}>
            © 2025 FlipLedger. All rights reserved. FlipLedger is a financial tracking tool, not a licensed financial
            advisor. AI-generated insights are for informational purposes only and do not constitute financial, tax,
            or legal advice. Not a substitute for a licensed professional.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "AI Disclaimer", href: "/disclaimer" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: "rgba(250, 250, 248, 0.3)",
                  fontSize: "0.78rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#10B981")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 250, 248, 0.3)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
