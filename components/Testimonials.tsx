const testimonials = [
  {
    quote:
      "I was making sales but had no idea if I was actually profitable after eBay fees, shipping, and what I originally paid. FlipLedger showed me I was losing money on an entire category. Fixed it in a week.",
    name: "Jordan M.",
    detail: "eBay reseller · 3 years flipping electronics",
  },
  {
    quote:
      "Tax season used to terrify me. Now I just export my FlipLedger summary and hand it to my tax preparer. Saved me hours and probably saved me money because all my expenses were actually tracked.",
    name: "Destiny R.",
    detail: "Amazon FBA seller · apparel & home goods",
  },
  {
    quote:
      "I'm 17 and started reselling sneakers on StockX and Depop last year. FlipLedger is the first app that actually made sense to me. I know exactly what I made each month and where it went.",
    name: "Tyler K.",
    detail: "StockX & Depop · sneakers and streetwear",
  },
  {
    quote:
      "The platform fee calculator alone is worth it. I used to just guess what I'd net. Now I run the numbers before I list anything. My margins are up around 12% since I started using it.",
    name: "Priya S.",
    detail: "Whatnot & Depop · vintage clothing",
  },
];

export default function Testimonials() {
  return (
    <section
      id="stories"
      style={{
        background: "var(--paper)",
        padding: "7rem 1.5rem",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem", maxWidth: "640px" }}>
          <span
            style={{
              display: "inline-block",
              color: "var(--accent-deep)",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.85rem",
            }}
          >
            Seller stories
          </span>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: 500,
              color: "var(--ink)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Real sellers. Real results.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "1.75rem",
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <blockquote
                className="serif"
                style={{
                  margin: 0,
                  color: "var(--ink)",
                  fontSize: "1.02rem",
                  lineHeight: 1.55,
                  letterSpacing: "-0.005em",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: "0.85rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  {t.name}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  {t.detail}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
