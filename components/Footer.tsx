import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "rgba(245,244,237,0.7)",
        padding: "4rem 1.5rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  background: "linear-gradient(135deg, #E2725B, #D4604A)",
                  borderRadius: "7px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="12" height="14" viewBox="0 0 14 16" fill="none">
                  <path d="M8 1L2 9h5l-1 6 6-8H7l1-6z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round" />
                </svg>
              </div>
              <span
                className="serif"
                style={{ fontWeight: 600, fontSize: "1.05rem", color: "var(--paper)" }}
              >
                Bolt Resell AI
              </span>
            </Link>
            <p
              style={{
                color: "rgba(245,244,237,0.55)",
                fontSize: "0.88rem",
                lineHeight: 1.65,
                maxWidth: "320px",
                marginTop: "1rem",
              }}
            >
              The financial tool built for resellers. Track profit, COGS, taxes, and
              cash flow across every platform you sell on.
            </p>
            <p
              style={{
                color: "rgba(245,244,237,0.35)",
                fontSize: "0.78rem",
                lineHeight: 1.55,
                maxWidth: "320px",
                marginTop: "0.75rem",
              }}
            >
              AI outputs are informational only — not financial, tax, or legal advice.
            </p>
          </div>

          <FooterColumn
            title="Product"
            links={[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how" },
              { label: "Stories", href: "#stories" },
              { label: "Sign up", href: "/signup" },
              { label: "Sign in", href: "/login" },
            ]}
          />

          <FooterColumn
            title="Legal"
            links={[
              { label: "Terms of Service", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "AI Disclaimer", href: "/disclaimer" },
            ]}
          />

          <FooterColumn
            title="Contact"
            links={[{ label: "hello@boltresell.ai", href: "mailto:hello@boltresell.ai" }]}
          />
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(245,244,237,0.08)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "rgba(245,244,237,0.4)", fontSize: "0.78rem", margin: 0, lineHeight: 1.55, maxWidth: "640px" }}>
            © 2025 Bolt Resell AI. Bolt Resell AI is a financial tracking tool, not a licensed
            financial advisor. AI-generated insights are for informational purposes only
            and do not constitute financial, tax, or legal advice.
          </p>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            <Link href="/privacy" style={{ color: "rgba(245,244,237,0.5)", fontSize: "0.78rem" }}>
              Privacy
            </Link>
            <Link href="/terms" style={{ color: "rgba(245,244,237,0.5)", fontSize: "0.78rem" }}>
              Terms
            </Link>
            <Link href="/disclaimer" style={{ color: "rgba(245,244,237,0.5)", fontSize: "0.78rem" }}>
              Disclaimer
            </Link>
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

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4
        style={{
          color: "var(--paper)",
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h4>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.55rem",
        }}
      >
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              style={{
                color: "rgba(245,244,237,0.55)",
                fontSize: "0.85rem",
                transition: "color 0.15s",
                display: "inline-block",
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
