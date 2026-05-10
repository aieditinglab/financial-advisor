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
          background: "var(--surface)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "0 1.5rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 30,
          backdropFilter: "saturate(180%) blur(14px)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "26px",
              height: "26px",
              background: "var(--ink)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 12l3.5-3.5 2.5 2.5 3.5-4.5 3 2.5"
                stroke="var(--paper)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="serif"
            style={{ fontWeight: 600, fontSize: "1rem", color: "var(--ink)" }}
          >
            Bolt Resell AI
          </span>
        </Link>
        <Link
          href="/"
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            fontWeight: 500,
          }}
        >
          ← Back to home
        </Link>
      </header>

      <main style={{ flex: 1, maxWidth: "740px", margin: "0 auto", padding: "4rem 1.5rem 6rem", width: "100%" }}>
        <div
          style={{
            marginBottom: "2.5rem",
            paddingBottom: "1.75rem",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              color: "var(--accent-deep)",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            {eyebrow}
          </span>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3rem)",
              fontWeight: 500,
              color: "var(--ink)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            {title}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
            Effective date: {effectiveDate}
          </p>
        </div>

        <article className="legal-prose">{children}</article>

        <div
          style={{
            marginTop: "3.5rem",
            paddingTop: "1.75rem",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {prevPage ? (
            <Link href={prevPage.href} style={{ color: "var(--accent-deep)", fontSize: "0.9rem", fontWeight: 500 }}>
              ← {prevPage.label}
            </Link>
          ) : (
            <span />
          )}
          {nextPage && (
            <Link href={nextPage.href} style={{ color: "var(--accent-deep)", fontSize: "0.9rem", fontWeight: 500 }}>
              {nextPage.label} →
            </Link>
          )}
        </div>
      </main>

      <footer
        style={{
          background: "var(--ink)",
          padding: "1.75rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "rgba(245,244,237,0.45)", fontSize: "0.78rem", margin: 0 }}>
          © 2025 Bolt Resell AI. Not financial advice. ·{" "}
          <Link href="/terms" style={{ color: "rgba(245,244,237,0.55)" }}>Terms</Link> ·{" "}
          <Link href="/privacy" style={{ color: "rgba(245,244,237,0.55)" }}>Privacy</Link> ·{" "}
          <Link href="/disclaimer" style={{ color: "rgba(245,244,237,0.55)" }}>Disclaimer</Link>
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
