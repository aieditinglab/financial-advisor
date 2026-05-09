"use client";

import { useMemo, useState } from "react";
import type { Item } from "@/lib/types";
import { computeProfit } from "@/lib/types";
import { DEMO_ITEMS } from "@/lib/demoData";
import { platformLabel } from "@/lib/platforms";
import StatsCards from "./StatsCards";
import ItemsTable, { type DashboardRow } from "./ItemsTable";
import AddItemDialog from "./AddItemDialog";
import AIInsights from "./AIInsights";

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

export default function DashboardView({ items }: { items: Item[] }) {
  const hasRealItems = items.length > 0;
  const [mode, setMode] = useState<ViewMode>(hasRealItems ? "real" : "demo");
  const [adding, setAdding] = useState(false);

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
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.25rem 1.75rem 4rem" }}>
      {/* Top heading */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1
            className="serif"
            style={{
              fontSize: "2rem",
              fontWeight: 500,
              color: "var(--ink)",
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Dashboard
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
              margin: "6px 0 0",
              lineHeight: 1.5,
            }}
          >
            {mode === "demo"
              ? "You're viewing sample data. Add your first real item to start tracking."
              : `Tracking ${rows.length} ${rows.length === 1 ? "item" : "items"}.`}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
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
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ink-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
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
              This is a demo of how your dashboard will look once you start tracking. Click{" "}
            </span>
            <strong style={{ fontWeight: 600 }}>Add item</strong>
            <span style={{ color: "var(--text-secondary)" }}> to log your first real flip.</span>
          </p>
        </div>
      )}

      <StatsCards stats={stats} />

      <ItemsTable rows={rows} editable={mode === "real"} />

      <AIInsights rows={rows} stats={stats} />

      {adding && <AddItemDialog onClose={() => setAdding(false)} />}
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
