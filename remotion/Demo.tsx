"use client";

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

// ---------- Constants ----------
const PAPER = "#F5F4ED";
const PAPER_SOFT = "#FAF9F2";
const SURFACE = "#FFFFFF";
const INK = "#1F1E1D";
const INK_SOFT = "#2E2C2A";
const TEXT_SECONDARY = "#605F5C";
const TEXT_MUTED = "#8C8A82";
const BORDER = "#E5E2D6";
const ACCENT = "#10B981";
const ACCENT_DEEP = "#064E3B";
const ACCENT_SOFT = "#E6F2EC";

const SERIF = `'Source Serif 4', 'Source Serif Pro', Charter, Georgia, serif`;
const SANS = `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
const MONO = `'JetBrains Mono', ui-monospace, "SF Mono", Menlo, Consolas, monospace`;

// ---------- Helpers ----------
const easedSpring = (frame: number, fps: number, delay = 0, damping = 14) =>
  spring({ frame: frame - delay, fps, config: { damping } });

// ---------- Composition ----------
export const FL_FPS = 30;
export const FL_WIDTH = 1280;
export const FL_HEIGHT = 720;
export const FL_DURATION = 26 * FL_FPS; // 26 seconds

export default function BoltResellDemo() {
  return (
    <AbsoluteFill style={{ background: PAPER, fontFamily: SANS }}>
      {/* Subtle paper grain */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 50% 35% at 50% 30%, rgba(16,185,129,0.05) 0%, transparent 70%)`,
        }}
      />

      <Sequence from={0} durationInFrames={4 * FL_FPS}>
        <TitleScene />
      </Sequence>
      <Sequence from={4 * FL_FPS} durationInFrames={6 * FL_FPS}>
        <AddItemScene />
      </Sequence>
      <Sequence from={10 * FL_FPS} durationInFrames={6 * FL_FPS}>
        <StatsScene />
      </Sequence>
      <Sequence from={16 * FL_FPS} durationInFrames={6 * FL_FPS}>
        <InsightsScene />
      </Sequence>
      <Sequence from={22 * FL_FPS} durationInFrames={4 * FL_FPS}>
        <CTAScene />
      </Sequence>

      <Watermark />
    </AbsoluteFill>
  );
}

// ---------- Scene: Title ----------
function TitleScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [3 * fps, 4 * fps], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);
  const yOffset = interpolate(frame, [0, 24], [20, 0], { extrapolateRight: "clamp" });
  const logoScale = interpolate(frame, [0, 12], [0.7, 1], { extrapolateRight: "clamp" });
  const logoRotate = interpolate(frame, [0, 18], [0, 0.5], { extrapolateRight: "clamp" });
  const accentReveal = interpolate(frame, [16, 38], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const subtitleFade = interpolate(frame, [24, 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", opacity, transform: `translateY(${yOffset}px)` }}>
      <div style={{ transform: `scale(${logoScale}) rotateY(${logoRotate * 15}deg)` }}>
        <FlipLogo size={56} />
      </div>
      <h1
        style={{
          fontFamily: SERIF,
          fontSize: 84,
          fontWeight: 500,
          color: INK,
          letterSpacing: "-0.035em",
          lineHeight: 1.05,
          margin: "32px 0 18px",
          transform: `translateY(${(1 - fadeIn) * 20}px)`,
        }}
      >
        Reseller finance,
        <br />
        <span
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            color: ACCENT_DEEP,
            display: "inline-block",
            backgroundImage: `linear-gradient(${ACCENT_DEEP}, ${ACCENT_DEEP})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${accentReveal * 100}% 4px`,
            backgroundPosition: "0 92%",
          }}
        >
          made simple.
        </span>
      </h1>
      <p style={{ color: TEXT_SECONDARY, fontSize: 24, maxWidth: 760, lineHeight: 1.45, opacity: subtitleFade, transform: `translateY(${(1 - subtitleFade) * 10}px)` }}>
        Track real profit on every flip — across eBay, StockX, Depop, Amazon, and more.
      </p>
    </AbsoluteFill>
  );
}

