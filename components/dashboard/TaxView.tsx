"use client";

import { useMemo, useState } from "react";
import type { Item } from "@/lib/types";
import { computeProfit } from "@/lib/types";

const SE_TAX_RATE = 0.153; // self-employment (Social Sec + Medicare)

const FEDERAL_BRACKETS_2025_SINGLE = [
  { upTo: 11925, rate: 0.10 },
  { upTo: 48475, rate: 0.12 },
  { upTo: 103350, rate: 0.22 },
  { upTo: 197300, rate: 0.24 },
  { upTo: 250525, rate: 0.32 },
  { upTo: 626350, rate: 0.35 },
  { upTo: Infinity, rate: 0.37 },
];

const STATES = [
  { code: "none", label: "No state income tax", rate: 0 },
  { code: "TX", label: "Texas", rate: 0 },
  { code: "FL", label: "Florida", rate: 0 },
  { code: "WA", label: "Washington", rate: 0 },
  { code: "TN", label: "Tennessee", rate: 0 },
  { code: "NV", label: "Nevada", rate: 0 },
  { code: "CA", label: "California (~9%)", rate: 0.09 },
  { code: "NY", label: "New York (~6%)", rate: 0.06 },
  { code: "IL", label: "Illinois (~5%)", rate: 0.0495 },
  { code: "PA", label: "Pennsylvania (~3%)", rate: 0.0307 },
  { code: "OH", label: "Ohio (~3.5%)", rate: 0.035 },
  { code: "GA", label: "Georgia (~5%)", rate: 0.0539 },
  { code: "NC", label: "North Carolina (~4.5%)", rate: 0.045 },
  { code: "MI", label: "Michigan (~4.25%)", rate: 0.0425 },
  { code: "MA", label: "Massachusetts (~5%)", rate: 0.05 },
  { code: "VA", label: "Virginia (~5.75%)", rate: 0.0575 },
  { code: "OTHER", label: "Other (custom rate)", rate: -1 },
];

function calcFederalIncomeTax(taxable: number): number {
  let tax = 0;
  let prev = 0;
  for (const b of FEDERAL_BRACKETS_2025_SINGLE) {
    if (taxable <= b.upTo) {
      tax += (taxable - prev) * b.rate;
      return tax;
    }
    tax += (b.upTo - prev) * b.rate;
    prev = b.upTo;
  }
  return tax;
}

const STANDARD_DEDUCTION = 15000; // 2025 single

