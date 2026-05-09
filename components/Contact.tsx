"use client";

import Link from "next/link";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        background: "var(--surface)",
        padding: "7rem 1.5rem",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
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
          Get started
        </span>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
            fontWeight: 500,
            color: "var(--ink)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: "1.25rem",
          }}
        >
          Start knowing
          <br />
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--accent-deep)",
            }}
          >
            your numbers.
          </em>
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            fontSize: "1.05rem",
            maxWidth: "520px",
            margin: "0 auto 2.25rem",
          }}
        >
          Sign up free in under a minute. No credit card. No commitment. Two-step
          email verification keeps your account secure from day one.
        </p>

        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "center",
          }}
        >
          <Link
            href="/signup"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              padding: "0.95rem 1.75rem",
              borderRadius: "10px",
              fontWeight: 500,
              fontSize: "0.95rem",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ink-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
          >
            Create your free account
          </Link>
          <Link
            href="/login"
            style={{
              color: "var(--ink)",
              padding: "0.95rem 1.5rem",
              borderRadius: "10px",
              fontWeight: 500,
              fontSize: "0.95rem",
              border: "1px solid var(--border)",
              background: "var(--paper-soft)",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            I already have an account
          </Link>
        </div>

        <div
          style={{
            marginTop: "2.5rem",
            padding: "1rem 1.25rem",
            background: "var(--paper-soft)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            display: "inline-block",
            maxWidth: "560px",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.55, margin: 0 }}>
            FlipLedger uses AI to surface insights about your numbers. AI outputs are
            informational only — not financial, tax, or legal advice. Always verify
            important decisions with a licensed professional.{" "}
            <Link href="/disclaimer" style={{ color: "var(--accent-deep)" }}>
              Full disclaimer
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
