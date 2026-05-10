"use client";

import { useEffect, useState } from "react";

interface Highlight {
  title: string;
  body: string;
  tone: "good" | "warn" | "info";
}
interface Insights {
  headline: string;
  highlights: Highlight[];
  actions: string[];
}

const toneStyles = {
  good: { bg: "var(--sage-soft, #E8EDDA)", color: "var(--sage-deep, #5A6B3B)", border: "rgba(138,154,91,0.30)" },
  warn: { bg: "var(--rose-soft)", color: "#883535", border: "rgba(196,75,75,0.30)" },
  info: { bg: "var(--accent-soft, #FBEAE6)", color: "var(--accent-deep, #B84D3A)", border: "rgba(226,114,91,0.25)" },
} as const;

export default function InsightsView() {
  const [data, setData] = useState<Insights | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/insights", { method: "POST" });
      const json = (await r.json()) as { insights?: Insights; error?: string };
      if (!r.ok || !json.insights) {
        setError(json.error ?? "Couldn't generate insights.");
      } else {
        setData(json.insights);
      }
    } catch {
      setError("Network error while generating insights.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void generate();
    // Auto-refresh insights every 90 seconds
    const interval = setInterval(() => {
      void generate();
    }, 90_000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "1.75rem 1rem 5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 className="serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2rem)", fontWeight: 500, margin: 0, letterSpacing: "-0.02em", color: "var(--ink)" }}>
            Smart insights
          </h1>
          <p style={{ color: "var(--text-secondary)", margin: "6px 0 0", fontSize: "0.92rem" }}>
            A live AI briefing on your reseller business. Refreshes whenever you want.
          </p>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="fl-glow-btn"
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            border: "none",
            borderRadius: 10,
            padding: "0.6rem 1rem",
            fontWeight: 500,
            fontSize: "0.88rem",
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Thinking…" : data ? "Refresh" : "Generate"}
        </button>
      </div>

      {error && (
        <div style={{ background: "var(--rose-soft)", border: "1px solid rgba(196,75,75,0.25)", color: "#883535", padding: "0.85rem 1.05rem", borderRadius: 10, fontSize: "0.9rem", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {!data && loading && <SkeletonCard />}

      {data && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="fl-rise" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", boxShadow: "var(--shadow-md)" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sage-deep, #5A6B3B)", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sage, #8A9A5B)", display: "inline-block", animation: "fl-pulse-dot 2.2s ease-in-out infinite" }} />
              Live Briefing
            </div>
            <p className="serif" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", fontWeight: 500, color: "var(--ink)", lineHeight: 1.4, margin: 0, letterSpacing: "-0.01em" }}>
              {data.headline}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {data.highlights.map((h, i) => {
              const t = toneStyles[h.tone] ?? toneStyles.info;
              return (
                <div
                  key={i}
                  className="fl-lift"
                  style={{
                    background: t.bg,
                    border: `1px solid ${t.border}`,
                    borderRadius: 12,
                    padding: "1.1rem 1.2rem",
                    color: t.color,
                  }}
                >
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    {h.title}
                  </div>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.5, margin: 0, color: "var(--ink)" }}>{h.body}</p>
                </div>
              );
            })}
          </div>

          <div className="fl-rise" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.85rem" }}>
              Action plan
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {data.actions.map((a, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: "0.65rem",
                    alignItems: "flex-start",
                    fontSize: "0.95rem",
                    color: "var(--ink)",
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: "5px",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--accent)",
                    }}
                  />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "1.5rem", textAlign: "center" }}>
        AI insights are informational only and not financial, tax, or legal advice.
      </p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {[80, 60, 70].map((w, i) => (
        <div key={i} style={{ width: `${w}%`, height: "14px", borderRadius: 4, background: "var(--border-subtle)", animation: "fl-shimmer 1.5s ease-in-out infinite" }} />
      ))}
    </div>
  );
}
