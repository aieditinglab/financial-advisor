import Link from "next/link";
import type { ReactNode } from "react";

export default function LegalShell({
  eyebrow = "Legal",
  title,
  effectiveDate,
  children,
  prevPage,
  nextPage,
}: {
  eyebrow?: string;
  title: string;
  effectiveDate: string;
  children: ReactNode;
  prevPage?: { label: string; href: string };
  nextPage?: { label: string; href: string };
}) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--border)",
          padding: "0 1.5rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 30,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
        <Link
          href="/"
          className="fl-lift"
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.8rem",
            fontWeight: 500,
          }}
        >
          ← Back home
        </Link>
      </header>

      <main style={{ flex: 1, maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem 5rem", width: "100%" }}>
        <div
          style={{
            marginBottom: "3rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
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
            {eyebrow}
          </span>
          <h1
            className="serif-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              color: "var(--ink)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            {title}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
            Effective {effectiveDate}
          </p>
        </div>

        <article className="legal-prose">{children}</article>

        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {prevPage ? (
            <Link href={prevPage.href} className="fl-lift" style={{ color: "var(--accent)", fontSize: "0.9rem", fontWeight: 500 }}>
              ← {prevPage.label}
            </Link>
          ) : (
            <span />
          )}
          {nextPage && (
            <Link href={nextPage.href} className="fl-lift" style={{ color: "var(--accent)", fontSize: "0.9rem", fontWeight: 500 }}>
              {nextPage.label} →
            </Link>
          )}
        </div>
      </main>

      <footer
        style={{
          background: "var(--paper)",
          borderTop: "1px solid var(--border)",
          padding: "2rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", margin: 0 }}>
          © 2025 Bolt Resell. Not financial advice. ·{" "}
          <Link href="/terms" className="fl-lift" style={{ color: "var(--text-secondary)" }}>Terms</Link> ·{" "}
          <Link href="/privacy" className="fl-lift" style={{ color: "var(--text-secondary)" }}>Privacy</Link> ·{" "}
          <Link href="/disclaimer" className="fl-lift" style={{ color: "var(--text-secondary)" }}>Disclaimer</Link>
        </p>
      </footer>

      <style>{`
        .legal-prose h2 {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--ink);
          letter-spacing: -0.01em;
          line-height: 1.3;
          margin: 2.5rem 0 0.75rem;
        }
        .legal-prose p {
          color: var(--text-secondary);
          font-size: 0.98rem;
          line-height: 1.75;
          margin: 0 0 0.85rem;
        }
        .legal-prose ul {
          color: var(--text-secondary);
          font-size: 0.98rem;
          line-height: 1.75;
          padding-left: 1.5rem;
          margin: 0 0 1rem;
        }
        .legal-prose li { margin-bottom: 0.35rem; }
        .legal-prose strong { color: var(--ink); font-weight: 600; }
        .legal-prose a { color: var(--accent-deep); text-decoration: underline; text-underline-offset: 2px; }
        .legal-prose .callout {
          background: var(--surface);
          border: 1px solid var(--border);
          border-left: 3px solid var(--accent);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin: 0 0 2rem;
        }
        .legal-prose .callout p { color: var(--ink); font-size: 0.98rem; line-height: 1.7; margin: 0; }
      `}</style>
    </div>
  );
}
