"use client";

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

// ---------- Design tokens (Claude editorial palette, luxury feel) ----------
const PAPER = "#FAF9F6";
const PAPER_SOFT = "#F3EFE8";
const SURFACE = "#FFFFFF";
const INK = "#141414";
const INK_SOFT = "#2A2826";
const TEXT_SECONDARY = "#5C5A55";
const TEXT_MUTED = "#8C8A82";
const BORDER = "#E5E2D6";
const ACCENT = "#D97757";
const ACCENT_DEEP = "#B85A3D";
const ACCENT_SOFT = "#F0D9D3";
const IMSG_BLUE = "#0B84FE";
const IMSG_GREY = "#E8E6E1";

const SERIF = `'Source Serif 4', 'Source Serif Pro', Charter, Georgia, serif`;
const SANS = `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
const MONO = `'JetBrains Mono', ui-monospace, "SF Mono", Menlo, Consolas, monospace`;

// ---------- Composition ----------
export const SY_FPS = 30;
export const SY_WIDTH = 1280;
export const SY_HEIGHT = 720;
// Scene durations (frames @ 30fps)
const S1 = 5 * SY_FPS; // 5s text intro
const S2 = 4 * SY_FPS; // 4s logo/tagline
const S3 = 6 * SY_FPS; // 6s pillars
const S4 = 6 * SY_FPS; // 6s lookbook/quality
const S5 = 7 * SY_FPS; // 7s CTA
export const SY_DURATION = S1 + S2 + S3 + S4 + S5; // 28s

// ---------- Helpers ----------
const easedSpring = (frame: number, fps: number, delay = 0, damping = 14) =>
  spring({ frame: frame - delay, fps, config: { damping } });

const fadeWindow = (frame: number, enter: number, hold: number, exit: number) => {
  const fadeIn = interpolate(frame, [0, enter], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [hold, hold + exit], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(fadeIn, fadeOut);
};

// ---------- Root ----------
export default function ShapeYourselfAd() {
  return (
    <AbsoluteFill style={{ background: PAPER, fontFamily: SANS }}>
      {/* Subtle warm vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 30%, rgba(217,119,87,0.06) 0%, transparent 70%)`,
        }}
      />
      {/* Faint paper grain */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 80% 80%, rgba(184,90,61,0.04), transparent 50%)`,
        }}
      />
      {/* Drifting dust motes — cinematic depth, present across the whole film */}
      <ParticleLayer />

      <Sequence from={0} durationInFrames={S1}>
        <TextIntroScene />
      </Sequence>
      <Sequence from={S1} durationInFrames={S2}>
        <BrandRevealScene />
      </Sequence>
      <Sequence from={S1 + S2} durationInFrames={S3}>
        <PillarsScene />
      </Sequence>
      <Sequence from={S1 + S2 + S3} durationInFrames={S4}>
        <QualityScene />
      </Sequence>
      <Sequence from={S1 + S2 + S3 + S4} durationInFrames={S5}>
        <CTAScene />
      </Sequence>

      <Watermark />
    </AbsoluteFill>
  );
}

// ---------- Scene 1: iMessage Text Intro ----------
function TextIntroScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = fadeWindow(frame, 14, S1 - 18, 14);

  // Typing indicator → grey bubble appears
  const greyTypingStart = 18;
  const greyTypingEnd = 44;
  const greyBubbleEnter = easedSpring(frame, fps, greyTypingEnd);

  // Blue reply typing → bubble
  const blueTypingStart = 78;
  const blueTypingEnd = 104;
  const blueBubbleEnter = easedSpring(frame, fps, blueTypingEnd);

  const typingDot = (i: number, start: number, end: number) => {
    if (frame < start || frame > end) return 0.3;
    const local = (frame - start + i * 4) % 18;
    return interpolate(local, [0, 9, 18], [0.25, 1, 0.25]);
  };

  const greyTypingVisible = frame >= greyTypingStart && frame < greyTypingEnd;
  const blueTypingVisible = frame >= blueTypingStart && frame < blueTypingEnd;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          width: 540,
          background: SURFACE,
          borderRadius: 28,
          padding: "20px 22px 26px",
          border: `1px solid ${BORDER}`,
          boxShadow: `0 30px 80px -30px rgba(20,20,20,0.25)`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 14,
            borderBottom: `1px solid ${BORDER}`,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontFamily: MONO,
              color: TEXT_MUTED,
              letterSpacing: "0.08em",
            }}
          >
            iMessage · today
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: ACCENT_SOFT,
              color: ACCENT_DEEP,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            S
          </div>
        </div>

        {/* Outgoing grey bubble (the question) */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 14 }}>
          {greyTypingVisible ? (
            <div
              style={{
                background: IMSG_GREY,
                borderRadius: 22,
                padding: "12px 18px",
                display: "flex",
                gap: 5,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: TEXT_MUTED,
                    opacity: typingDot(i, greyTypingStart, greyTypingEnd),
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                background: IMSG_GREY,
                color: INK,
                fontSize: 22,
                fontWeight: 500,
                padding: "14px 20px",
                borderRadius: 22,
                maxWidth: 380,
                opacity: greyBubbleEnter,
                transform: `scale(${interpolate(greyBubbleEnter, [0, 1], [0.85, 1])})`,
                transformOrigin: "bottom left",
              }}
            >
              What&apos;s the best clothing brand?
            </div>
          )}
        </div>

        {/* Reply blue bubble */}
        <div style={{ display: "flex", justifyContent: "flex-end", minHeight: 60 }}>
          {frame < blueTypingStart ? null : blueTypingVisible ? (
            <div
              style={{
                background: IMSG_BLUE,
                borderRadius: 22,
                padding: "12px 18px",
                display: "flex",
                gap: 5,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.9)",
                    opacity: typingDot(i, blueTypingStart, blueTypingEnd),
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                background: IMSG_BLUE,
                color: "#fff",
                fontSize: 22,
                fontWeight: 500,
                padding: "14px 20px",
                borderRadius: 22,
                maxWidth: 380,
                opacity: blueBubbleEnter,
                transform: `scale(${interpolate(blueBubbleEnter, [0, 1], [0.85, 1])})`,
                transformOrigin: "bottom right",
              }}
            >
              Shape Yourself.
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ---------- Scene 2: Brand Reveal ----------
function BrandRevealScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = fadeWindow(frame, 16, S2 - 18, 16);
  const enter = easedSpring(frame, fps, 0, 12);
  const scale = interpolate(enter, [0, 1], [0.92, 1]);
  const yOffset = interpolate(enter, [0, 1], [22, 0]);

  const underlineReveal = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagFade = interpolate(frame, [34, 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity,
        transform: `translateY(${yOffset}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 14,
          letterSpacing: "0.32em",
          color: ACCENT_DEEP,
          textTransform: "uppercase",
          marginBottom: 22,
          opacity: enter,
        }}
      >
        Premium Streetwear
      </div>
      <h1
        style={{
          fontFamily: SERIF,
          fontSize: 132,
          fontWeight: 500,
          color: INK,
          letterSpacing: "-0.045em",
          lineHeight: 0.95,
          margin: 0,
        }}
      >
        Shape{" "}
        <span
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            color: ACCENT_DEEP,
            display: "inline-block",
            backgroundImage: `linear-gradient(${ACCENT_DEEP}, ${ACCENT_DEEP})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${underlineReveal * 100}% 5px`,
            backgroundPosition: "0 96%",
          }}
        >
          Yourself.
        </span>
      </h1>
      <p
        style={{
          color: TEXT_SECONDARY,
          fontSize: 24,
          maxWidth: 760,
          lineHeight: 1.45,
          marginTop: 28,
          opacity: tagFade,
          transform: `translateY(${(1 - tagFade) * 10}px)`,
        }}
      >
        Designed for those who refuse to fit a mold.
      </p>
    </AbsoluteFill>
  );
}

