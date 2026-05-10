"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "fl_disclaimer_dismissed_v1";

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  if (dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
        right: "1rem",
        zIndex: 40,
        maxWidth: "640px",
        margin: "0 auto",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "0.85rem 1rem",
        boxShadow: "0 12px 32px -8px rgba(31,30,29,0.18)",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.78rem",
          lineHeight: 1.5,
          margin: 0,
          flex: 1,
        }}
      >
        Bolt Resell AI uses AI. Outputs are for information only — not financial, tax, or
        legal advice.{" "}
        <Link href="/disclaimer" style={{ color: "var(--accent-deep)", fontWeight: 500 }}>
          Read more
        </Link>
      </p>
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, "1");
          }
          setDismissed(true);
        }}
        aria-label="Dismiss disclaimer"
        style={{
          background: "transparent",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
          borderRadius: "6px",
          padding: "4px 10px",
          fontSize: "0.78rem",
          cursor: "pointer",
          fontFamily: "inherit",
          flexShrink: 0,
          transition: "border-color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--ink)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        Got it
      </button>
    </div>
  );
}
