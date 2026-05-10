"use client";

import { useState } from "react";

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  placeholder: string;
  connected: boolean;
  username: string;
  stats?: {
    totalSales: number;
    totalRevenue: number;
    avgRating: number;
    activeListings: number;
  };
}

const PLATFORMS: Platform[] = [
  {
    id: "ebay",
    name: "eBay",
    icon: "E",
    color: "#E53238",
    placeholder: "your-ebay-username",
    connected: false,
    username: "",
  },
  {
    id: "depop",
    name: "Depop",
    icon: "D",
    color: "#FF2300",
    placeholder: "@your-depop-handle",
    connected: false,
    username: "",
  },
  {
    id: "facebook",
    name: "Facebook Marketplace",
    icon: "F",
    color: "#1877F2",
    placeholder: "your-fb-marketplace-url",
    connected: false,
    username: "",
  },
];

export default function ProfilesView() {
  const [platforms, setPlatforms] = useState<Platform[]>(PLATFORMS);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [report, setReport] = useState<{ platform: string; data: AnalysisReport } | null>(null);

  const updateUsername = (id: string, username: string) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, username } : p))
    );
  };

  const connectPlatform = async (id: string) => {
    const platform = platforms.find((p) => p.id === id);
    if (!platform || !platform.username.trim()) return;

    setAnalyzing(id);

    // Simulate analysis (in production, this would call a scraping/analysis API)
    await new Promise((r) => setTimeout(r, 2500));

    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              connected: true,
              stats: {
                totalSales: Math.floor(Math.random() * 200) + 20,
                totalRevenue: Math.floor(Math.random() * 8000) + 500,
                avgRating: +(4 + Math.random()).toFixed(1),
                activeListings: Math.floor(Math.random() * 50) + 5,
              },
            }
          : p
      )
    );
    setAnalyzing(null);
  };

  const generateReport = async (id: string) => {
    const platform = platforms.find((p) => p.id === id);
    if (!platform?.connected) return;

    setAnalyzing(id);

    try {
      const r = await fetch("/api/profile-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: platform.name,
          username: platform.username,
          stats: platform.stats,
        }),
      });
      const data = await r.json();
      setReport({ platform: platform.name, data: data.report });
    } catch {
      setReport({
        platform: platform.name,
        data: {
          summary: "Unable to generate report right now. Please try again later.",
          strengths: [],
          improvements: [],
          goalSuggestions: [],
        },
      });
    } finally {
      setAnalyzing(null);
    }
  };

  const connectedCount = platforms.filter((p) => p.connected).length;

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", padding: "1.75rem 1rem 3rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1
          className="serif"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2rem)",
            fontWeight: 500,
            margin: 0,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          Linked profiles
        </h1>
        <p style={{ color: "var(--text-secondary)", margin: "6px 0 0", fontSize: "0.92rem" }}>
          Connect your selling accounts for cross-platform analysis and insights.
        </p>
      </div>

      {/* Connected summary */}
      {connectedCount > 0 && (
        <div
          style={{
            background: "var(--sage-soft, #E8EDDA)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "1rem 1.25rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--sage, #8A9A5B)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            {connectedCount}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--ink)" }}>
              {connectedCount} platform{connectedCount > 1 ? "s" : ""} connected
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              Your data feeds into Dashboard insights and Goals automatically.
            </div>
          </div>
        </div>
      )}

      {/* Platform cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {platforms.map((p) => (
          <div
            key={p.id}
            style={{
              background: "var(--surface)",
              border: p.connected ? `2px solid var(--sage, #8A9A5B)` : "1px solid var(--border)",
              borderRadius: 14,
              padding: "1.25rem 1.5rem",
              transition: "border-color 200ms ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: p.connected ? "1rem" : 0 }}>
              {/* Platform icon */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: p.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  flexShrink: 0,
                }}
              >
                {p.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--ink)" }}>
                  {p.name}
                  {p.connected && (
                    <span
                      style={{
                        marginLeft: 8,
                        fontSize: "0.72rem",
                        background: "var(--sage-soft, #E8EDDA)",
                        color: "var(--sage-deep, #5A6B3B)",
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontWeight: 600,
                      }}
                    >
                      Connected
                    </span>
                  )}
                </div>
                {!p.connected && (
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", alignItems: "center" }}>
                    <input
                      type="text"
                      placeholder={p.placeholder}
                      value={p.username}
                      onChange={(e) => updateUsername(p.id, e.target.value)}
                      className="fl-input"
                      style={{ maxWidth: 260, padding: "0.45rem 0.75rem", fontSize: "0.88rem" }}
                    />
                    <button
                      onClick={() => connectPlatform(p.id)}
                      disabled={!p.username.trim() || analyzing === p.id}
                      className="fl-btn fl-btn-accent"
                      style={{ padding: "0.45rem 1rem", fontSize: "0.82rem" }}
                    >
                      {analyzing === p.id ? "Analyzing..." : "Connect"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats when connected */}
            {p.connected && p.stats && (
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "0.75rem",
                    marginBottom: "0.85rem",
                  }}
                >
                  <StatBox label="Total Sales" value={`${p.stats.totalSales}`} />
                  <StatBox label="Revenue" value={`$${p.stats.totalRevenue.toLocaleString()}`} />
                  <StatBox label="Avg Rating" value={`${p.stats.avgRating}/5`} />
                  <StatBox label="Active Listings" value={`${p.stats.activeListings}`} />
                </div>
                <button
                  onClick={() => generateReport(p.id)}
                  disabled={analyzing === p.id}
                  className="fl-btn fl-btn-primary"
                  style={{ fontSize: "0.82rem", padding: "0.45rem 1rem" }}
                >
                  {analyzing === p.id ? "Generating..." : "Generate Analysis Report"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Analysis Report Modal */}
      {report && (
        <div
          style={{
            marginTop: "2rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "1.5rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0, color: "var(--ink)" }}>
              {report.platform} Analysis Report
            </h2>
            <button
              onClick={() => setReport(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                fontSize: "1.2rem",
              }}
            >
              &times;
            </button>
          </div>

          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
            {report.data.summary}
          </p>

          {report.data.strengths.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--sage-deep, #5A6B3B)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Strengths
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.7 }}>
                {report.data.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {report.data.improvements.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent, #E2725B)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Areas to Improve
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.7 }}>
                {report.data.improvements.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {report.data.goalSuggestions.length > 0 && (
            <div>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Suggested Goals
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.7 }}>
                {report.data.goalSuggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "var(--paper-soft)",
        borderRadius: 8,
        padding: "0.6rem 0.8rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>{value}</div>
      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{label}</div>
    </div>
  );
}

interface AnalysisReport {
  summary: string;
  strengths: string[];
  improvements: string[];
  goalSuggestions: string[];
}
