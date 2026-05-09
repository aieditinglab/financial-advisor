"use client";

import { useState } from "react";

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: "rgba(9, 18, 30, 0.97)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(16, 185, 129, 0.2)",
        padding: "0.75rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        flexWrap: "wrap",
      }}
    >
      <p
        style={{
          color: "rgba(250, 250, 248, 0.5)",
          fontSize: "0.78rem",
          lineHeight: 1.5,
          margin: 0,
          flex: 1,
          minWidth: "260px",
        }}
      >
        FlipLedger uses AI. All outputs are for informational purposes only — not financial, tax, or legal advice.
        AI can make mistakes. Verify important decisions with a licensed professional.{" "}
        <a
          href="/disclaimer"
          style={{
            color: "#10B981",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Full disclaimer
        </a>
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss disclaimer"
        style={{
          background: "none",
          border: "1px solid rgba(250, 250, 248, 0.15)",
          color: "rgba(250, 250, 248, 0.4)",
          borderRadius: "6px",
          padding: "4px 12px",
          fontSize: "0.75rem",
          cursor: "pointer",
          fontFamily: "inherit",
          flexShrink: 0,
          transition: "color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "rgba(250, 250, 248, 0.7)";
          e.currentTarget.style.borderColor = "rgba(250, 250, 248, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(250, 250, 248, 0.4)";
          e.currentTarget.style.borderColor = "rgba(250, 250, 248, 0.15)";
        }}
      >
        Got it
      </button>
    </div>
  );
}
