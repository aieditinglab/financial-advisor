"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    platform: "",
    volume: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(250, 250, 248, 0.05)",
    border: "1px solid rgba(250, 250, 248, 0.12)",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    color: "#FAFAF8",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "inherit",
  } as const;

  return (
    <section
      id="contact"
      style={{
        background: "linear-gradient(160deg, #060d17 0%, #0F1C2E 100%)",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent */}
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          left: "-100px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left: Info */}
          <div>
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
              Get Started
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 700,
                color: "#FAFAF8",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              Start knowing
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #10B981 0%, #6EE7B7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                your numbers.
              </span>
            </h2>
            <p
              style={{
                color: "rgba(250, 250, 248, 0.55)",
                lineHeight: 1.75,
                fontSize: "1rem",
                marginBottom: "2.5rem",
              }}
            >
              Sign up free and connect your first selling platform in under 5 minutes.
              No credit card. No commitment. Just cleaner numbers and less guesswork.
            </p>

            {/* What you get */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                "Free forever tier — no credit card needed",
                "Connect eBay, StockX, Amazon & more",
                "AI financial insights included",
                "Tax estimates updated in real time",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.15)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ color: "rgba(250, 250, 248, 0.65)", fontSize: "0.875rem" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* AI disclaimer */}
            <div
              style={{
                marginTop: "2rem",
                padding: "1rem 1.25rem",
                background: "rgba(16, 185, 129, 0.05)",
                border: "1px solid rgba(16, 185, 129, 0.15)",
                borderRadius: "10px",
              }}
            >
              <p style={{ color: "rgba(250, 250, 248, 0.4)", fontSize: "0.75rem", lineHeight: 1.6, margin: 0 }}>
                FlipLedger uses AI to provide financial insights. All AI-generated outputs are for
                informational purposes only and are not financial, tax, or legal advice. Please verify
                important decisions with a qualified professional.{" "}
                <a href="/disclaimer" style={{ color: "#10B981", textDecoration: "none" }}>
                  Full disclaimer
                </a>
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div
            style={{
              background: "rgba(250, 250, 248, 0.04)",
              border: "1px solid rgba(250, 250, 248, 0.08)",
              borderRadius: "16px",
              padding: "2.5rem",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    color: "#10B981",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 style={{ color: "#FAFAF8", fontSize: "1.3rem", fontWeight: 650, marginBottom: "0.75rem" }}>
                  You&apos;re on the list
                </h3>
                <p style={{ color: "rgba(250, 250, 248, 0.5)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  We&apos;ll send your account access within 24 hours. Get ready to finally
                  know what you&apos;re making.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3
                  style={{
                    color: "#FAFAF8",
                    fontSize: "1.15rem",
                    fontWeight: 650,
                    marginBottom: "1.75rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Create your free account
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", color: "rgba(250, 250, 248, 0.5)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Alex Johnson"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(16, 185, 129, 0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(250, 250, 248, 0.12)")}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", color: "rgba(250, 250, 248, 0.5)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="alex@email.com"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(16, 185, 129, 0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(250, 250, 248, 0.12)")}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", color: "rgba(250, 250, 248, 0.5)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>
                        Primary Platform
                      </label>
                      <select
                        value={form.platform}
                        onChange={(e) => setForm({ ...form, platform: e.target.value })}
                        style={{ ...inputStyle, cursor: "pointer" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(16, 185, 129, 0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(250, 250, 248, 0.12)")}
                      >
                        <option value="" style={{ background: "#0F1C2E" }}>Select platform</option>
                        <option value="ebay" style={{ background: "#0F1C2E" }}>eBay</option>
                        <option value="stockx" style={{ background: "#0F1C2E" }}>StockX</option>
                        <option value="amazon" style={{ background: "#0F1C2E" }}>Amazon FBA</option>
                        <option value="whatnot" style={{ background: "#0F1C2E" }}>Whatnot</option>
                        <option value="mercari" style={{ background: "#0F1C2E" }}>Mercari</option>
                        <option value="poshmark" style={{ background: "#0F1C2E" }}>Poshmark</option>
                        <option value="facebook" style={{ background: "#0F1C2E" }}>Facebook Marketplace</option>
                        <option value="multiple" style={{ background: "#0F1C2E" }}>Multiple platforms</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", color: "rgba(250, 250, 248, 0.5)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>
                        Monthly sales volume
                      </label>
                      <select
                        value={form.volume}
                        onChange={(e) => setForm({ ...form, volume: e.target.value })}
                        style={{ ...inputStyle, cursor: "pointer" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(16, 185, 129, 0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(250, 250, 248, 0.12)")}
                      >
                        <option value="" style={{ background: "#0F1C2E" }}>Select range</option>
                        <option value="just-starting" style={{ background: "#0F1C2E" }}>Just starting out</option>
                        <option value="1-10" style={{ background: "#0F1C2E" }}>1–10 items/month</option>
                        <option value="11-50" style={{ background: "#0F1C2E" }}>11–50 items/month</option>
                        <option value="51-200" style={{ background: "#0F1C2E" }}>51–200 items/month</option>
                        <option value="200plus" style={{ background: "#0F1C2E" }}>200+ items/month</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", color: "rgba(250, 250, 248, 0.5)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>
                      What&apos;s your biggest financial headache?
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="e.g. I never know if I actually made money after fees, or I dread tax season..."
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "90px",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(16, 185, 129, 0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(250, 250, 248, 0.12)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: loading
                        ? "rgba(16, 185, 129, 0.5)"
                        : "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                      color: "#0F1C2E",
                      border: "none",
                      borderRadius: "8px",
                      padding: "0.875rem",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      cursor: loading ? "not-allowed" : "pointer",
                      width: "100%",
                      letterSpacing: "0.01em",
                      transition: "opacity 0.2s ease",
                      fontFamily: "inherit",
                    }}
                  >
                    {loading ? "Creating account…" : "Start Tracking for Free →"}
                  </button>
                </div>

                <p style={{ color: "rgba(250, 250, 248, 0.3)", fontSize: "0.75rem", marginTop: "1rem", textAlign: "center", lineHeight: 1.5 }}>
                  No credit card required. By signing up you agree to our{" "}
                  <a href="/terms" style={{ color: "rgba(250, 250, 248, 0.5)", textDecoration: "underline" }}>Terms</a> and{" "}
                  <a href="/privacy" style={{ color: "rgba(250, 250, 248, 0.5)", textDecoration: "underline" }}>Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
