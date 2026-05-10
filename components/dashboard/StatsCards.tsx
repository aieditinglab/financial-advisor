"use client";

interface Stats {
  totalProfit: number;
  totalRevenue: number;
  margin: number;
  soldCount: number;
  inInventory: number;
  inventoryCapital: number;
}

const fmtMoney = (n: number): string => {
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(n);
  return `${sign}$${abs.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const fmtMoneyDecimal = (n: number): string => {
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(n);
  return `${sign}$${abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function StatsCards({ stats }: { stats: Stats }) {
  const positive = stats.totalProfit >= 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))",
        gap: "0.85rem",
        marginBottom: "1.5rem",
      }}
      className="fl-stats-grid"
    >
      {/* Hero stat — net profit, gradient ink card */}
      <div
        style={{
          background: positive
            ? "linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 60%, #103325 100%)"
            : "linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 60%, #3a141d 100%)",
          color: "var(--paper)",
          borderRadius: "var(--r-lg)",
          padding: "1.4rem 1.5rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Subtle accent halo */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: positive
              ? "radial-gradient(circle, rgba(14,158,110,0.45), rgba(14,158,110,0) 70%)"
              : "radial-gradient(circle, rgba(220,44,92,0.40), rgba(220,44,92,0) 70%)",
            filter: "blur(20px)",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.85rem",
            position: "relative",
          }}
        >
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.7, fontWeight: 600 }}>
            Net profit
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: "0.7rem",
              fontWeight: 600,
              padding: "3px 8px",
              borderRadius: "100px",
              background: positive ? "rgba(14,158,110,0.18)" : "rgba(220,44,92,0.18)",
              color: positive ? "#7BE0B6" : "#F08AA0",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d={positive ? "M2 6l3-3 3 3" : "M2 4l3 3 3-3"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {stats.soldCount} sales
          </span>
        </div>
        <div
          className="serif"
          style={{
            fontSize: "clamp(2.1rem, 4.5vw, 2.6rem)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: 1,
            marginBottom: "0.5rem",
            position: "relative",
          }}
        >
          {fmtMoneyDecimal(stats.totalProfit)}
        </div>
        <div style={{ fontSize: "0.82rem", opacity: 0.65, position: "relative" }}>
          {stats.totalRevenue > 0
            ? `${stats.margin.toFixed(1)}% margin · ${fmtMoney(stats.totalRevenue)} revenue`
            : "no sales yet"}
        </div>
      </div>

      <MiniStat
        label="Revenue"
        value={fmtMoney(stats.totalRevenue)}
        sub="before fees & shipping"
      />
      <MiniStat
        label="Margin"
        value={stats.totalRevenue > 0 ? `${stats.margin.toFixed(1)}%` : "—"}
        sub="after all costs"
        accent
      />
      <MiniStat
        label="In inventory"
        value={String(stats.inInventory)}
        sub={stats.inInventory > 0 ? `${fmtMoney(stats.inventoryCapital)} tied up` : "nothing waiting"}
      />

      <style>{`
        @media (max-width: 800px) {
          .fl-stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .fl-stats-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 460px) {
          .fl-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .fl-stats-grid > div:first-child {
            grid-column: auto;
          }
        }
      `}</style>
    </div>
  );
}

function MiniStat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className="fl-lift"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        padding: "1.15rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: accent ? "var(--accent-deep)" : "var(--text-muted)",
          fontWeight: 600,
          marginBottom: "0.6rem",
        }}
      >
        {label}
      </div>
      <div
        className="serif"
        style={{
          fontSize: "1.6rem",
          fontWeight: 500,
          color: accent ? "var(--accent-deep)" : "var(--ink)",
          letterSpacing: "-0.018em",
          lineHeight: 1.05,
          marginBottom: "0.4rem",
        }}
      >
        {value}
      </div>
      <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{sub}</div>
    </div>
  );
}