// ---------- Scene: Add Item ----------
function AddItemScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEnter = easedSpring(frame, fps, 0);
  const fadeOut = interpolate(frame, [5 * fps, 6 * fps], [1, 0], { extrapolateLeft: "clamp" });
  const cardScale = interpolate(cardEnter, [0, 1], [0.88, 1]);
  const cardY = interpolate(cardEnter, [0, 1], [40, 0]);
  const opacity = Math.min(cardEnter, fadeOut);

  // Field reveal timings with stagger
  const f = (delay: number) => interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const f1 = f(15);
  const f2 = f(30);
  const f3 = f(50);
  const f4 = f(70);

  // Save button pulse
  const saveDelay = 105;
  const saveEnter = interpolate(frame, [saveDelay, saveDelay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const savePress = interpolate(frame, [saveDelay + 28, saveDelay + 36, saveDelay + 44], [1, 0.94, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div
        style={{
          width: 720,
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 18,
          padding: "44px 48px",
          transform: `scale(${cardScale}) translateY(${cardY}px)`,
          boxShadow: `0 20px 60px rgba(31,30,29,${0.10 * cardEnter})`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h3 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 500, color: INK, margin: 0, letterSpacing: "-0.02em" }}>
            Add an item
          </h3>
          <span style={{ fontFamily: MONO, fontSize: 14, color: TEXT_MUTED, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            STEP 1
          </span>
        </div>
        <Field label="ITEM NAME" value="Nike Dunk Low Panda" reveal={f1} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <Field label="PLATFORM" value="StockX" reveal={f2} />
          <Field label="STATUS" value="Sold" reveal={f2} variant="accent" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <Field label="COGS" value="$95.00" reveal={f3} mono />
          <Field label="SALE PRICE" value="$158.00" reveal={f3} mono />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <Field label="PLATFORM FEES" value="$14.22" reveal={f4} mono />
          <Field label="SHIPPING" value="$4.00" reveal={f4} mono />
        </div>

        <div
          style={{
            marginTop: 32,
            transform: `scale(${saveEnter * savePress}) translateY(${(1 - saveEnter) * 12}px)`,
            opacity: saveEnter,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              background: INK,
              color: PAPER,
              padding: "14px 32px",
              borderRadius: 10,
              fontWeight: 500,
              fontSize: 18,
            }}
          >
            Save item →
          </div>
        </div>
      </div>
      <Caption text="One form. Real profit. Every fee accounted for." delay={20} />
    </AbsoluteFill>
  );
}

function Field({
  label,
  value,
  reveal,
  variant,
  mono,
}: {
  label: string;
  value: string;
  reveal: number;
  variant?: "accent";
  mono?: boolean;
}) {
  return (
    <div style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 6}px)` }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: TEXT_SECONDARY,
          letterSpacing: "0.06em",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          background: PAPER_SOFT,
          border: `1px solid ${BORDER}`,
          borderRadius: 10,
          padding: "14px 16px",
          fontSize: 18,
          color: variant === "accent" ? ACCENT_DEEP : INK,
          fontFamily: mono ? MONO : SANS,
          fontWeight: variant === "accent" ? 600 : 500,
        }}
      >
        {value}
      </div>
    </div>
  );
}

// ---------- Scene: Stats ----------
function StatsScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [5 * fps, 6 * fps], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);
  const titleY = interpolate(fadeIn, [0, 1], [20, 0]);

  const profit = interpolate(frame, [10, 70], [0, 44.78], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const revenue = interpolate(frame, [25, 85], [0, 158], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const margin = interpolate(frame, [40, 100], [0, 28.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const cardEnter = (i: number) => spring({ frame: frame - i * 8, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ textAlign: "center", marginBottom: 36, transform: `translateY(${titleY}px)` }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: ACCENT_DEEP,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 12,
            opacity: fadeIn,
          }}
        >
          Your dashboard, live
        </div>
        <h2 style={{ fontFamily: SERIF, fontSize: 60, fontWeight: 500, color: INK, margin: 0, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
          Numbers you can{" "}
          <span style={{ fontStyle: "italic", color: ACCENT_DEEP }}>actually trust.</span>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 240px)", gap: 16 }}>
        <StatCard
          label="Net profit"
          value={`+$${profit.toFixed(2)}`}
          tone="positive"
          enter={cardEnter(0)}
        />
        <StatCard
          label="Revenue"
          value={`$${Math.round(revenue).toLocaleString()}`}
          enter={cardEnter(1)}
        />
        <StatCard label="Margin" value={`${margin.toFixed(1)}%`} enter={cardEnter(2)} />
      </div>
      <Caption text="Every fee. Every shipping cost. Every penny." delay={50} />
    </AbsoluteFill>
  );
}

function StatCard({
  label,
  value,
  tone,
  enter,
}: {
  label: string;
  value: string;
  tone?: "positive";
  enter: number;
}) {
  const borderGlow = interpolate(enter, [0, 1], [0, 0.3]);
  return (
    <div
      style={{
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: 14,
        padding: "26px 28px",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 24}px) scale(${interpolate(enter, [0, 1], [0.92, 1])})`,
        boxShadow: `0 8px 24px rgba(16,185,129,${borderGlow * 0.15})`,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY, marginBottom: 10 }}>{label}</div>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 38,
          fontWeight: 500,
          color: tone === "positive" ? ACCENT_DEEP : INK,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
        }}
      >
        {value}
      </div>
    </div>
  );
}

