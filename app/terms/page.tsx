import Link from "next/link";

const EFFECTIVE_DATE = "May 9, 2025";

export default function TermsPage() {
  const sectionStyle = {
    marginBottom: "2.5rem",
  };
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
      {/* Nav bar */}
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
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
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
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "#FAFAF8", letterSpacing: "-0.02em" }}>
            FlipLedger
          </span>
        </Link>
        <Link
          href="/"
          style={{
            color: "rgba(250, 250, 248, 0.6)",
            fontSize: "0.85rem",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          ← Back to home
        </Link>
      </header>

      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "5rem 2rem 7rem" }}>
        {/* Header */}
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
            Terms of Service
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "0.875rem" }}>Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div style={sectionStyle}>
          <p style={pStyle}>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of FlipLedger (the &ldquo;Service&rdquo;),
            operated by FlipLedger (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Service,
            you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Description of Service</h2>
          <p style={pStyle}>
            FlipLedger is a financial tracking and analytics tool designed to help resellers monitor their cost of goods
            sold (COGS), profit margins, platform fees, tax estimates, and cash flow. The Service may include
            AI-powered features that provide summaries, insights, and suggestions based on your data.
          </p>
          <p style={pStyle}>
            <strong>FlipLedger is not a licensed financial advisor, tax preparer, accountant, or legal counsel.</strong> The
            Service is a software tool, and nothing on the platform constitutes financial, tax, investment, or legal advice.
            See Section 6 and our <Link href="/disclaimer" style={{ color: "#10B981", textDecoration: "none" }}>AI &amp; Financial Disclaimer</Link> for full details.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Eligibility</h2>
          <p style={pStyle}>
            You must be at least 13 years old to use FlipLedger. If you are under 18, you represent that a parent or
            guardian has reviewed and agreed to these Terms on your behalf. By using the Service, you represent and
            warrant that you meet these eligibility requirements.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. Account Registration</h2>
          <p style={pStyle}>
            You may be required to create an account to access certain features. You agree to:
          </p>
          <ul style={listStyle}>
            <li>Provide accurate and complete registration information</li>
            <li>Keep your account credentials confidential</li>
            <li>Notify us promptly of any unauthorized use of your account</li>
            <li>Be responsible for all activity that occurs under your account</li>
          </ul>
          <p style={pStyle}>
            We reserve the right to terminate accounts that violate these Terms or are used for fraudulent purposes.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Acceptable Use</h2>
          <p style={pStyle}>You agree not to:</p>
          <ul style={listStyle}>
            <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
            <li>Attempt to access, tamper with, or disrupt any part of the Service or its infrastructure</li>
            <li>Reverse engineer, decompile, or disassemble any portion of the Service</li>
            <li>Use automated tools to scrape or extract data from the Service</li>
            <li>Impersonate any person or entity or misrepresent your affiliation</li>
            <li>Upload or transmit malicious code or anything that could harm the Service or its users</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Your Data</h2>
          <p style={pStyle}>
            You retain ownership of the data you input into FlipLedger. By using the Service, you grant us a limited,
            non-exclusive license to process your data solely for the purpose of providing and improving the Service.
            We will not sell your personal data to third parties. See our <Link href="/privacy" style={{ color: "#10B981", textDecoration: "none" }}>Privacy Policy</Link> for details.
          </p>
          <p style={pStyle}>
            You are responsible for the accuracy of the data you provide. FlipLedger cannot guarantee the accuracy of
            calculations, estimates, or insights derived from inaccurate input data.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. No Financial, Tax, or Legal Advice</h2>
          <p style={pStyle}>
            <strong>The Service does not provide financial, tax, investment, or legal advice of any kind.</strong> All
            content, data, calculations, AI-generated insights, and information provided through FlipLedger are for
            general informational and organizational purposes only.
          </p>
          <p style={pStyle}>
            FlipLedger is not a registered investment adviser, broker-dealer, tax preparer, certified public accountant
            (CPA), or attorney. We do not hold any fiduciary duty to you. No information provided by the Service
            should be relied upon as a substitute for professional advice from a licensed financial advisor, CPA,
            tax professional, or attorney.
          </p>
          <p style={pStyle}>
            Tax estimates provided by the Service are approximations only and may not reflect your actual tax liability.
            Always consult a licensed tax professional before making tax-related decisions.
          </p>
          <p style={pStyle}>
            See our full <Link href="/disclaimer" style={{ color: "#10B981", textDecoration: "none" }}>AI &amp; Financial Disclaimer</Link> for additional information about the limitations of AI-generated content.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Disclaimer of Warranties</h2>
          <p style={pStyle}>
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS
            OR IMPLIED. WE EXPRESSLY DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul style={listStyle}>
            <li>WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE</li>
            <li>WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE</li>
            <li>WARRANTIES AS TO THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANY CONTENT OR DATA</li>
            <li>WARRANTIES THAT DEFECTS WILL BE CORRECTED</li>
          </ul>
          <p style={pStyle}>
            We do not warrant that any financial estimates, tax projections, or AI-generated insights will be accurate,
            complete, or suitable for your specific situation.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Limitation of Liability</h2>
          <p style={pStyle}>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FLIPLEDGER AND ITS OFFICERS, DIRECTORS, EMPLOYEES,
            AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES —
            INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES — ARISING OUT OF
            OR RELATED TO YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p style={pStyle}>
            OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING FROM OR RELATED TO THESE TERMS OR THE SERVICE SHALL
            NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED
            DOLLARS ($100), WHICHEVER IS GREATER.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Indemnification</h2>
          <p style={pStyle}>
            You agree to indemnify, defend, and hold harmless FlipLedger and its officers, directors, employees,
            and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including
            reasonable attorneys&apos; fees) arising out of or related to your use of the Service, your violation of
            these Terms, or your violation of any rights of a third party.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Third-Party Platforms and Services</h2>
          <p style={pStyle}>
            FlipLedger may integrate with or display information from third-party platforms (e.g., eBay, StockX,
            Amazon). We are not affiliated with, endorsed by, or responsible for the accuracy of data from these
            platforms. Platform fee structures, policies, and rates are subject to change; always verify current
            fees directly with the relevant platform.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>11. Termination</h2>
          <p style={pStyle}>
            We may suspend or terminate your access to the Service at any time, with or without cause, with or
            without notice. You may stop using the Service at any time. Upon termination, your right to use the
            Service immediately ceases.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>12. Changes to These Terms</h2>
          <p style={pStyle}>
            We may update these Terms from time to time. When we do, we will update the effective date at the top
            of this page. Your continued use of the Service after any changes constitutes your acceptance of the
            revised Terms. We encourage you to review these Terms periodically.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>13. Governing Law</h2>
          <p style={pStyle}>
            These Terms are governed by and construed in accordance with the laws of the United States. Any disputes
            arising under or related to these Terms shall be resolved through binding arbitration, except where
            prohibited by law.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>14. Contact</h2>
          <p style={pStyle}>
            If you have questions about these Terms, contact us at:{" "}
            <a href="mailto:hello@flipledger.com" style={{ color: "#10B981", textDecoration: "none" }}>
              hello@flipledger.com
            </a>
          </p>
        </div>

        {/* Navigation between legal pages */}
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
          <Link href="/privacy" style={{ color: "#10B981", fontSize: "0.875rem", textDecoration: "none" }}>Privacy Policy →</Link>
          <Link href="/disclaimer" style={{ color: "#10B981", fontSize: "0.875rem", textDecoration: "none" }}>AI &amp; Financial Disclaimer →</Link>
          <Link href="/" style={{ color: "#10B981", fontSize: "0.875rem", textDecoration: "none" }}>← Back to FlipLedger</Link>
        </div>
      </main>

      {/* Simple footer */}
      <footer style={{ background: "#060d17", padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "rgba(250, 250, 248, 0.25)", fontSize: "0.78rem" }}>
          © 2025 FlipLedger. All rights reserved. Not financial advice.
        </p>
      </footer>
    </>
  );
}
