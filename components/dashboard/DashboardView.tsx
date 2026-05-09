"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Item } from "@/lib/types";
import { computeProfit } from "@/lib/types";
import { DEMO_ITEMS } from "@/lib/demoData";
import { platformLabel } from "@/lib/platforms";
import StatsCards from "./StatsCards";
import ItemsTable, { type DashboardRow } from "./ItemsTable";
import AddItemDialog from "./AddItemDialog";
import AIInsights from "./AIInsights";
import Walkthrough, { shouldShowWalkthrough } from "./Walkthrough";

type ViewMode = "real" | "demo";

const toDemoRows = (): DashboardRow[] =>
  DEMO_ITEMS.map((d) => ({
    id: d.id,
    name: d.name,
    platform: d.platform,
    cogs: d.cogs,
    sale_price: d.status === "sold" ? d.sale_price : null,
    fees: d.fees,
    shipping: d.shipping,
    status: d.status,
    sold_at: d.sold_at,
    isDemo: true,
  }));

export default function DashboardView({
  items,
  isAdmin,
  plan,
  autoOpenWalkthrough,
}: {
  items: Item[];
  isAdmin: boolean;
  plan: string;
  autoOpenWalkthrough: boolean;
}) {
  const hasRealItems = items.length > 0;
  const [mode, setMode] = useState<ViewMode>(hasRealItems ? "real" : "demo");
  const [adding, setAdding] = useState(false);
  const [showWalk, setShowWalk] = useState(false);

  useEffect(() => {
    if (autoOpenWalkthrough && shouldShowWalkthrough()) {
      setShowWalk(true);
    }
  }, [autoOpenWalkthrough]);

  const rows: DashboardRow[] = useMemo(() => {
    if (mode === "real") {
      return items.map((it) => ({
        id: it.id,
        name: it.name,
        platform: it.platform,
        cogs: Number(it.cogs),
        sale_price: it.sale_price === null ? null : Number(it.sale_price),
        fees: Number(it.fees),
        shipping: Number(it.shipping),
        status: it.status,
        sold_at: it.sold_at,
        isDemo: false,
      }));
    }
    return toDemoRows();
  }, [mode, items]);

  const stats = useMemo(() => {
    const sold = rows.filter((r) => r.status === "sold");
    const totalProfit = sold.reduce(
      (acc, r) =>
        acc +
        computeProfit({
          sale_price: r.sale_price,
          cogs: r.cogs,
          fees: r.fees,
          shipping: r.shipping,
        }),
      0,
    );
    const totalRevenue = sold.reduce((acc, r) => acc + (r.sale_price ?? 0), 0);
    const totalCogs = sold.reduce((acc, r) => acc + r.cogs, 0);
    const margin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
    const inInventory = rows.filter(
      (r) => r.status === "in_inventory" || r.status === "listed",
    ).length;
    const inventoryCapital = rows
      .filter((r) => r.status === "in_inventory" || r.status === "listed")
      .reduce((acc, r) => acc + r.cogs, 0);

    const platformStats = new Map<string, number>();
    sold.forEach((r) => {
      if (!r.platform) return;
      const profit = computeProfit({
        sale_price: r.sale_price,
        cogs: r.cogs,
        fees: r.fees,
        shipping: r.shipping,
      });
      platformStats.set(r.platform, (platformStats.get(r.platform) ?? 0) + profit);
    });
    const topPlatform = Array.from(platformStats.entries()).sort((a, b) => b[1] - a[1])[0];

    return {
      totalProfit,
      totalRevenue,
      totalCogs,
      margin,
      soldCount: sold.length,
      inInventory,
      inventoryCapital,
      topPlatform: topPlatform
        ? { name: platformLabel(topPlatform[0]), profit: topPlatform[1] }
        : null,
    };
  }, [rows]);

  return (
    <div
      style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.75rem 1rem 5rem" }}
      className="dashboard-shell"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
            <h1
              className="serif"
              style={{
                fontSize: "clamp(1.65rem, 4vw, 2rem)",
                fontWeight: 500,
                color: "var(--ink)",
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Dashboard
            </h1>
            <span
              style={{
                background: "var(--paper-soft)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                fontSize: "0.7rem",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {plan === "max" ? "Max plan" : plan === "pro" ? "Pro plan" : "Free plan"}
            </span>
            {isAdmin && (
              <span
                style={{
                  background: "var(--ink)",
                  color: "var(--paper)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Admin
              </span>
            )}
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.92rem",
              margin: "6px 0 0",
              lineHeight: 1.5,
            }}
          >
            {mode === "demo"
              ? "Sample data shown. Add a real item to start tracking."
              : `Tracking ${rows.length} ${rows.length === 1 ? "item" : "items"}.`}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {hasRealItems && (
            <div
              style={{
                display: "inline-flex",
                background: "var(--paper-soft)",
                borderRadius: "8px",
                padding: "3px",
                border: "1px solid var(--border)",
              }}
            >
              <SegBtn active={mode === "real"} onClick={() => setMode("real")}>
                Your data
              </SegBtn>
              <SegBtn active={mode === "demo"} onClick={() => setMode("demo")}>
                Sample
              </SegBtn>
            </div>
          )}
          <button
            onClick={() => setShowWalk(true)}
            style={{
              background: "var(--surface)",
              color: "var(--ink)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "0.55rem 0.9rem",
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--ink)";
              e.currentTarget.style.background = "var(--paper-soft)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "var(--surface)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 4v3.5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Walkthrough
          </button>
          {isAdmin && (
            <Link
              href="/dashboard/admin"
              style={{
                background: "var(--surface)",
                color: "var(--ink)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "0.55rem 0.9rem",
                fontSize: "0.85rem",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Admin
            </Link>
          )}
          <button
            onClick={() => setAdding(true)}
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              border: "none",
              borderRadius: "8px",
              padding: "0.6rem 1.1rem",
              fontWeight: 500,
              fontSize: "0.875rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "background 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ink-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            Add item
          </button>
        </div>
      </div>

      {mode === "demo" && (
        <div
          className="fl-fade-in"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "0.95rem 1.15rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "var(--accent-soft)",
              color: "var(--accent-deep)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1l1.5 4 4 1.5-4 1.5L7 12 5.5 8 1.5 6.5l4-1.5z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p style={{ color: "var(--ink)", fontSize: "0.9rem", margin: 0, lineHeight: 1.55 }}>
            <strong style={{ fontWeight: 600 }}>Welcome to FlipLedger.</strong>{" "}
            <span style={{ color: "var(--text-secondary)" }}>
              This is a demo of how your dashboard will look. Click{" "}
            </span>
            <strong style={{ fontWeight: 600 }}>Add item</strong>
            <span style={{ color: "var(--text-secondary)" }}> to log your first real flip.</span>
          </p>
        </div>
      )}

      <div className="fl-fade-in fl-delay-1">
        <StatsCards stats={stats} />
      </div>

      <div className="fl-fade-in fl-delay-2">
        <ItemsTable rows={rows} editable={mode === "real"} />
      </div>

      <div className="fl-fade-in fl-delay-3">
        <AIInsights rows={rows} stats={stats} />
      </div>

      {adding && <AddItemDialog onClose={() => setAdding(false)} />}
      <Walkthrough open={showWalk} onClose={() => setShowWalk(false)} />

      <style>{`
        .fl-fade-in {
          animation: fl-fade-up 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .fl-delay-1 { animation-delay: 60ms; }
        .fl-delay-2 { animation-delay: 140ms; }
        .fl-delay-3 { animation-delay: 220ms; }
        @keyframes fl-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .dashboard-shell { padding-left: 0.85rem !important; padding-right: 0.85rem !important; }
        }
      `}</style>
    </div>
  );
}

function SegBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "var(--surface)" : "transparent",
        color: active ? "var(--ink)" : "var(--text-secondary)",
        boxShadow: active ? "0 1px 2px rgba(31,30,29,0.06)" : "none",
        border: "none",
        borderRadius: "6px",
        padding: "0.4rem 0.85rem",
        fontSize: "0.825rem",
        fontWeight: active ? 600 : 500,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
