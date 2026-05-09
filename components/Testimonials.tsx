const testimonials = [
  {
    quote:
      "I was making sales but had no idea if I was actually profitable after eBay fees, shipping, and what I originally paid. FlipLedger showed me I was losing money on an entire category. Fixed it in a week.",
    name: "Jordan M.",
    detail: "eBay reseller · 3 years flipping electronics",
    initials: "JM",
  },
  {
    quote:
      "Tax season used to terrify me. Now I just export my FlipLedger summary and hand it to my tax preparer. Saved me hours and probably saved me money because all my expenses were actually tracked.",
    name: "Destiny R.",
    detail: "Amazon FBA seller · apparel & home goods",
    initials: "DR",
  },
  {
    quote:
      "I'm 17 and started reselling sneakers on StockX last year. FlipLedger is the first app that actually made sense to me. I know exactly what I made each month and where it went.",
    name: "Tyler K.",
    detail: "StockX seller · sneakers & streetwear",
    initials: "TK",
  },
  {
    quote:
      "The platform fee calculator alone is worth it. I used to just guess what I'd net. Now I run the numbers before I list anything. My margins are up 12% since I started using it seriously.",
    name: "Priya S.",
    detail: "Whatnot & Mercari · vintage clothing",
    initials: "PS",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ background: "#FAFAF8", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem" }}>
          <span
            style={{
              display: "inline-block",
              color: "#10B981",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Seller Stories
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "#0F1C2E",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            Real sellers. Real results.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              style={{
                background: i % 2 === 0 ? "#0F1C2E" : "#F4F3EF",
                borderRadius: "14px",
                padding: "2.25rem",
                border: `1px solid ${i % 2 === 0 ? "rgba(16, 185, 129, 0.12)" : "#E8E6DF"}`,
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  color: "#10B981",
                  fontSize: "3rem",
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                  opacity: 0.6,
                }}
              >
                &ldquo;
              </div>

              <p
                style={{
                  color: i % 2 === 0 ? "rgba(250, 250, 248, 0.75)" : "#334155",
                  fontSize: "0.925rem",
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {t.quote}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background:
                      i % 2 === 0
                        ? "rgba(16, 185, 129, 0.15)"
                        : "rgba(15, 28, 46, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#10B981",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 650,
                      color: i % 2 === 0 ? "#FAFAF8" : "#0F1C2E",
                      marginBottom: "1px",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: i % 2 === 0 ? "rgba(250, 250, 248, 0.4)" : "#94A3B8",
                    }}
                  >
                    {t.detail}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
