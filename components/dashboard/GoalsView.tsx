"use client";

import { useMemo, useState } from "react";
import type { Item } from "@/lib/types";
import { computeProfit } from "@/lib/types";

interface Goal {
  id: string;
  month: string;
  profit_target: number;
  revenue_target: number;
  notes: string | null;
}

const formatMonth = (month: string) => {
  const [y, m] = month.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const currentMonthKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export default function GoalsView({
  items,
  initialGoals,
}: {
  items: Item[];
  initialGoals: Goal[];
}) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [month, setMonth] = useState(currentMonthKey());
  const [profitTarget, setProfitTarget] = useState("500");
  const [revenueTarget, setRevenueTarget] = useState("1500");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const monthlyActuals = useMemo(() => {
    const map = new Map<string, { profit: number; revenue: number; sales: number }>();
    items
      .filter((i) => i.status === "sold" && i.sold_at)
      .forEach((i) => {
        const d = new Date(i.sold_at!);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        const cur = map.get(key) ?? { profit: 0, revenue: 0, sales: 0 };
        cur.profit += computeProfit({
          sale_price: i.sale_price,
          cogs: Number(i.cogs),
          fees: Number(i.fees),
          shipping: Number(i.shipping),
        });
        cur.revenue += Number(i.sale_price ?? 0);
        cur.sales += 1;
        map.set(key, cur);
      });
    return map;
  }, [items]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const r = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month,
          profit_target: Number.parseFloat(profitTarget) || 0,
          revenue_target: Number.parseFloat(revenueTarget) || 0,
          notes: notes.trim() || null,
        }),
      });
      const data = (await r.json()) as { goal?: Goal; error?: string };
      if (data.goal) {
        setGoals((prev) => {
          const filtered = prev.filter((g) => g.id !== data.goal!.id && g.month !== data.goal!.month);
          return [data.goal!, ...filtered].sort((a, b) => b.month.localeCompare(a.month));
        });
        setNotes("");
      }
    } finally {
      setSaving(false);
    }
  };

  const deleteGoal = async (id: string) => {
    if (!confirm("Delete this goal?")) return;
    await fetch(`/api/goals?id=${id}`, { method: "DELETE" });
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "1.75rem 1rem 5rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 className="serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2rem)", fontWeight: 500, margin: 0, letterSpacing: "-0.02em", color: "var(--ink)" }}>
          Monthly goals
        </h1>
        <p style={{ color: "var(--text-secondary)", margin: "6px 0 0", fontSize: "0.92rem" }}>
          Set profit and revenue targets. Track how the actuals stack up.
        </p>
      </div>

      <form
        onSubmit={save}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "1.5rem",
          marginBottom: "1.5rem",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
          New goal
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.85rem" }}>
          <Field label="Month">
            <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Profit target ($)">
            <input type="number" min={0} value={profitTarget} onChange={(e) => setProfitTarget(e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Revenue target ($)">
            <input type="number" min={0} value={revenueTarget} onChange={(e) => setRevenueTarget(e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Notes (optional)">
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Q4 push" style={inputStyle} />
          </Field>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="fl-glow-btn"
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            border: "none",
            borderRadius: 10,
            padding: "0.6rem 1.1rem",
            fontWeight: 500,
            fontSize: "0.88rem",
            cursor: saving ? "wait" : "pointer",
            marginTop: "1rem",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving…" : "Save goal"}
        </button>
      </form>

      {goals.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px dashed var(--border)", borderRadius: 14, padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
          No goals yet. Set one for this month above.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {goals.map((g) => {
            const actuals = monthlyActuals.get(g.month) ?? { profit: 0, revenue: 0, sales: 0 };
            const profitPct =
              g.profit_target > 0 ? Math.min(150, (actuals.profit / g.profit_target) * 100) : 0;
            const revenuePct =
              g.revenue_target > 0 ? Math.min(150, (actuals.revenue / g.revenue_target) * 100) : 0;
            return (
              <div
                key={g.id}
                className="fl-lift"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "1.25rem 1.4rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div>
                    <div className="serif" style={{ fontSize: "1.15rem", fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                      {formatMonth(g.month)}
                    </div>
                    {g.notes && <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "2px" }}>{g.notes}</div>}
                  </div>
                  <button
                    onClick={() => deleteGoal(g.id)}
                    style={{
                      background: "transparent",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      padding: "0.35rem 0.7rem",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Delete
                  </button>
                </div>
                <Bar
                  label="Profit"
                  actual={actuals.profit}
                  target={Number(g.profit_target)}
                  pct={profitPct}
                />
                <div style={{ height: "0.85rem" }} />
                <Bar
                  label="Revenue"
                  actual={actuals.revenue}
                  target={Number(g.revenue_target)}
                  pct={revenuePct}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Bar({ label, actual, target, pct }: { label: string; actual: number; target: number; pct: number }) {
  const hit = pct >= 100;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: "0.85rem", marginBottom: "0.4rem" }}>
        <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{label}</span>
        <span style={{ color: hit ? "var(--accent-deep)" : "var(--ink)" }}>
          <strong>${actual.toFixed(0)}</strong>{" "}
          <span style={{ color: "var(--text-muted)" }}>of ${target.toFixed(0)}</span>
        </span>
      </div>
      <div
        style={{
          height: 8,
          background: "var(--paper-soft)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 100,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(100, pct)}%`,
            background: hit
              ? "linear-gradient(90deg, var(--accent), var(--accent-deep))"
              : "linear-gradient(90deg, var(--warm), var(--accent))",
            borderRadius: 100,
            transition: "width 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--paper-soft)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "0.55rem 0.75rem",
  fontFamily: "inherit",
  fontSize: "0.95rem",
  color: "var(--ink)",
  outline: "none",
};