// ---------- Scene 3: Pillars ----------
function PillarsScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeWindow(frame, 18, S3 - 18, 16);
  const titleY = interpolate(opacity, [0, 1], [20, 0]);

  const cardEnter = (i: number) =>
    spring({ frame: frame - 18 - i * 14, fps, config: { damping: 14 } });

  const pillars = [
    {
      tag: "01 · Identity",
      title: "Bold by design",
      body: "Statement pieces that move with intention. Every silhouette engineered to stand out.",
    },
    {
      tag: "02 · Quality",
      title: "Built to last",
      body: "Premium fabrics, reinforced stitching, and finishes that don't fade after a wash.",
    },
    {
      tag: "03 · Drops",
      title: "Limited collections",
      body: "Small-batch releases. Once it's gone, it's gone. No restocks, no compromise.",
    },
  ];

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ textAlign: "center", marginBottom: 38, transform: `translateY(${titleY}px)` }}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 12,
            color: ACCENT_DEEP,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Why Shape Yourself
        </div>
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: 56,
            fontWeight: 500,
            color: INK,
            margin: 0,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
          }}
        >
          Style with{" "}
          <span style={{ fontStyle: "italic", color: ACCENT_DEEP }}>substance.</span>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 300px)", gap: 20 }}>
        {pillars.map((p, i) => {
          const e = cardEnter(i);
          return (
            <div
              key={p.tag}
              style={{
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: "28px 26px 30px",
                opacity: e,
                transform: `translateY(${(1 - e) * 28}px) scale(${interpolate(e, [0, 1], [0.92, 1])})`,
                boxShadow: `0 12px 28px rgba(20,20,20,${0.05 * e})`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: `${e * 100}%`,
                  height: 3,
                  background: ACCENT,
                }}
              />
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: TEXT_MUTED,
                  marginBottom: 18,
                }}
              >
                {p.tag}
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 28,
                  fontWeight: 500,
                  color: INK,
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                  lineHeight: 1.1,
                }}
              >
                {p.title}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: TEXT_SECONDARY,
                  lineHeight: 1.55,
                }}
              >
                {p.body}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// ---------- Scene 4: Quality / Lookbook stats ----------
function QualityScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeWindow(frame, 16, S4 - 18, 16);

  const cardEnter = easedSpring(frame, fps, 0);
  const cardScale = interpolate(cardEnter, [0, 1], [0.9, 1]);
  const cardY = interpolate(cardEnter, [0, 1], [30, 0]);

  // Number counters
  const drops = interpolate(frame, [10, 70], [0, 12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const items = interpolate(frame, [22, 82], [0, 47], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fans = interpolate(frame, [34, 94], [0, 18.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const reveal = (start: number) =>
    interpolate(frame, [start, start + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div
        style={{
          width: 880,
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 20,
          padding: "42px 56px 46px",
          transform: `scale(${cardScale}) translateY(${cardY}px)`,
          boxShadow: `0 24px 60px rgba(20,20,20,${0.08 * cardEnter})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 30,
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <TeeSilhouette />
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: ACCENT_DEEP,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                The Collection
              </div>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: 44,
                  fontWeight: 500,
                  color: INK,
                  margin: 0,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Crafted with{" "}
                <span style={{ fontStyle: "italic", color: ACCENT_DEEP }}>intention.</span>
              </h2>
            </div>
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 12,
              color: TEXT_MUTED,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              border: `1px solid ${BORDER}`,
              padding: "6px 12px",
              borderRadius: 999,
              whiteSpace: "nowrap",
            }}
          >
            Live · 2026
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 32 }}>
          <Metric label="Drops released" value={`${Math.round(drops)}`} suffix="" />
          <Metric label="Pieces in archive" value={`${Math.round(items)}`} suffix="" />
          <Metric label="Customers worldwide" value={`${fans.toFixed(1)}K`} suffix="" />
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 24 }}>
          {[
            "Premium heavyweight cotton — 320gsm.",
            "Independently designed. Ethically produced.",
            "Worn from streetwear capitals to creator sets.",
          ].map((line, i) => {
            const r = reveal(40 + i * 18);
            return (
              <div
                key={line}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 17,
                  color: INK_SOFT,
                  marginBottom: 10,
                  opacity: r,
                  transform: `translateX(${(1 - r) * 14}px)`,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: ACCENT_SOFT,
                    color: ACCENT_DEEP,
                    fontSize: 12,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                {line}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Metric({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div
      style={{
        background: PAPER_SOFT,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: "20px 22px",
      }}
    >
      <div style={{ fontSize: 12, fontFamily: MONO, color: TEXT_MUTED, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 44,
          fontWeight: 500,
          color: INK,
          letterSpacing: "-0.025em",
          lineHeight: 1,
        }}
      >
        {value}
        {suffix ? <span style={{ color: ACCENT_DEEP, fontStyle: "italic" }}>{suffix}</span> : null}
      </div>
    </div>
  );
}

// ---------- Scene 5: CTA ----------
function CTAScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = easedSpring(frame, fps, 0, 12);
  const opacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(enter, [0, 1], [0.92, 1]);

  const linkReveal = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const buttonReveal = interpolate(frame, [55, 84], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const buttonPulse = interpolate(frame, [100, 140, 180], [1, 1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale})`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 13,
          letterSpacing: "0.32em",
          color: ACCENT_DEEP,
          textTransform: "uppercase",
          marginBottom: 22,
        }}
      >
        The Drop is Live
      </div>
      <h2
        style={{
          fontFamily: SERIF,
          fontSize: 92,
          fontWeight: 500,
          color: INK,
          margin: 0,
          letterSpacing: "-0.04em",
          lineHeight: 0.98,
        }}
      >
        Try{" "}
        <span style={{ fontStyle: "italic", color: ACCENT_DEEP }}>Shape Yourself</span>
        <br />
        today.
      </h2>

      <div
        style={{
          marginTop: 36,
          fontFamily: MONO,
          fontSize: 22,
          color: TEXT_SECONDARY,
          letterSpacing: "0.04em",
          opacity: linkReveal,
          transform: `translateY(${(1 - linkReveal) * 10}px)`,
        }}
      >
        shapeyourself.us
      </div>

      <div
        style={{
          marginTop: 32,
          background: INK,
          color: PAPER,
          padding: "18px 42px",
          borderRadius: 999,
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: "0.02em",
          opacity: buttonReveal,
          transform: `scale(${buttonReveal * buttonPulse}) translateY(${(1 - buttonReveal) * 12}px)`,
          boxShadow: `0 18px 40px rgba(20,20,20,${0.28 * buttonReveal})`,
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(115deg, transparent ${((frame * 1.2) % 220) - 30}%, rgba(217,119,87,0.32) ${(frame * 1.2) % 220}%, transparent ${((frame * 1.2) % 220) + 30}%)`,
            pointerEvents: "none",
          }}
        />
        <span style={{ position: "relative" }}>Shop the Collection</span>
        <span
          style={{
            position: "relative",
            display: "inline-flex",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: ACCENT,
            color: "#fff",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          →
        </span>
      </div>
    </AbsoluteFill>
  );
}

// ---------- Tee silhouette ----------
function TeeSilhouette() {
  const frame = useCurrentFrame();
  const float = Math.sin(frame / 28) * 4;
  const sweep = (frame % 90) / 90; // 0 -> 1 across 3s
  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: 14,
        background: PAPER_SOFT,
        border: `1px solid ${BORDER}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        transform: `translateY(${float}px)`,
      }}
    >
      {/* Subtle shine sweep for premium feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(115deg, transparent ${sweep * 100 - 18}%, rgba(217,119,87,0.18) ${sweep * 100}%, transparent ${sweep * 100 + 18}%)`,
        }}
      />
      <svg width="46" height="46" viewBox="0 0 64 64" fill="none">
        <path
          d="M22 8 L14 14 L8 20 L14 28 L20 24 L20 56 L44 56 L44 24 L50 28 L56 20 L50 14 L42 8 C42 12 38 16 32 16 C26 16 22 12 22 8 Z"
          fill={INK}
          stroke={INK}
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M26 30 L38 30"
          stroke={ACCENT}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// ---------- Particle Layer ----------
function ParticleLayer() {
  const frame = useCurrentFrame();
  // 18 deterministic motes — seeded so they're stable frame to frame
  const motes = Array.from({ length: 18 }).map((_, i) => {
    const seed = i * 137.508;
    const baseX = (Math.sin(seed) * 0.5 + 0.5) * 100; // 0–100%
    const baseY = (Math.cos(seed * 1.7) * 0.5 + 0.5) * 100;
    const drift = Math.sin((frame + i * 24) / 120) * 12;
    const driftY = Math.cos((frame + i * 19) / 140) * 10;
    const size = 2 + (i % 4);
    const twinkle = 0.18 + (Math.sin((frame + i * 11) / 30) * 0.5 + 0.5) * 0.32;
    return { x: baseX + drift, y: baseY + driftY, size, opacity: twinkle, i };
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {motes.map((m) => (
        <div
          key={m.i}
          style={{
            position: "absolute",
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: m.size,
            height: m.size,
            borderRadius: "50%",
            background: ACCENT,
            opacity: m.opacity * 0.35,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
}

// ---------- Watermark ----------
function Watermark() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 26,
        right: 34,
        fontSize: 12,
        color: TEXT_MUTED,
        fontFamily: MONO,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
      }}
    >
      shapeyourself.us
    </div>
  );
}
