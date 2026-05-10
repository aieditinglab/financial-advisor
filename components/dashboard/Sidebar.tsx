"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NAV: NavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 12V6l6-4 6 4v6a1 1 0 0 1-1 1h-3v-4H6v4H3a1 1 0 0 1-1-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/insights",
    label: "Insights",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 13h12M4 11V7M7 11V4M10 11V8M13 11V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/chat",
    label: "AI assistant",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8l-3 2v-2H4a2 2 0 0 1-2-2V4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/research",
    label: "Market research",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/calculator",
    label: "Fee calculator",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 5h6M5 8.5h2M9 8.5h2M5 11.5h2M9 11.5h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/goals",
    label: "Goals",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="8" cy="8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "/dashboard/tax",
    label: "Tax estimator",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 5l5 6M5.5 11l5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname?.startsWith(href);
  };

  return (
    <>
      <button
        className="fl-sidebar-toggle"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle navigation"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={mobileOpen ? "M4 4l10 10M14 4L4 14" : "M3 5h12M3 9h12M3 13h12"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <aside className={`fl-sidebar ${mobileOpen ? "fl-sidebar-open" : ""}`}>
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px", padding: "1rem 0.75rem" }}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMobileOpen(false)}
              className="fl-nav-item"
              data-active={isActive(n.href) ? "true" : "false"}
            >
              <span style={{ display: "inline-flex", width: 22, alignItems: "center", justifyContent: "center" }}>{n.icon}</span>
              {n.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/dashboard/admin"
              onClick={() => setMobileOpen(false)}
              className="fl-nav-item"
              data-active={isActive("/dashboard/admin") ? "true" : "false"}
            >
              <span style={{ display: "inline-flex", width: 22, alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l5 2v4c0 3-2 5.5-5 7-3-1.5-5-4-5-7V3l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </span>
              Admin
            </Link>
          )}
        </nav>
        <div
          style={{
            margin: "0.75rem",
            padding: "0.85rem 0.95rem",
            background: "linear-gradient(135deg, var(--accent-soft), var(--warm-soft))",
            border: "1px solid var(--border)",
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent-deep)", fontWeight: 700, marginBottom: "0.4rem" }}>
            Need help?
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--ink)", margin: 0, lineHeight: 1.5 }}>
            Ask the <Link href="/dashboard/chat" style={{ color: "var(--accent-deep)", fontWeight: 600 }}>AI assistant</Link> anything about your numbers.
          </p>
        </div>
      </aside>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(27,26,25,0.4)",
            zIndex: 35,
          }}
          className="fl-sidebar-backdrop"
        />
      )}

      <style>{`
        .fl-sidebar {
          width: 240px;
          flex-shrink: 0;
          background: var(--surface);
          border-right: 1px solid var(--border-subtle);
          position: sticky;
          top: 64px;
          height: calc(100vh - 64px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .fl-nav-item {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0.6rem 0.9rem;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-secondary);
          position: relative;
          transition: background 180ms ease, color 180ms ease, transform 180ms ease;
        }
        .fl-nav-item:hover {
          background: var(--paper-soft);
          color: var(--ink);
          transform: translateX(2px);
        }
        .fl-nav-item[data-active="true"] {
          background: linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 100%);
          color: var(--paper);
          box-shadow: var(--shadow-sm);
        }
        .fl-nav-item[data-active="true"]::before {
          content: "";
          position: absolute;
          left: -12px;
          top: 8px;
          bottom: 8px;
          width: 3px;
          border-radius: 0 3px 3px 0;
          background: var(--accent);
        }
        .fl-sidebar-toggle {
          display: none;
          position: fixed;
          top: 14px;
          left: 1.25rem;
          z-index: 40;
          width: 32px;
          height: 32px;
          border: 1px solid var(--border);
          background: var(--surface);
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          cursor: pointer;
        }
        @media (max-width: 900px) {
          .fl-sidebar-toggle { display: inline-flex; }
          .fl-sidebar {
            position: fixed;
            top: 60px;
            left: 0;
            transform: translateX(-100%);
            transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 36;
            box-shadow: var(--shadow-lg);
          }
          .fl-sidebar.fl-sidebar-open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
