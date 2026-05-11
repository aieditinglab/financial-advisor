import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--paper)",
        borderTop: "1px solid var(--border)",
        padding: "5rem 1.5rem 3rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  background: "var(--accent)",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="12" height="14" viewBox="0 0 14 16" fill="white" aria-hidden="true">
                  <path d="M8 1L2 9h5l-1 6 6-8H7l1-6z" fillRule="evenodd" />
                </svg>
              </div>
              <span
                className="serif"
                style={{ fontWeight: 500, fontSize: "0.95rem", color: "var(--ink)" }}
              >
                Bolt Resell
              </span>
            </Link>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                lineHeight: 1.65,
                maxWidth: "320px",
                marginTop: "1.25rem",
                margin: "1.25rem 0 0 0",
              }}
            >
              The operating system for resellers. Track inventory, profit, and insights across every marketplace in one dashboard.
            </p>
          </div>

          <FooterColumn
            title="Product"
            links={[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how-it-works" },
              { label: "Testimonials", href: "#testimonials" },
              { label: "Pricing", href: "#pricing" },
            ]}
          />

          <FooterColumn
            title="Legal"
            links={[
              { label: "Terms of Service", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Disclaimer", href: "/disclaimer" },
            ]}
          />

          <FooterColumn
            title="Contact"
            links={[{ label: "hello@boltresell.ai", href: "mailto:hello@boltresell.ai" }]}
          />
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", margin: 0, lineHeight: 1.6, maxWidth: "600px" }}>
            © 2025 Bolt Resell. Bolt Resell is a financial tracking tool, not a licensed financial advisor. All AI-generated insights are for informational purposes only and do not constitute financial, tax, or legal advice.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacy" className="fl-lift" style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
              Privacy
            </Link>
            <Link href="/terms" className="fl-lift" style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
              Terms
            </Link>
            <Link href="/disclaimer" className="fl-lift" style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
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
          color: "var(--ink)",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "1.25rem",
          margin: "0 0 1.25rem 0",
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
          gap: "0.75rem",
        }}
      >
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="fl-lift"
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
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
