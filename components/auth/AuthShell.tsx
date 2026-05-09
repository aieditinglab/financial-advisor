import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--paper)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header style={{ padding: "1.5rem 2rem" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              background: "var(--ink)",
              borderRadius: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
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
            style={{
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "var(--ink)",
            }}
          >
            FlipLedger
          </span>
        </Link>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ marginBottom: "1.75rem", textAlign: "center" }}>
            <h1
              className="serif"
              style={{
                fontSize: "2rem",
                fontWeight: 500,
                color: "var(--ink)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: subtitle ? "0.5rem" : 0,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.95rem",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "2rem",
            }}
          >
            {children}
          </div>

          {footer && (
            <div style={{ marginTop: "1.25rem", textAlign: "center" }}>{footer}</div>
          )}
        </div>
      </main>

      <footer style={{ padding: "1.5rem 2rem", textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
          © 2025 FlipLedger ·{" "}
          <Link href="/terms" style={{ color: "var(--text-secondary)" }}>Terms</Link> ·{" "}
          <Link href="/privacy" style={{ color: "var(--text-secondary)" }}>Privacy</Link> ·{" "}
          <Link href="/disclaimer" style={{ color: "var(--text-secondary)" }}>AI Disclaimer</Link>
        </p>
      </footer>
    </div>
  );
}
