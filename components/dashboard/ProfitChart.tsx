"use client";

import { useMemo } from "react";
import type { DashboardRow } from "./ItemsTable";
import { computeProfit } from "@/lib/types";

const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

export default function ProfitChart({ rows }: { rows: DashboardRow[] }) {
  const data = useMemo(() => {
    const buckets = new Map<string, number>();
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      buckets.set(monthKey(d), 0);
    }
    rows.forEach((r) => {
      if (r.status !== "sold" || !r.sold_at) return;
      const d = new Date(r.sold_at);
      const k = monthKey(d);
      if (!buckets.has(k)) return;
      const profit = computeProfit({
        sale_price: r.sale_price,
        cogs: r.cogs,
        fees: r.fees,
        shipping: r.shipping,
      });
      buckets.set(k, (buckets.get(k) ?? 0) + profit);
    });
    return Array.from(buckets.entries()).map(([month, value]) => ({ month, value }));
  }, [rows]);

  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = Math.max(1, max - min);

  const W = 100;
  const H = 40;
  const points = data.map((d, i) => {
    const x = (i / Math.max(1, data.length - 1)) * W;
    const y = H - ((d.value - min) / range) * H;
    return { x, y, ...d };
  });
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L${W},${H} L0,${H} Z`;

  const totalLast6 = data.reduce((acc, d) => acc + d.value, 0);
  const fmt = (n: number) =>
    `${n < 0 ? "−" : ""}$${Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  const bestMonth = data.reduce((best, d) => (d.value > best.value ? d : best), data[0] ?? { month: "", value: 0 });

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "1.25rem 1.4rem",
        marginBottom: "1.5rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.4rem" }}>
            Profit · last 6 months
          </div>
          <div className="serif" style={{ fontSize: "1.6rem", fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.02em" }}>
            {fmt(totalLast6)}
          </div>
        </div>
        {bestMonth && bestMonth.value > 0 && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.4rem" }}>
              Best month
            </div>
            <div style={{ fontSize: "0.92rem", color: "var(--accent-deep)", fontWeight: 600 }}>
              {fmt(bestMonth.value)} · {formatMonthShort(bestMonth.month)}
            </div>
          </div>
        )}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="120" preserveAspectRatio="none" style={{ display: "block" }}>
        <defs>
          <linearGradient id="fl-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#fl-area)" />
        <path d={linePath} fill="none" stroke="var(--accent-deep)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="0.9" fill="var(--accent-deep)" />
        ))}
      </svg>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.6rem", color: "var(--text-muted)", fontSize: "0.72rem" }}>
        {data.map((d, i) => (
          <span key={i} style={{ flex: 1, textAlign: i === 0 ? "left" : i === data.length - 1 ? "right" : "center" }}>
            {formatMonthShort(d.month)}
          </span>
        ))}
      </div>
    </div>
  );
}

function formatMonthShort(month: string): string {
  if (!month) return "";
  const [y, m] = month.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-US", {
    month: "short",
  });
}
