"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "fl_walkthrough_seen_v1";

interface Step {
  title: string;
  body: string;
  emoji?: string;
}

const STEPS: Step[] = [
  {
    title: "Welcome to FlipLedger",
    body: "This is your reseller HQ. We'll show you around in 30 seconds. You can replay this any time from the Walkthrough button.",
  },
  {
    title: "Sample data, until you add your own",
    body: "We pre-loaded a dashboard demo so you can see what real data looks like. Toggle to \"Your data\" once you log a real flip.",
  },
  {
    title: "Stat cards: the four numbers that matter",
    body: "Net profit, revenue, margin, and the cash you have tied up in inventory. They update the moment you mark anything sold.",
  },
  {
    title: "Add your first item",
    body: "Click \"Add item\". Log what you paid (COGS), where you sold it, fees, shipping. We do the math on real margin.",
  },
  {
    title: "AI insights — informational only",
    body: "We surface trends in plain English: best platform, items losing money, where capital is locked. Not financial advice — verify big calls with a pro.",
  },
];

export function shouldShowWalkthrough(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) !== "1";
}

export function markWalkthroughSeen() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, "1");
}

export default function Walkthrough({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && step < STEPS.length - 1) setStep(step + 1);
      if (e.key === "ArrowLeft" && step > 0) setStep(step - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step, onClose]);

  if (!open) return null;

  const s = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const finish = () => {
    markWalkthroughSeen();
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(31,30,29,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
        animation: "fl-fade-in 220ms ease",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "460px",
          padding: "1.75rem 1.75rem 1.5rem",
          boxShadow: "0 25px 60px rgba(31,30,29,0.25)",
          animation: "fl-pop-in 280ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Step {step + 1} of {STEPS.length}
          </span>
          <button
            onClick={finish}
            aria-label="Close walkthrough"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: "1.25rem",
              lineHeight: 1,
              padding: "4px",
            }}
          >
            ×
          </button>
        </div>

        <h3
          className="serif"
          style={{
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "var(--ink)",
            margin: "0 0 0.55rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {s.title}
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.65, margin: "0 0 1.5rem" }}>
          {s.body}
        </p>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "1.5rem" }}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Go to step ${i + 1}`}
              style={{
                flex: 1,
                height: "4px",
                borderRadius: "2px",
                background: i <= step ? "var(--accent)" : "var(--border)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "background 0.2s",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
          <button
            onClick={() => (step === 0 ? finish() : setStep(step - 1))}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              padding: "0.6rem 1.1rem",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {step === 0 ? "Skip" : "Back"}
          </button>
          <button
            onClick={() => (isLast ? finish() : setStep(step + 1))}
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              border: "none",
              padding: "0.6rem 1.25rem",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ink-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
          >
            {isLast ? "Got it" : "Next"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fl-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fl-pop-in {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
