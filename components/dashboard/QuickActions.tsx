"use client";

import Link from "next/link";

const ACTIONS = [
  {
    href: "/dashboard/insights",
    label: "Generate AI insights",
    sub: "Headline, wins, risks, action plan",
    accent: "var(--accent-soft)",
    color: "var(--accent-deep)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1.5l1.6 4.4 4.4 1.6-4.4 1.6L9 13.5l-1.6-4.4L3 7.5l4.4-1.6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/research",
    label: "Look up market price",
    sub: "Real eBay sold prices",
    accent: "var(--warm-soft)",
    color: "var(--warm-deep)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 12l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/calculator",
    label: "Run fee calculator",
    sub: "Net payout in seconds",
    accent: "rgba(15,157,110,0.10)",
    color: "var(--accent-deep)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="2" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 6h7M5.5 9.5h2M10.5 9.5h2M5.5 13h2M10.5 13h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/chat",
    label: "Ask the AI assistant",
    sub: "Plain-English answers",
    accent: "var(--paper-soft)",
    color: "var(--ink)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8l-3 2v-2H4a2 2 0 0 1-2-2V4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function QuickActions() {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          fontWeight: 600,
          marginBottom: "0.75rem",
        }}
      >
        Quick actions
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
        {ACTIONS.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="fl-lift"
            style={{
              display: "flex",
              gap: "0.85rem",
              alignItems: "center",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "1rem 1.1rem",
              color: "var(--ink)",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: a.accent,
                color: a.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {a.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--ink)", marginBottom: "2px" }}>
                {a.label}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{a.sub}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--text-muted)", flexShrink: 0 }}>
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
