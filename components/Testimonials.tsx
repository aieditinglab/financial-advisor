"use client";

import { useState } from "react";

const testimonials = [
  {
    quote:
      "I was flipping sneakers across StockX and eBay with no idea which one was actually making me money. Bolt's AI insights showed me my StockX margins were 18% higher. Reallocated my inventory and my monthly profit doubled in 60 days.",
    name: "Marcus J.",
    detail: "Sneaker reseller · $12k/mo GMV",
  },
  {
    quote:
      "The vendor directory alone is worth it. Found two reliable suppliers I'd never heard of, and the step-by-step guide gave me the confidence to scale up from a side hustle to actually paying my rent with this.",
    name: "Sarah L.",
    detail: "Depop & Poshmark seller",
  },
  {
    quote:
      "I used to track everything in a janky spreadsheet. Bolt's dashboard auto-calculates every fee, every shipping cost, every margin. The tax estimator alone saved me from a nasty surprise at filing time.",
    name: "Dev P.",
    detail: "Multi-platform reseller · 4 years",
  },
  {
    quote:
      "The AI chat is genuinely useful. I ask it stuff like \"should I list more or hold inventory\" and it actually looks at my real numbers and tells me. Feels like having a CFO for a side hustle.",
    name: "Riley K.",
    detail: "Vintage & streetwear flips",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      style={{
        background: "var(--paper)",
        padding: "7rem 1.5rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "3rem", maxWidth: "600px" }}>
          <span
            style={{
              display: "inline-block",
              color: "var(--accent)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Client Stories
          </span>
          <h2
            className="serif-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              color: "var(--ink)",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
            }}
          >
            Resellers who changed their business.
          </h2>
        </div>

        {/* Single quote display */}
        <div
          className="fl-reveal"
          style={{
            maxWidth: "700px",
            marginBottom: "3rem",
          }}
        >
          {/* Large serif italic quote */}
          <blockquote
            className="serif-display"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
              fontStyle: "italic",
              color: "var(--ink)",
              lineHeight: 1.4,
              margin: "0 0 2rem",
              letterSpacing: "-0.02em",
            }}
          >
            "{current.quote}"
          </blockquote>

          {/* Attribution */}
          <div>
            <div
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: "0.25rem",
              }}
            >
              {current.name}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
              }}
            >
              {current.detail}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "3px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--accent)",
              transition: "border-color 280ms ease, background 280ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.background = "var(--accent-soft)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Indicator dots */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: i === currentIndex ? "var(--accent)" : "var(--border)",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 280ms ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "3px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--accent)",
              transition: "border-color 280ms ease, background 280ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.background = "var(--accent-soft)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
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
          * Testimonials are from current clients and reflect their individual experiences. Past results are not indicative of future performance. Testimonials have been reviewed and released in compliance with applicable regulations.
        </p>
      </div>
    </section>
  );
}
