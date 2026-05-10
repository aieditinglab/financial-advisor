"use client";

import { useEffect, useState } from "react";

interface MarketResult {
  title: string;
  price: number;
  currency: string;
  url?: string;
  source: string;
}
interface MarketSummary {
  query: string;
  count: number;
  median: number | null;
  low: number | null;
  high: number | null;
  average: number | null;
  results: MarketResult[];
}
interface SavedSearch {
  id: string;
  query: string;
  results: MarketSummary;
  created_at: string;
}

export default function ResearchView() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"sold" | "active">("sold");
  const [summary, setSummary] = useState<MarketSummary | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedSearch[]>([]);

  useEffect(() => {
    void (async () => {
      const r = await fetch("/api/research");
      if (r.ok) {
        const data = (await r.json()) as { searches: SavedSearch[] };
        setHistory(data.searches ?? []);
      }
    })();
  }, []);

  const search = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim() || pending) return;
    setPending(true);
    setError(null);
    setSummary(null);
    try {
      const r = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, mode }),
      });
      const data = (await r.json()) as { summary?: MarketSummary; error?: string };
      if (!r.ok || !data.summary) {
        setError(data.error ?? "Search failed");
      } else {
        setSummary(data.summary);
        // refresh history
        const h = await fetch("/api/research");
        if (h.ok) {
          const j = (await h.json()) as { searches: SavedSearch[] };
          setHistory(j.searches ?? []);
        }
      }
    } catch {
      setError("Network error");
    } finally {
      setPending(false);
    }
  };

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "1.75rem 1rem 5rem" }}>
      <div style={{ marginBottom: "1.25rem" }}>
        <h1 className="serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2rem)", fontWeight: 500, margin: 0, letterSpacing: "-0.02em", color: "var(--ink)" }}>
          Market research
        </h1>
        <p style={{ color: "var(--text-secondary)", margin: "6px 0 0", fontSize: "0.92rem" }}>
          Look up real eBay prices before you list. Sold prices are what items actually closed at.
        </p>
      </div>

      <form
        onSubmit={search}
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "0.6rem",
          marginBottom: "1.25rem",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='e.g. "Nike Dunk Low Panda size 10"'
          style={{
            flex: 1,
            minWidth: "220px",
            background: "transparent",
            border: "none",
            outline: "none",
            padding: "0.6rem 0.5rem",
            fontFamily: "inherit",
            fontSize: "0.95rem",
            color: "var(--ink)",
          }}
        />
        <div style={{ display: "inline-flex", background: "var(--paper-soft)", borderRadius: 8, padding: 3, border: "1px solid var(--border)" }}>
          <ModeBtn active={mode === "sold"} onClick={() => setMode("sold")}>
            Sold
          </ModeBtn>
          <ModeBtn active={mode === "active"} onClick={() => setMode("active")}>
            Listed
          </ModeBtn>
        </div>
        <button
          type="submit"
          disabled={pending || !query.trim()}
          style={{
            background: pending || !query.trim() ? "var(--border)" : "var(--ink)",
            color: "var(--paper)",
            border: "none",
            borderRadius: 10,
            padding: "0.55rem 1rem",
            fontWeight: 500,
            fontSize: "0.88rem",
            cursor: pending || !query.trim() ? "not-allowed" : "pointer",
          }}
        >
          {pending ? "Searching…" : "Search"}
        </button>
      </form>

      {error && (
        <div style={{ background: "var(--rose-soft)", border: "1px solid rgba(196,75,75,0.25)", color: "#883535", padding: "0.85rem 1.05rem", borderRadius: 10, fontSize: "0.9rem", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {summary && <SummaryView summary={summary} />}

      {history.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
            Recent searches
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {history.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setQuery(s.query);
                  setSummary(s.results);
                }}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.82rem",
                  color: "var(--ink)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {s.query}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ModeBtn({
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
      type="button"
      onClick={onClick}
      style={{
        background: active ? "var(--surface)" : "transparent",
        color: active ? "var(--ink)" : "var(--text-secondary)",
        boxShadow: active ? "0 1px 2px rgba(31,30,29,0.06)" : "none",
        border: "none",
        borderRadius: 6,
        padding: "0.45rem 0.85rem",
        fontSize: "0.825rem",
        fontWeight: active ? 600 : 500,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}

function SummaryView({ summary }: { summary: MarketSummary }) {
  if (summary.count === 0) {
    return (
      <div className="fl-rise" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", textAlign: "center" }}>
        <p style={{ color: "var(--text-secondary)", margin: 0 }}>
          No prices found for &ldquo;{summary.query}&rdquo;. Try a more specific or shorter query.
        </p>
      </div>
    );
  }
  const stats = [
    { label: "Median", value: summary.median, tone: "primary" },
    { label: "Average", value: summary.average },
    { label: "Low", value: summary.low },
    { label: "High", value: summary.high },
  ];
  return (
    <div className="fl-rise" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem" }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: s.tone === "primary" ? "var(--ink)" : "var(--surface)",
              color: s.tone === "primary" ? "var(--paper)" : "var(--ink)",
              border: s.tone === "primary" ? "none" : "1px solid var(--border)",
              borderRadius: 12,
              padding: "1rem 1.1rem",
              boxShadow: s.tone === "primary" ? "var(--shadow-md)" : "var(--shadow-sm)",
            }}
          >
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.4rem", fontWeight: 600 }}>
              {s.label}
            </div>
            <div className="serif" style={{ fontSize: "1.5rem", fontWeight: 500, letterSpacing: "-0.01em" }}>
              {s.value !== null ? `$${s.value.toFixed(2)}` : "—"}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "0.85rem 1.1rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink)" }}>
            {summary.count} prices for &ldquo;{summary.query}&rdquo;
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Source: {summary.results[0]?.source ?? "eBay"}
          </div>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {summary.results.map((r, i) => (
            <li
              key={i}
              style={{
                padding: "0.7rem 1.1rem",
                borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span style={{ fontSize: "0.88rem", color: "var(--ink)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fl-underline-link"
                    style={{ color: "var(--ink)" }}
                  >
                    {r.title}
                  </a>
                ) : (
                  r.title
                )}
              </span>
              <span className="mono" style={{ fontSize: "0.88rem", color: "var(--ink)", fontWeight: 600, flexShrink: 0 }}>
                ${r.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