export default function TaxView({ items }: { items: Item[] }) {
  const [stateCode, setStateCode] = useState("none");
  const [customStateRate, setCustomStateRate] = useState("");
  const [otherIncome, setOtherIncome] = useState("");

  const ytdProfit = useMemo(() => {
    return items
      .filter((i) => i.status === "sold" && i.sold_at)
      .filter((i) => new Date(i.sold_at!).getFullYear() === new Date().getFullYear())
      .reduce(
        (acc, i) =>
          acc +
          computeProfit({
            sale_price: i.sale_price,
            cogs: Number(i.cogs),
            fees: Number(i.fees),
            shipping: Number(i.shipping),
          }),
        0,
      );
  }, [items]);

  const stateRate = useMemo(() => {
    const s = STATES.find((s) => s.code === stateCode);
    if (!s) return 0;
    if (s.rate === -1) return Math.max(0, Number.parseFloat(customStateRate) / 100 || 0);
    return s.rate;
  }, [stateCode, customStateRate]);

  const otherIncomeNum = Math.max(0, Number.parseFloat(otherIncome) || 0);

  const calc = useMemo(() => {
    const seBase = ytdProfit * 0.9235;
    const seTax = seBase > 0 ? seBase * SE_TAX_RATE : 0;
    const halfSe = seTax / 2;
    const taxableIncome = Math.max(0, ytdProfit + otherIncomeNum - halfSe - STANDARD_DEDUCTION);
    const federalIncomeTax = calcFederalIncomeTax(taxableIncome);
    const stateTax = Math.max(0, ytdProfit + otherIncomeNum - STANDARD_DEDUCTION) * stateRate;
    const total = seTax + federalIncomeTax + stateTax;
    return {
      seTax,
      federalIncomeTax,
      stateTax,
      total,
      effective: ytdProfit > 0 ? (total / ytdProfit) * 100 : 0,
      quarterly: total / 4,
    };
  }, [ytdProfit, stateRate, otherIncomeNum]);

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "1.75rem 1rem 5rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 className="serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2rem)", fontWeight: 500, margin: 0, letterSpacing: "-0.02em", color: "var(--ink)" }}>
          Tax estimator
        </h1>
        <p style={{ color: "var(--text-secondary)", margin: "6px 0 0", fontSize: "0.92rem" }}>
          Rough quarterly estimate based on 2025 federal brackets. Not tax advice — verify with a CPA.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
        <Stat label="YTD reseller profit" value={`$${ytdProfit.toFixed(2)}`} primary />
        <Stat label="Estimated federal income tax" value={`$${calc.federalIncomeTax.toFixed(2)}`} />
        <Stat label="Estimated self-employment tax" value={`$${calc.seTax.toFixed(2)}`} />
        <Stat label={`Estimated state tax`} value={`$${calc.stateTax.toFixed(2)}`} />
      </div>

      <div className="fl-rise" style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: 14, padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.65, marginBottom: "0.6rem" }}>
          Set aside per quarter
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
          <div className="serif" style={{ fontSize: "clamp(2.4rem, 5vw, 3rem)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1 }}>
            ${calc.quarterly.toFixed(2)}
          </div>
          <div style={{ opacity: 0.7, fontSize: "0.95rem" }}>
            ≈ ${calc.total.toFixed(2)} total annual tax · {calc.effective.toFixed(1)}% effective rate
          </div>
        </div>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem" }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
          Your situation
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <Field label="Filing status">
            <select disabled value="single" style={selectStyle}>
              <option value="single">Single</option>
            </select>
          </Field>

          <Field label="State">
            <select value={stateCode} onChange={(e) => setStateCode(e.target.value)} style={selectStyle}>
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>

          {stateCode === "OTHER" && (
            <Field label="Custom state rate (%)">
              <input
                type="number"
                step="0.1"
                value={customStateRate}
                onChange={(e) => setCustomStateRate(e.target.value)}
                placeholder="e.g. 4.5"
                style={inputStyle}
              />
            </Field>
          )}

          <Field label="Other income this year">
            <input
              type="number"
              min={0}
              step="100"
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              placeholder="e.g. 25000 (W-2 job)"
              style={inputStyle}
            />
          </Field>
        </div>
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "1.5rem", lineHeight: 1.55 }}>
        These numbers are an estimate using 2025 single-filer brackets, the standard deduction ($15,000), and a 15.3% self-employment tax on net profit. Actual obligations depend on deductions, additional income, and local tax. Talk to a tax professional before filing.
      </p>
    </div>
  );
}

function Stat({ label, value, primary }: { label: string; value: string; primary?: boolean }) {
  return (
    <div
      style={{
        background: primary ? "var(--accent-soft)" : "var(--surface)",
        border: `1px solid ${primary ? "rgba(15,157,110,0.25)" : "var(--border)"}`,
        borderRadius: 12,
        padding: "1rem 1.1rem",
      }}
    >
      <div style={{ fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase", color: primary ? "var(--accent-deep)" : "var(--text-muted)", marginBottom: "0.4rem", fontWeight: 600 }}>
        {label}
      </div>
      <div className="serif" style={{ fontSize: "1.4rem", fontWeight: 500, color: primary ? "var(--accent-deep)" : "var(--ink)", letterSpacing: "-0.01em" }}>
        {value}
      </div>
    </div>
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
const selectStyle: React.CSSProperties = { ...inputStyle };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 }}>{label}</span>
      {children}
    </label>
  );
}
