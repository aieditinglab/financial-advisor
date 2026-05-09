"use client";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #060d17 0%, #0F1C2E 45%, #162438 100%)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16, 185, 129, 0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(50, 87, 128, 0.15) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "8rem 2rem 6rem",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "100px",
            padding: "6px 16px",
            marginBottom: "2.5rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#10B981",
              display: "inline-block",
            }}
          />
          <span style={{ color: "#10B981", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            eBay · StockX · Amazon · Whatnot · More
          </span>
        </div>

        <div style={{ maxWidth: "780px" }}>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              color: "#FAFAF8",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              marginBottom: "1.75rem",
            }}
          >
            Know your margins.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #6EE7B7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Grow your flips.
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(250, 250, 248, 0.65)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "580px",
            }}
          >
            FlipLedger is the financial tool built for resellers. Track COGS, profit per
            item, platform fees, taxes, and cash flow — whether you're flipping sneakers,
            electronics, or anything in between. Simple enough for beginners, powerful
            enough for full-time sellers.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "4rem" }}>
            <a
              href="#contact"
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                color: "#0F1C2E",
                padding: "0.875rem 2rem",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: "0 4px 24px rgba(16, 185, 129, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(16, 185, 129, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(16, 185, 129, 0.3)";
              }}
            >
              Start Tracking for Free
            </a>
            <a
              href="#services"
              style={{
                background: "transparent",
                color: "rgba(250, 250, 248, 0.8)",
                padding: "0.875rem 2rem",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
                border: "1px solid rgba(250, 250, 248, 0.15)",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.4)";
                e.currentTarget.style.color = "#10B981";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(250, 250, 248, 0.15)";
                e.currentTarget.style.color = "rgba(250, 250, 248, 0.8)";
              }}
            >
              See the Features ↓
            </a>
          </div>

          {/* Trust indicators */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2.5rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid rgba(250, 250, 248, 0.08)",
            }}
          >
            {[
              { number: "12,400+", label: "Active resellers" },
              { number: "$8.2M+", label: "Profit tracked" },
              { number: "15", label: "Platforms supported" },
              { number: "Free", label: "Forever tier available" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#10B981",
                    letterSpacing: "-0.02em",
                    marginBottom: "2px",
                  }}
                >
                  {stat.number}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(250, 250, 248, 0.45)", letterSpacing: "0.02em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: 0.4,
        }}
      >
        <span style={{ color: "#FAFAF8", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, #FAFAF8, transparent)",
          }}
        />
      </div>
    </section>
  );
}
