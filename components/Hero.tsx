import Link from "next/link";

const platforms = [
  { name: "eBay", color: "#E53238" },
  { name: "Depop", color: "#FF2300" },
  { name: "StockX", color: "#006340" },
  { name: "Mercari", color: "#1493C5" },
  { name: "Poshmark", color: "#7B2D8E" },
  { name: "FB Marketplace", color: "#1877F2" },
];

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 70% 0%, rgba(212,96,74,0.10) 0%, transparent 40%), radial-gradient(ellipse at 30% 100%, rgba(138,154,91,0.10) 0%, transparent 50%), linear-gradient(165deg, #1F1A14 0%, #2D241A 50%, #3D2B1F 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "7rem 1.5rem 5rem",
      }}
    >
      {/* Animated grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,253,208,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,253,208,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          pointerEvents: "none",
          animation: "fl-grid-pan 30s linear infinite",
        }}
      />

      {/* Floating glows */}
      <span aria-hidden="true" className="fl-halo" style={{ top: "-160px", right: "-100px", width: "560px", height: "560px", background: "radial-gradient(circle, rgba(212,96,74,0.20), transparent 70%)" }} />
      <span aria-hidden="true" className="fl-halo" style={{ bottom: "-100px", left: "-80px", width: "440px", height: "440px", background: "radial-gradient(circle, rgba(138,154,91,0.22), transparent 70%)", animationDelay: "3s" }} />
      <span aria-hidden="true" className="fl-halo" style={{ top: "30%", left: "40%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(201,168,118,0.10), transparent 70%)", animationDelay: "6s" }} />

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          position: "relative",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* LEFT: Copy */}
        <div className="fl-stagger">
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(138,154,91,0.12)",
              border: "1px solid rgba(138,154,91,0.30)",
              borderRadius: "100px",
              padding: "7px 18px",
              marginBottom: "1.75rem",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              className="fl-pulse-dot"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#C9DC8A",
              }}
            />
            <span
              style={{
                fontSize: "0.74rem",
                fontWeight: 600,
                color: "#C9DC8A",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
              }}
            >
              AI-Powered · Built for Resellers
            </span>
          </div>

          {/* Headline */}
          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.75rem, 6.5vw, 4.75rem)",
              fontWeight: 500,
              color: "#FAF7E8",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              marginBottom: "1.5rem",
              maxWidth: "640px",
            }}
          >
            The intelligent
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>operating system</span>
            <br />
            for resellers.
          </h1>

          {/* Sub */}
          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
              color: "rgba(250,247,232,0.70)",
              lineHeight: 1.65,
              maxWidth: "520px",
              marginBottom: "2.5rem",
              fontWeight: 400,
            }}
          >
            Track inventory across every marketplace. Get real-time AI insights on what's working,
            what's not, and exactly where to focus next.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginBottom: "3.5rem" }}>
            <Link href="/login" className="bolt-btn-cta">
              Start Free
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a href="#features" className="bolt-btn-ghost-light">
              See How It Works
            </a>
          </div>

          {/* Platform chips */}
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "rgba(250,247,232,0.45)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "0.85rem",
              }}
            >
              Works across
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {platforms.map((p) => (
                <div
                  key={p.name}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    background: "rgba(250,247,232,0.05)",
                    border: "1px solid rgba(250,247,232,0.10)",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "rgba(250,247,232,0.75)",
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: p.color }} />
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Product preview card */}
        <div className="fl-scale-fade hero-preview" style={{ position: "relative", animationDelay: "200ms" }}>
          {/* Decorative orbit */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #D4604A, #E07A5F)",
              boxShadow: "0 0 30px rgba(212,96,74,0.6)",
              animation: "fl-float 5s ease-in-out infinite",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "-20px",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8A9A5B, #A8B87A)",
              boxShadow: "0 0 24px rgba(138,154,91,0.6)",
              animation: "fl-float 6s ease-in-out infinite reverse",
            }}
          />

          {/* Main preview card */}
          <div
            style={{
              background: "linear-gradient(180deg, rgba(250,247,232,0.06) 0%, rgba(250,247,232,0.02) 100%)",
              border: "1px solid rgba(250,247,232,0.12)",
              borderRadius: 20,
              padding: "1.5rem",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
            }}
          >
            {/* Window chrome */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(250,247,232,0.18)" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(250,247,232,0.18)" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(250,247,232,0.18)" }} />
              </div>
              <span style={{ fontSize: "0.7rem", color: "rgba(250,247,232,0.4)", letterSpacing: "0.08em" }}>
                bolt resell ai · live
              </span>
            </div>

            {/* Mock stats */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.7rem", color: "rgba(250,247,232,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 600 }}>
                Net Profit · This Month
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                <span className="serif" style={{ fontSize: "2.4rem", fontWeight: 500, color: "#FAF7E8", letterSpacing: "-0.02em" }}>
                  $4,827
                </span>
                <span style={{ fontSize: "0.85rem", color: "#C9DC8A", fontWeight: 600 }}>
                  ↑ 23.4%
                </span>
              </div>
            </div>

            {/* Mini sparkline */}
            <svg viewBox="0 0 280 60" style={{ width: "100%", height: 60, marginBottom: "1.25rem" }}>
              <defs>
                <linearGradient id="hero-spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4604A" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#D4604A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,45 Q35,42 60,38 T120,30 T180,22 T240,15 L280,12 L280,60 L0,60 Z"
                fill="url(#hero-spark)"
              />
              <path
                d="M0,45 Q35,42 60,38 T120,30 T180,22 T240,15 L280,12"
                fill="none"
                stroke="#D4604A"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* AI Insight pill */}
            <div
              style={{
                background: "rgba(138,154,91,0.12)",
                border: "1px solid rgba(138,154,91,0.30)",
                borderRadius: 12,
                padding: "0.85rem 1rem",
                display: "flex",
                gap: "0.7rem",
                alignItems: "flex-start",
              }}
            >
              <span
                className="fl-pulse-dot"
                style={{
                  marginTop: 5,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#C9DC8A",
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: "0.72rem", color: "#C9DC8A", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                  AI Insight · Just now
                </div>
                <div style={{ fontSize: "0.84rem", color: "rgba(250,247,232,0.85)", lineHeight: 1.5 }}>
                  StockX margins are <strong style={{ color: "#FAF7E8" }}>14% higher</strong> than your eBay flips. Consider reallocating sneaker inventory.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .hero-preview { max-width: 480px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
