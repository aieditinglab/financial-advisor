import Link from "next/link";

const EFFECTIVE_DATE = "May 9, 2025";

export default function PrivacyPage() {
  const sectionStyle = { marginBottom: "2.5rem" };
  const h2Style = {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#0F1C2E",
    letterSpacing: "-0.01em",
    marginBottom: "0.75rem",
  };
  const pStyle = {
    color: "#475569",
    fontSize: "0.95rem",
    lineHeight: 1.75,
    marginBottom: "0.75rem",
  };
  const listStyle = {
    color: "#475569",
    fontSize: "0.95rem",
    lineHeight: 1.75,
    paddingLeft: "1.5rem",
    marginBottom: "0.75rem",
  };

  return (
    <>
      <header
        style={{
          background: "rgba(15, 28, 46, 0.97)",
          borderBottom: "1px solid rgba(16, 185, 129, 0.15)",
          padding: "0 2rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
              borderRadius: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M2 12l3.5-3.5 2.5 2.5 3.5-4.5 3 2.5" stroke="#0F1C2E" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "#FAFAF8", letterSpacing: "-0.02em" }}>FlipLedger</span>
        </Link>
        <Link href="/" style={{ color: "rgba(250, 250, 248, 0.6)", fontSize: "0.85rem", textDecoration: "none" }}>
          ← Back to home
        </Link>
      </header>

      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "5rem 2rem 7rem" }}>
        <div style={{ marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid #E8E6DF" }}>
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
            Legal
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 800,
              color: "#0F1C2E",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "0.875rem" }}>Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div style={sectionStyle}>
          <p style={pStyle}>
            FlipLedger (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This Privacy Policy explains what
            information we collect when you use FlipLedger (the &ldquo;Service&rdquo;), how we use it, and your choices.
            By using the Service, you agree to the practices described here.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Information We Collect</h2>
          <p style={pStyle}><strong>Information you provide directly:</strong></p>
          <ul style={listStyle}>
            <li>Account registration details (name, email address)</li>
            <li>Financial data you input (COGS, item costs, sales records)</li>
            <li>Platform connection credentials or OAuth tokens (stored encrypted)</li>
            <li>Communications you send us (support emails, feedback forms)</li>
          </ul>
          <p style={pStyle}><strong>Information collected automatically:</strong></p>
          <ul style={listStyle}>
            <li>Log data (IP address, browser type, pages visited, time and date)</li>
            <li>Device information (device type, operating system)</li>
            <li>Usage data (features used, actions taken in the app)</li>
            <li>Cookies and similar tracking technologies (see Section 6)</li>
          </ul>
          <p style={pStyle}><strong>Information from third-party platforms:</strong></p>
          <ul style={listStyle}>
            <li>Sales data, order history, and platform metrics you authorize us to access via platform integrations (e.g., eBay API, Amazon SP-API)</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. How We Use Your Information</h2>
          <p style={pStyle}>We use your information to:</p>
          <ul style={listStyle}>
            <li>Provide, operate, and improve the Service</li>
            <li>Calculate profit margins, tax estimates, cash flow, and other analytics</li>
            <li>Generate AI-powered insights based on your data</li>
            <li>Send transactional communications (account confirmation, password reset)</li>
            <li>Respond to your support requests</li>
            <li>Detect and prevent fraud, abuse, and security incidents</li>
            <li>Comply with applicable legal obligations</li>
            <li>Improve and develop new features through aggregated, anonymized analysis</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. How We Share Your Information</h2>
          <p style={pStyle}>
            <strong>We do not sell your personal data.</strong> We may share information in the following limited circumstances:
          </p>
          <ul style={listStyle}>
            <li><strong>Service providers:</strong> Third-party vendors who help us operate the Service (hosting, analytics, email delivery) under strict data processing agreements</li>
            <li><strong>Legal requirements:</strong> When required by law, court order, or government authority</li>
            <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, with notice to you</li>
            <li><strong>With your consent:</strong> Any other sharing we&apos;ll describe at the time and ask your permission first</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Data Retention</h2>
          <p style={pStyle}>
            We retain your data for as long as your account is active or as needed to provide the Service. You may
            request deletion of your account and associated data at any time by contacting us at hello@flipledger.com.
            We may retain certain data for a limited period afterward to comply with legal obligations or resolve disputes.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Security</h2>
          <p style={pStyle}>
            We implement industry-standard technical and organizational measures to protect your data, including
            encryption in transit (TLS) and at rest, access controls, and regular security reviews. However, no
            system is perfectly secure. You use the Service at your own risk, and we cannot guarantee absolute security.
          </p>
          <p style={pStyle}>
            If you believe your account has been compromised, contact us immediately at hello@flipledger.com.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Cookies and Tracking</h2>
          <p style={pStyle}>
            We use cookies and similar technologies to authenticate sessions, remember preferences, and understand
            how the Service is used. You can control cookies through your browser settings, but disabling cookies
            may affect Service functionality.
          </p>
          <p style={pStyle}>
            We may use third-party analytics tools (such as anonymized usage tracking) to understand feature usage
            in aggregate. These tools do not receive personally identifiable information.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Children&apos;s Privacy</h2>
          <p style={pStyle}>
            The Service is intended for users aged 13 and older. We do not knowingly collect personal information
            from children under 13. If we discover we have collected information from a child under 13 without
            verifiable parental consent, we will delete it promptly. If you believe a child under 13 has provided
            us data, contact us at hello@flipledger.com.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Your Rights and Choices</h2>
          <p style={pStyle}>Depending on your location, you may have the right to:</p>
          <ul style={listStyle}>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and associated data</li>
            <li>Object to or restrict certain processing</li>
            <li>Data portability (receive a copy of your data in a common format)</li>
            <li>Withdraw consent where processing is based on consent</li>
          </ul>
          <p style={pStyle}>
            To exercise any of these rights, contact us at hello@flipledger.com. We will respond within 30 days.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Third-Party Links and Platforms</h2>
          <p style={pStyle}>
            The Service may link to or integrate with third-party platforms (eBay, StockX, Amazon, etc.). These
            platforms have their own privacy policies. We are not responsible for their privacy practices. We
            encourage you to review their policies before authorizing integrations.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. AI and Automated Processing</h2>
          <p style={pStyle}>
            FlipLedger uses AI and automated processing to generate financial insights, summaries, and suggestions.
            These outputs are based on the data you provide and are subject to error. See our{" "}
            <Link href="/disclaimer" style={{ color: "#10B981", textDecoration: "none" }}>AI &amp; Financial Disclaimer</Link> for
            important limitations. We do not make legally significant automated decisions about you based solely on
            automated processing.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>11. Changes to This Policy</h2>
          <p style={pStyle}>
            We may update this Privacy Policy from time to time. We will update the effective date above when we do.
            Material changes will be communicated by email or a notice in the Service. Continued use of the Service
            after changes constitutes your acceptance of the updated Policy.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>12. Contact Us</h2>
          <p style={pStyle}>
            Questions about this Privacy Policy? Contact us at:{" "}
            <a href="mailto:hello@flipledger.com" style={{ color: "#10B981", textDecoration: "none" }}>
              hello@flipledger.com
            </a>
          </p>
        </div>

        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid #E8E6DF",
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <Link href="/terms" style={{ color: "#10B981", fontSize: "0.875rem", textDecoration: "none" }}>Terms of Service →</Link>
          <Link href="/disclaimer" style={{ color: "#10B981", fontSize: "0.875rem", textDecoration: "none" }}>AI &amp; Financial Disclaimer →</Link>
          <Link href="/" style={{ color: "#10B981", fontSize: "0.875rem", textDecoration: "none" }}>← Back to FlipLedger</Link>
        </div>
      </main>

      <footer style={{ background: "#060d17", padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "rgba(250, 250, 248, 0.25)", fontSize: "0.78rem" }}>
          © 2025 FlipLedger. All rights reserved. Not financial advice.
        </p>
      </footer>
    </>
  );
}
