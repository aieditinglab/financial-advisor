"use client";

interface Stats {
  totalProfit: number;
  totalRevenue: number;
  margin: number;
  soldCount: number;
  inInventory: number;
  inventoryCapital: number;
}

const fmtMoney = (n: number, opts: { signed?: boolean } = {}): string => {
  const sign = n < 0 ? "−" : opts.signed && n > 0 ? "+" : "";
  const abs = Math.abs(n);
  return `${sign}$${abs.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const fmtMoneyDecimal = (n: number): string => {
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(n);
  return `${sign}$${abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function StatsCards({ stats }: { stats: Stats }) {
  const cards = [
    {
      label: "Net profit",
      value: fmtMoneyDecimal(stats.totalProfit),
      sub: stats.soldCount > 0 ? `from ${stats.soldCount} sold ${stats.soldCount === 1 ? "item" : "items"}` : "no sales yet",
      tone: stats.totalProfit >= 0 ? "positive" : "negative",
    },
    {
      label: "Revenue",
      value: fmtMoney(stats.totalRevenue),
      sub: "before fees & shipping",
      tone: "neutral" as const,
    },
    {
      label: "Margin",
      value: stats.totalRevenue > 0 ? `${stats.margin.toFixed(1)}%` : "—",
      sub: "after all costs",
      tone: "neutral" as const,
    },
    {
      label: "In inventory",
      value: String(stats.inInventory),
      sub: stats.inInventory > 0 ? `${fmtMoney(stats.inventoryCapital)} tied up` : "nothing waiting to sell",
      tone: "neutral" as const,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      {cards.map((c) => (
        <div
          key={c.label}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "1.15rem 1.25rem",
          }}
        >
          <div
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.01em",
              marginBottom: "0.4rem",
            }}
          >
            {c.label}
          </div>
          <div
            className="serif"
            style={{
              fontSize: "1.65rem",
              fontWeight: 500,
              color:
                c.tone === "positive"
                  ? "var(--accent-deep)"
                  : c.tone === "negative"
                    ? "#9F2A2A"
                    : "var(--ink)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "0.35rem",
            }}
          >
            {c.value}
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}
