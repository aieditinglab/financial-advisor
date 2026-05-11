const testimonials = [
  {
    quote:
      "I was flipping sneakers across StockX and eBay with no idea which one was actually making me money. Bolt's AI insights showed me my StockX margins were 18% higher. Reallocated my inventory and my monthly profit doubled in 60 days.",
    name: "Marcus J.",
    detail: "Sneaker reseller · $12k/mo GMV",
    dark: true,
  },
  {
    quote:
      "The vendor directory alone is worth it. Found two reliable suppliers I'd never heard of, and the step-by-step guide gave me the confidence to scale up from a side hustle to actually paying my rent with this.",
    name: "Sarah L.",
    detail: "Depop & Poshmark seller",
    dark: false,
  },
  {
    quote:
      "I used to track everything in a janky spreadsheet. Bolt's dashboard auto-calculates every fee, every shipping cost, every margin. The tax estimator alone saved me from a nasty surprise at filing time.",
    name: "Dev P.",
    detail: "Multi-platform reseller · 4 years",
    dark: false,
  },
  {
    quote:
      "The AI chat is genuinely useful. I ask it stuff like \"should I list more or hold inventory\" and it actually looks at my real numbers and tells me. Feels like having a CFO for a side hustle.",
    name: "Riley K.",
    detail: "Vintage & streetwear flips",
    dark: true,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        background: "var(--paper)",
        padding: "7rem 1.5rem",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "3.75rem", maxWidth: "600px" }}>
          <span
            style={{
              display: "inline-block",
              color: "var(--accent-deep)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              marginBottom: "0.85rem",
            }}
          >
            Client Stories
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4.5vw, 2.9rem)",
              fontWeight: 700,
              color: "var(--ink)",
              letterSpacing: "-0.025em",
              lineHeight: 1.12,
            }}
          >
            Twenty years of trust, one family at a time.
          </h2>
        </div>

        {/* Testimonial grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.25rem",
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                background: t.dark ? "var(--ink)" : "var(--surface)",
                border: t.dark ? "none" : "1px solid var(--border)",
                borderRadius: "var(--r-xl)",
                padding: "2.25rem 2rem",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Large quotation mark */}
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  fontSize: "4.5rem",
                  lineHeight: 0.8,
                  color: t.dark ? "rgba(201,168,76,0.3)" : "var(--border-strong)",
                  fontFamily: "Georgia, serif",
                  marginBottom: "0.75rem",
                  userSelect: "none",
                }}
              >
                &ldquo;
              </span>

              {/* Quote */}
              <blockquote
                style={{
                  fontSize: "0.97rem",
                  color: t.dark ? "rgba(250,250,248,0.78)" : "var(--text-secondary)",
                  lineHeight: 1.72,
                  margin: "0 0 1.75rem",
                  flex: 1,
                }}
              >
                {t.quote}
              </blockquote>

              {/* Attribution */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: t.dark
                      ? "rgba(201,168,76,0.18)"
                      : "var(--accent-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: t.dark ? "#C9A84C" : "var(--accent-deep)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: t.dark ? "#FAFAF8" : "var(--ink)",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: t.dark ? "rgba(250,250,248,0.45)" : "var(--text-muted)",
                    }}
                  >
                    {t.detail}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance footnote */}
        <p
          style={{
            marginTop: "2.5rem",
            fontSize: "0.73rem",
            color: "var(--text-muted)",
            lineHeight: 1.55,
            maxWidth: "680px",
          }}
        >
          * Testimonials are from current clients and reflect their individual experiences. Past results are not indicative of future performance. Names have been abbreviated for privacy. Testimonials have been reviewed and released in compliance with applicable regulations.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
