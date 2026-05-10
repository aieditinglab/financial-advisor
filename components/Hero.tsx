"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      style={{
        background: "var(--paper)",
        position: "relative",
        overflow: "hidden",
        padding: "10rem 1.5rem 6rem",
      }}
    >
      {/* Decorative halos */}
      <span
        className="fl-halo"
        aria-hidden
        style={{
          width: 560,
          height: 560,
          background: "radial-gradient(circle, rgba(14,158,110,0.32), rgba(14,158,110,0) 70%)",
          top: -180,
          right: -160,
        }}
      />
      <span
        className="fl-halo"
        aria-hidden
        style={{
          width: 420,
          height: 420,
          background: "radial-gradient(circle, rgba(217,122,26,0.22), rgba(217,122,26,0) 70%)",
          bottom: -120,
          left: -120,
          animationDelay: "-4s",
        }}
      />
      <span
        className="fl-halo"
        aria-hidden
        style={{
          width: 320,
          height: 320,
          background: "radial-gradient(circle, rgba(31,78,216,0.16), rgba(31,78,216,0) 70%)",
          top: "30%",
          left: "55%",
          animationDelay: "-7s",
        }}
      />

      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative" }}>
        <div style={{ maxWidth: "820px" }} className="fl-rise">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              padding: "6px 16px 6px 14px",
              marginBottom: "1.85rem",
              fontSize: "0.78rem",
              color: "var(--text-secondary)",
              fontWeight: 500,
              boxShadow: "var(--shadow-xs)",
            }}
          >
            <span
              className="fl-pulse-dot"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            <span style={{ color: "var(--ink)" }}>Built for resellers</span>
            <span style={{ color: "var(--text-muted)" }}>·</span>
            <span>eBay · StockX · Depop · Whatnot · Amazon · Mercari</span>
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 5rem)",
              fontWeight: 500,
              color: "var(--ink)",
              lineHeight: 1.02,
              letterSpacing: "-0.038em",
              marginBottom: "1.6rem",
            }}
          >
            Reseller finance,
            <br />
            <em
              className="fl-gradient-text"
              style={{
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              made simple.
            </em>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.08rem, 1.9vw, 1.22rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
              maxWidth: "620px",
            }}
          >
            Track real profit on every flip — after platform fees, shipping, and taxes. Whether
            you&apos;re moving 5 items a month or 500, FlipLedger replaces guesswork with numbers
            you can actually trust.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
            <Link href="/signup" className="fl-btn fl-btn-accent fl-glow-btn" style={{ padding: "0.95rem 1.7rem", fontSize: "0.98rem" }}>
              Start tracking — it&apos;s free
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8m-3-3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a href="#features" className="fl-btn fl-btn-ghost" style={{ padding: "0.95rem 1.4rem", fontSize: "0.98rem" }}>
              See how it works
            </a>
          </div>

          <div style={{ marginTop: "1.6rem", display: "flex", flexWrap: "wrap", gap: "1.5rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>
            <Trust>Free forever tier</Trust>
            <Trust>No credit card</Trust>
            <Trust>Cancel any time</Trust>
          </div>
        </div>

        {/* Dashboard preview — richer, layered */}
        <div
          style={{
            marginTop: "5rem",
            position: "relative",
          }}
        >
          {/* Floating sparkline accent card behind */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -28,
              right: 12,
              background: "linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 100%)",
              color: "var(--paper)",
              borderRadius: "var(--r-md)",
              padding: "0.85rem 1.1rem",
              boxShadow: "var(--shadow-lg)",
              transform: "rotate(2deg)",
              zIndex: 1,
              display: "none",
            }}
            className="hero-floating-card"
          >
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.6, fontWeight: 600, marginBottom: 4 }}>
              This month
            </div>
            <div className="serif" style={{ fontSize: "1.4rem", fontWeight: 500, letterSpacing: "-0.02em" }}>
              +$2,184
            </div>
            <svg width="100" height="22" viewBox="0 0 100 22" style={{ marginTop: 6 }}>
              <path d="M0 18 L20 14 L40 16 L60 8 L80 10 L100 4" stroke="var(--accent)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-xl)",
              padding: "1.4rem",
              boxShadow: "var(--shadow-xl)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--border-subtle)",
                marginBottom: "1.1rem",
              }}
            >
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E8E2D2" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E8E2D2" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E8E2D2" }} />
              <span style={{ marginLeft: "auto", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                flipledger.com / dashboard
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                gap: "0.75rem",
                marginBottom: "1.1rem",
              }}
            >
              <PreviewStat label="Net profit" value="$1,284.50" tone="accent" />
              <PreviewStat label="Revenue" value="$3,420" />
              <PreviewStat label="Margin" value="37.6%" />
              <PreviewStat label="Inventory" value="12 items" />
            </div>

            <div
              style={{
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                fontSize: "0.85rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 0.8fr 0.7fr 0.7fr",
                  gap: "1rem",
                  padding: "0.65rem 1.1rem",
                  background: "var(--paper-soft)",
                  color: "var(--text-muted)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                <span>Item</span>
                <span>Platform</span>
                <span>Sale</span>
                <span style={{ textAlign: "right" }}>Profit</span>
              </div>
              {[
                { item: "Nike Dunk Low Panda", platform: "StockX", sale: "$158.00", profit: "+$44.78" },
                { item: "Vintage Carhartt jacket", platform: "Depop", sale: "$78.00", profit: "+$51.70" },
                { item: "PS5 DualSense Edge", platform: "eBay", sale: "$189.00", profit: "+$11.50" },
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 0.8fr 0.7fr 0.7fr",
                    gap: "1rem",
                    padding: "0.75rem 1.1rem",
                    borderTop: "1px solid var(--border-subtle)",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "var(--ink)", fontWeight: 500 }}>{r.item}</span>
                  <span style={{ color: "var(--text-secondary)" }}>{r.platform}</span>
                  <span className="mono" style={{ color: "var(--text-secondary)" }}>{r.sale}</span>
                  <span
                    className="mono"
                    style={{ color: "var(--accent-deep)", fontWeight: 600, textAlign: "right" }}
                  >
                    {r.profit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 720px) {
          .hero-floating-card {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7l3.5 3.5L12 4" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </span>
  );
}

function PreviewStat({ label, value, tone }: { label: string; value: string; tone?: "accent" }) {
  return (
    <div
      style={{
        background: tone === "accent" ? "var(--accent-soft)" : "var(--paper-soft)",
        border: `1px solid ${tone === "accent" ? "rgba(14,158,110,0.20)" : "var(--border-subtle)"}`,
        borderRadius: "var(--r-md)",
        padding: "0.95rem 1.1rem",
      }}
    >
      <div style={{ color: tone === "accent" ? "var(--accent-deep)" : "var(--text-secondary)", fontSize: "0.7rem", marginBottom: "5px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </div>
      <div
        className="serif"
        style={{
          fontSize: "1.3rem",
          fontWeight: 500,
          color: tone === "accent" ? "var(--accent-deep)" : "var(--ink)",
          letterSpacing: "-0.015em",
        }}
      >
        {value}
      </div>
    </div>
  );
}
