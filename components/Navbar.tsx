"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Our Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.25s ease",
        background: scrolled ? "rgba(15, 28, 46, 0.96)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(15,28,46,0.16)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              background: "linear-gradient(135deg, #C9A84C 0%, #B8942E 100%)",
              borderRadius: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* M monogram */}
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
              <path
                d="M1.5 12.5V1.5L8 8.5L14.5 1.5V12.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontWeight: 600,
              fontSize: "1rem",
              color: "rgba(250,250,248,0.95)",
              letterSpacing: "-0.01em",
            }}
          >
            Meridian Wealth
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden-mobile"
          style={{ display: "flex", alignItems: "center", gap: "2.25rem" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: "rgba(250,250,248,0.72)",
                fontSize: "0.88rem",
                fontWeight: 500,
                transition: "color 160ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(250,250,248,1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,250,248,0.72)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center" }}>
          <a
            href="#contact"
            className="mw-btn-gold"
            style={{ fontSize: "0.85rem", padding: "0.62rem 1.3rem" }}
          >
            Book a Call
          </a>
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
            color: "rgba(250,250,248,0.9)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
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
            background: "rgba(15,28,46,0.98)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "1.25rem 1.5rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "rgba(250,250,248,0.82)",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mw-btn-gold"
            style={{ marginTop: "0.5rem", justifyContent: "center" }}
          >
            Book a Call
          </a>
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