// ---------- Scene: Insights ----------
function InsightsScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [5 * fps, 6 * fps], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);
  const cardEnter = easedSpring(frame, fps, 0);
  const cardScale = interpolate(cardEnter, [0, 1], [0.88, 1]);
  const cardY = interpolate(cardEnter, [0, 1], [40, 0]);

  const insights = [
    "Your average margin is 37.6% across 14 sold items.",
    "StockX is your most profitable platform — $612 net.",
    "5 items in inventory have $640 of capital tied up.",
  ];
  const insightReveal = (i: number) =>
    interpolate(frame, [15 + i * 28, 40 + i * 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div
        style={{
          width: 720,
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 18,
          padding: "36px 44px",
          transform: `scale(${cardScale}) translateY(${cardY}px)`,
          boxShadow: `0 20px 60px rgba(31,30,29,${0.08 * cardEnter})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: ACCENT_SOFT,
              color: ACCENT_DEEP,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1l1.5 4 4 1.5-4 1.5L7 12 5.5 8 1.5 6.5l4-1.5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 500, color: INK, margin: 0, letterSpacing: "-0.015em" }}>
            AI insights
          </h3>
          <span
            style={{
              marginLeft: "auto",
              background: PAPER_SOFT,
              border: `1px solid ${BORDER}`,
              color: TEXT_MUTED,
              fontSize: 11,
              padding: "3px 10px",
              borderRadius: 20,
              fontWeight: 500,
            }}
          >
            Informational only
          </span>
        </div>

        {insights.map((text, i) => {
          const r = insightReveal(i);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                fontSize: 19,
                color: INK_SOFT,
                lineHeight: 1.55,
                marginBottom: 14,
                opacity: r,
                transform: `translateX(${(1 - r) * 14}px)`,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: ACCENT,
                  marginTop: 11,
                  flexShrink: 0,
                }}
              />
              {text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// ---------- Scene: CTA ----------
function CTAScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = easedSpring(frame, fps, 0);
  const opacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(enter, [0, 1], [0.88, 1]);
  const buttonScale = interpolate(frame, [36, 60], [1, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const buttonPulse = interpolate(frame, [50, 78], [1, 1.02], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity, transform: `scale(${scale})` }}>
      <div style={{ opacity, transform: `translateY(${(1 - opacity) * 20}px)` }}>
        <FlipLogo size={48} />
      </div>
      <h2 style={{ fontFamily: SERIF, fontSize: 76, fontWeight: 500, color: INK, margin: "28px 0 14px", letterSpacing: "-0.03em", textAlign: "center", lineHeight: 1 }}>
        Start free at{" "}
        <span style={{ fontStyle: "italic", color: ACCENT_DEEP }}>boltresell.ai</span>
      </h2>
      <p style={{ color: TEXT_SECONDARY, fontSize: 22, marginBottom: 36 }}>
        No credit card. No commitment. Just real numbers.
      </p>
      <div
        style={{
          background: INK,
          color: PAPER,
          padding: "18px 38px",
          borderRadius: 14,
          fontSize: 20,
          fontWeight: 500,
          transform: `scale(${buttonScale * buttonPulse})`,
          boxShadow: `0 12px 32px rgba(31,30,29,${0.3 * opacity})`,
          cursor: "pointer",
        }}
      >
        Create your account →
      </div>
    </AbsoluteFill>
  );
}

// ---------- UI Bits ----------
function FlipLogo({ size = 48 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: INK,
        borderRadius: size * 0.22,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 18 18" fill="none">
        <path
          d="M2 12l3.5-3.5 2.5 2.5 3.5-4.5 3 2.5"
          stroke={PAPER}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Caption({ text, delay = 0 }: { text: string; delay?: number }) {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [delay, delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <p
      style={{
        position: "absolute",
        bottom: 90,
        left: 0,
        right: 0,
        textAlign: "center",
        color: TEXT_SECONDARY,
        fontSize: 18,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 6}px)`,
      }}
    >
      {text}
    </p>
  );
}

function Watermark() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        right: 32,
        fontSize: 12,
        color: TEXT_MUTED,
        fontFamily: MONO,
        letterSpacing: "0.08em",
      }}
    >
      boltresell.ai
    </div>
  );
}
