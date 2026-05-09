"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Tier {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  cta: { label: string; href: string };
  highlighted?: boolean;
  features: { text: string; included: boolean }[];
}

const TIERS: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "Everything a starter reseller needs to track real profit.",
    cta: { label: "Start free", href: "/signup" },
    features: [
      { text: "Up to 50 items tracked", included: true },
      { text: "All 10 platforms (eBay, StockX, Depop, Whatnot, Amazon, more)", included: true },
      { text: "Profit / margin / COGS calculator", included: true },
      { text: "Basic AI insights", included: true },
      { text: "Mobile dashboard", included: true },
      { text: "Bulk CSV import", included: false },
      { text: "Quarterly tax estimates", included: false },
      { text: "Priority email support", included: false },
      { text: "Multi-store tracking", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$9",
    cadence: "/ month",
    tagline: "For sellers who treat reselling like a real business.",
    cta: { label: "Upgrade to Pro", href: "/signup?plan=pro" },
    highlighted: true,
    features: [
      { text: "Unlimited items tracked", included: true },
      { text: "All 10 platforms", included: true },
      { text: "Profit / margin / COGS calculator", included: true },
      { text: "Advanced AI insights & monthly summary", included: true },
      { text: "Mobile dashboard", included: true },
      { text: "Bulk CSV import & export", included: true },
      { text: "Quarterly tax estimates + year-end summary", included: true },
      { text: "Priority email support (24h)", included: true },
      { text: "Multi-store tracking", included: false },
    ],
  },
  {
    name: "Max",
    price: "$29",
    cadence: "/ month",
    tagline: "For high-volume teams running multiple stores at once.",
    cta: { label: "Upgrade to Max", href: "/signup?plan=max" },
    features: [
      { text: "Unlimited items tracked", included: true },
      { text: "All 10 platforms", included: true },
      { text: "Profit / margin / COGS calculator", included: true },
      { text: "Advanced AI insights & weekly digest", included: true },
      { text: "Mobile dashboard", included: true },
      { text: "Bulk CSV import & export", included: true },
      { text: "Quarterly tax estimates + year-end summary", included: true },
      { text: "Priority chat support (live, business hours)", included: true },
      { text: "Multi-store tracking (up to 10 stores)", included: true },
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--paper)", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              color: "var(--accent-deep)",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Pricing
          </span>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
              fontWeight: 500,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "1rem",
            }}
          >
            Start free.{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--accent-deep)" }}>
              Upgrade when you outgrow it.
            </em>
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.55,
              maxWidth: "560px",
              margin: "0 auto 3.5rem",
            }}
          >
            No credit card to start. Cancel any time. All plans include real platform
            fee calculation and AI insights.
          </p>
        </div>

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {TIERS.map((t) => (
            <div
              key={t.name}
              style={{
                background: t.highlighted ? "var(--ink)" : "var(--surface)",
                color: t.highlighted ? "var(--paper)" : "var(--ink)",
                border: t.highlighted ? "1px solid var(--ink)" : "1px solid var(--border)",
                borderRadius: "16px",
                padding: "2rem 1.75rem",
                position: "relative",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              className={t.highlighted ? "tier-card tier-highlight" : "tier-card"}
            >
              {t.highlighted && (
                <span
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--accent)",
                    color: "var(--ink)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "20px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Most popular
                </span>
              )}
              <h3
                className="serif"
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  margin: 0,
                  letterSpacing: "-0.015em",
                }}
              >
                {t.name}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: t.highlighted ? "rgba(245,244,237,0.65)" : "var(--text-secondary)",
                  margin: "0.4rem 0 1.5rem",
                  lineHeight: 1.5,
                  minHeight: "2.6em",
                }}
              >
                {t.tagline}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "1.75rem" }}>
                <span
                  className="serif"
                  style={{
                    fontSize: "2.6rem",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {t.price}
                </span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: t.highlighted ? "rgba(245,244,237,0.55)" : "var(--text-muted)",
                  }}
                >
                  {t.cadence}
                </span>
              </div>
              <Link
                href={t.cta.href}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: t.highlighted ? "var(--paper)" : "var(--ink)",
                  color: t.highlighted ? "var(--ink)" : "var(--paper)",
                  padding: "0.85rem 1rem",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  marginBottom: "1.75rem",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.92")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {t.cta.label}
              </Link>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {t.features.map((f) => (
                  <li
                    key={f.text}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "0.88rem",
                      lineHeight: 1.5,
                      color: f.included
                        ? t.highlighted
                          ? "rgba(245,244,237,0.85)"
                          : "var(--ink-2)"
                        : t.highlighted
                          ? "rgba(245,244,237,0.35)"
                          : "var(--text-muted)",
                      textDecoration: f.included ? "none" : "line-through",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        marginTop: "3px",
                        color: f.included
                          ? t.highlighted
                            ? "var(--accent)"
                            : "var(--accent-deep)"
                          : t.highlighted
                            ? "rgba(245,244,237,0.3)"
                            : "var(--text-muted)",
                      }}
                    >
                      {f.included ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          style={{
            maxWidth: "560px",
            margin: "3rem auto 0",
            padding: "0 1.5rem",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.82rem",
            lineHeight: 1.55,
          }}
        >
          All plans include AI-generated insights labeled as informational only.
          FlipLedger is a financial tracking tool, not a licensed financial advisor.{" "}
          <Link href="/disclaimer" style={{ color: "var(--accent-deep)" }}>
            Read the full disclaimer
          </Link>
          .
        </p>
      </main>
      <Footer />

      <style>{`
        .tier-card:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(31,30,29,0.10); }
        .tier-highlight:hover { box-shadow: 0 22px 50px rgba(31,30,29,0.30); }
      `}</style>
    </>
  );
}
