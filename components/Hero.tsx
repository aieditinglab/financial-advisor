import Link from "next/link";

const stats = [
  { value: "6+", label: "Platforms Tracked" },
  { value: "AI", label: "Powered Insights" },
  { value: "Free", label: "To Get Started" },
  { value: "Real-time", label: "Market Data" },
];

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #3D2B1F 0%, #4A3728 55%, #5C4033 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "7rem 1.5rem 5rem",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,253,208,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,253,208,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Terracotta glow blob — top right */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-120px",
          right: "-80px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(226,114,91,0.18), rgba(226,114,91,0) 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      {/* Sage blob — bottom left */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(138,154,91,0.20), rgba(138,154,91,0) 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", width: "100%" }}>
        {/* Positioning badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(138,154,91,0.15)",
            border: "1px solid rgba(138,154,91,0.30)",
            borderRadius: "100px",
            padding: "6px 16px",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#8A9A5B",
              display: "inline-block",
              boxShadow: "0 0 0 3px rgba(138,154,91,0.25)",
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#8A9A5B",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            AI-Powered Reselling Assistant
          </span>
        </div>

        {/* Primary headline */}
        <h1
          style={{
            fontSize: "clamp(2.6rem, 6vw, 4.25rem)",
            fontWeight: 700,
            color: "#FFFDD0",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            marginBottom: "1.5rem",
            maxWidth: "820px",
          }}
        >
          Flip smarter.
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #E2725B 0%, #8A9A5B 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Profit faster.
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
            color: "rgba(255,253,208,0.70)",
            lineHeight: 1.65,
            maxWidth: "580px",
            marginBottom: "2.75rem",
          }}
        >
          Bolt Resell AI tracks your inventory across eBay, Depop, StockX & more.
          Get AI insights, market research, and profit analytics — all in one place.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "4.5rem",
          }}
        >
          <Link href="/login" className="bolt-btn-cta">
            Start Tracking Free
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
            See Features
          </a>
        </div>

        {/* Trust stats */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0",
            borderTop: "1px solid rgba(255,253,208,0.10)",
            paddingTop: "2.25rem",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                paddingRight: "2.5rem",
                paddingLeft: i > 0 ? "2.5rem" : "0",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,253,208,0.10)" : "none",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 1.85rem)",
                  fontWeight: 700,
                  color: "#E2725B",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "0.35rem",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,253,208,0.52)",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: 0.35,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "36px",
            background:
              "linear-gradient(to bottom, rgba(255,253,208,0) 0%, rgba(255,253,208,0.6) 100%)",
          }}
        />
        <span
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,253,208,0.6)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
      </div>
    </section>
  );
}
