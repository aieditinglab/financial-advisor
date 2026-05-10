"use client";

import { useMemo, useState } from "react";

interface FeeStructure {
  label: string;
  pct: number; // percentage as 0-1
  flat: number;
  notes: string;
}

const FEES: Record<string, FeeStructure> = {
  ebay: { label: "eBay", pct: 0.1325, flat: 0.30, notes: "13.25% final value fee + $0.30 transaction fee" },
  stockx: { label: "StockX", pct: 0.10, flat: 4.0, notes: "9% transaction + 3% payment processing" },
  depop: { label: "Depop", pct: 0.10, flat: 0.0, notes: "10% selling fee (Depop dropped its 8% in 2024)" },
  whatnot: { label: "Whatnot", pct: 0.08, flat: 0.30, notes: "8% commission + $0.30 transaction" },
  amazon: { label: "Amazon FBA", pct: 0.15, flat: 3.50, notes: "15% referral + ~$3.50 fulfillment" },
  mercari: { label: "Mercari", pct: 0.10, flat: 0.50, notes: "10% selling fee + $0.50" },
  poshmark: { label: "Poshmark", pct: 0.20, flat: 0.0, notes: "20% over $15 (flat $2.95 under)" },
  etsy: { label: "Etsy", pct: 0.065, flat: 0.20, notes: "6.5% transaction + $0.20 listing" },
  facebook: { label: "Facebook Marketplace", pct: 0.05, flat: 0.40, notes: "5% selling fee + $0.40 (or free for local)" },
  other: { label: "Other", pct: 0.10, flat: 0.0, notes: "Custom platform — adjust below" },
};

export default function CalculatorView() {
  const [platform, setPlatform] = useState<keyof typeof FEES>("ebay");
  const [salePrice, setSalePrice] = useState("100");
  const [cogs, setCogs] = useState("40");
  const [shipping, setShipping] = useState("8");
  const [customPct, setCustomPct] = useState("");
  const [customFlat, setCustomFlat] = useState("");

  const fee = FEES[platform];
  const sale = Math.max(0, Number.parseFloat(salePrice) || 0);
  const cogsN = Math.max(0, Number.parseFloat(cogs) || 0);
  const shipN = Math.max(0, Number.parseFloat(shipping) || 0);

  const usingCustom = !!(customPct || customFlat);
  const pct = usingCustom ? Math.max(0, Number.parseFloat(customPct) || 0) / 100 : fee.pct;
  const flat = usingCustom ? Math.max(0, Number.parseFloat(customFlat) || 0) : fee.flat;

  const calc = useMemo(() => {
    const fees = sale * pct + flat;
    const net = sale - fees;
    const profit = net - cogsN - shipN;
    const margin = sale > 0 ? (profit / sale) * 100 : 0;
    return { fees, net, profit, margin };
  }, [sale, pct, flat, cogsN, shipN]);

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", padding: "1.75rem 1rem 5rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 className="serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2rem)", fontWeight: 500, margin: 0, letterSpacing: "-0.02em", color: "var(--ink)" }}>
          Fee calculator
        </h1>
        <p style={{ color: "var(--text-secondary)", margin: "6px 0 0", fontSize: "0.92rem" }}>
          Run the numbers before you list. Net payout, profit, and margin in real time.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
            <Field label="Platform">
              <select
                value={platform}
                onChange={(e) => {
                  setPlatform(e.target.value as keyof typeof FEES);
                  setCustomPct("");
                  setCustomFlat("");
                }}
                style={inputStyle}
              >
                {Object.entries(FEES).map(([k, f]) => (
                  <option key={k} value={k}>
                    {f.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Sale price ($)">
              <input type="number" step="0.01" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="What you paid ($)">
              <input type="number" step="0.01" value={cogs} onChange={(e) => setCogs(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Shipping cost ($)">
              <input type="number" step="0.01" value={shipping} onChange={(e) => setShipping(e.target.value)} style={inputStyle} />
            </Field>
          </div>

          <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem" }}>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.5rem", lineHeight: 1.5 }}>
              {fee.notes}
            </div>
            <details>
              <summary style={{ cursor: "pointer", fontSize: "0.82rem", color: "var(--accent-deep)", fontWeight: 500 }}>
                Override fee rate
              </summary>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "0.75rem" }}>
                <Field label="Override % fee">
                  <input type="number" step="0.1" value={customPct} onChange={(e) => setCustomPct(e.target.value)} placeholder={`Default: ${(fee.pct * 100).toFixed(2)}%`} style={inputStyle} />
                </Field>
                <Field label="Override $ fee">
                  <input type="number" step="0.01" value={customFlat} onChange={(e) => setCustomFlat(e.target.value)} placeholder={`Default: $${fee.flat.toFixed(2)}`} style={inputStyle} />
                </Field>
              </div>
            </details>
          </div>
        </div>

        <div className="fl-rise" style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: 14, padding: "1.5rem", boxShadow: "var(--shadow-lg)" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.65, marginBottom: "0.5rem", fontWeight: 600 }}>
            Net profit
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", flexWrap: "wrap" }}>
            <span
              className="serif"
              style={{
                fontSize: "clamp(2.4rem, 6vw, 3.2rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: calc.profit >= 0 ? "var(--paper)" : "#FF9B9B",
              }}
            >
              {calc.profit >= 0 ? "" : "-"}${Math.abs(calc.profit).toFixed(2)}
            </span>
            <span style={{ opacity: 0.7, fontSize: "0.95rem" }}>
              {calc.margin >= 0 ? `+${calc.margin.toFixed(1)}% margin` : `${calc.margin.toFixed(1)}% margin`}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", marginTop: "1.5rem", borderTop: "1px solid rgba(245,244,237,0.12)", paddingTop: "1.25rem" }}>
            <Mini label="Sale" value={`$${sale.toFixed(2)}`} />
            <Mini label="Fees" value={`-$${calc.fees.toFixed(2)}`} />
            <Mini label="Net payout" value={`$${calc.net.toFixed(2)}`} />
            <Mini label="Costs" value={`-$${(cogsN + shipN).toFixed(2)}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.6, marginBottom: "0.25rem", fontWeight: 600 }}>
        {label}
      </div>
      <div className="mono" style={{ fontSize: "1rem", fontWeight: 500 }}>
        {value}
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
