"use client";

import { computeProfit } from "@/lib/types";
import type { DashboardRow } from "./ItemsTable";

interface Stats {
  totalProfit: number;
  margin: number;
  topPlatform: { name: string; profit: number } | null;
  soldCount: number;
  inInventory: number;
}

const fmtMoney = (n: number): string => {
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(n);
  return `${sign}$${abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function AIInsights({
  rows,
  stats,
}: {
  rows: DashboardRow[];
  stats: Stats;
}) {
  const insights: string[] = [];

  if (stats.soldCount > 0) {
    insights.push(
      `Across ${stats.soldCount} sold ${stats.soldCount === 1 ? "item" : "items"}, your average margin is ${stats.margin.toFixed(1)}%.`,
    );
  }
  if (stats.topPlatform) {
    insights.push(
      `${stats.topPlatform.name} is your most profitable platform so far — ${fmtMoney(stats.topPlatform.profit)} net.`,
    );
  }
  if (stats.inInventory > 0) {
    insights.push(
      `You have ${stats.inInventory} ${stats.inInventory === 1 ? "item" : "items"} in inventory or listed. That cash is locked up until they sell.`,
    );
  }

  const losers = rows.filter((r) => {
    if (r.status !== "sold") return false;
    return (
      computeProfit({
        sale_price: r.sale_price,
        cogs: r.cogs,
        fees: r.fees,
        shipping: r.shipping,
      }) < 0
    );
  });
  if (losers.length > 0) {
    insights.push(
      `${losers.length} ${losers.length === 1 ? "item lost" : "items lost"} money after fees and shipping. Worth reviewing your pricing on similar items.`,
    );
  }

  if (insights.length === 0) {
    insights.push(
      "Add a few sold items and we'll start surfacing trends and suggestions here.",
    );
  }

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "1.5rem 1.75rem",
        marginTop: "1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "7px",
            background: "var(--accent-soft)",
            color: "var(--accent-deep)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
        <h2
          className="serif"
          style={{
            fontSize: "1.05rem",
            fontWeight: 500,
            color: "var(--ink)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          AI insights
        </h2>
        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            background: "var(--paper-soft)",
            border: "1px solid var(--border)",
            padding: "2px 8px",
            borderRadius: "20px",
            fontWeight: 500,
          }}
        >
          Informational only
        </span>
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {insights.map((text, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontSize: "0.92rem",
              color: "var(--ink-2)",
              lineHeight: 1.6,
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
                marginTop: "9px",
              }}
            />
            {text}
          </li>
        ))}
      </ul>
      <p
        style={{
          marginTop: "1rem",
          color: "var(--text-muted)",
          fontSize: "0.75rem",
          lineHeight: 1.5,
        }}
      >
        Insights are AI-generated estimates. Not financial, tax, or legal advice.
      </p>
    </div>
  );
}
