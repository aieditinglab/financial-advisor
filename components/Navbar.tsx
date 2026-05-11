"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--paper)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo — Serif wordmark */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
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
          <span className="serif" style={{ fontSize: "0.95rem", color: "var(--ink)" }}>
            Bolt Resell
          </span>
        </Link>

        {/* Desktop Nav — Small Caps */}
        <nav
          className="hidden-mobile"
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="small-caps fl-lift"
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link
            href="/login"
            className="small-caps fl-lift"
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Log in
          </Link>
          <Link href="/login" className="bolt-btn-cta">
            Get Started Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            color: "var(--ink)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            background: "var(--paper-soft)",
            borderTop: "1px solid var(--border)",
            padding: "1.25rem 1.5rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="small-caps"
              style={{
                color: "var(--ink)",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="bolt-btn-cta"
            style={{ marginTop: "0.5rem", justifyContent: "center" }}
          >
            Get Started Free
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  );
}
