"use client";

import { Player } from "@remotion/player";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Demo = dynamic(() => import("@/remotion/Demo"), { ssr: false });

const FPS = 30;
const DURATION_FRAMES = 26 * FPS;
const COMP_W = 1280;
const COMP_H = 720;

const CAPTIONS = [
  { time: 0.4, text: "Reseller finance, made simple." },
  { time: 4.2, text: "Add an item: name, platform, what you paid, what you sold it for." },
  { time: 10.2, text: "Your dashboard updates in real time. Real profit. Real margin." },
  { time: 16.2, text: "AI insights surface what's working and what's quietly losing money." },
  { time: 22.2, text: "Start free at flipledger.com." },
];

async function fetchClip(text: string): Promise<HTMLAudioElement | null> {
  try {
    const r = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!r.ok) return null;
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.preload = "auto";
    audio.volume = 0.95;
    return audio;
  } catch {
    return null;
  }
}

function speakFallback(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1.05;
  u.volume = 0.85;
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => /Google US English/i.test(v.name)) ??
    voices.find((v) => /Samantha|Karen|Daniel/i.test(v.name)) ??
    voices.find((v) => v.lang.startsWith("en"));
  if (preferred) u.voice = preferred;
  window.speechSynthesis.speak(u);
}

export default function RemotionDemo() {
  const [voiceOn, setVoiceOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loadingVoice, setLoadingVoice] = useState(false);
  const playerRef = useRef<React.ComponentRef<typeof Player>>(null);
  const spokenRef = useRef<Set<number>>(new Set());
  const clipsRef = useRef<(HTMLAudioElement | null)[]>([]);
  const usingFallbackRef = useRef(false);

  useEffect(() => {
    if (!playing) spokenRef.current = new Set();
  }, [playing]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    player.addEventListener("play", onPlay);
    player.addEventListener("pause", onPause);
    return () => {
      player.removeEventListener("play", onPlay);
      player.removeEventListener("pause", onPause);
    };
  }, []);

  // Preload ElevenLabs clips once the user enables voice
  useEffect(() => {
    if (!voiceOn || clipsRef.current.length > 0) return;
    let cancelled = false;
    setLoadingVoice(true);
    (async () => {
      const clips = await Promise.all(CAPTIONS.map((c) => fetchClip(c.text)));
      if (cancelled) return;
      clipsRef.current = clips;
      usingFallbackRef.current = clips.every((c) => c === null);
      setLoadingVoice(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [voiceOn]);

  useEffect(() => {
    if (!voiceOn) return;
    const player = playerRef.current;
    if (!player) return;

    const onFrame = (data: { detail: { frame: number } }) => {
      const seconds = data.detail.frame / FPS;
      CAPTIONS.forEach((c, i) => {
        if (spokenRef.current.has(i)) return;
        if (seconds >= c.time) {
          spokenRef.current.add(i);
          const clip = clipsRef.current[i];
          if (clip) {
            clip.currentTime = 0;
            clip.play().catch(() => speakFallback(c.text));
          } else {
            speakFallback(c.text);
          }
        }
      });
    };

    player.addEventListener("frameupdate", onFrame);
    return () => {
      player.removeEventListener("frameupdate", onFrame);
      clipsRef.current.forEach((c) => c?.pause());
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [voiceOn]);

  useEffect(
    () => () => {
      clipsRef.current.forEach((c) => c?.pause());
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    },
    [],
  );

  const handlePlayToggle = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) {
      p.pause();
    } else {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.getVoices();
      }
      p.play();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 980,
        margin: "0 auto",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 12,
        boxShadow: "0 25px 60px -25px rgba(31,30,29,0.18)",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: `${COMP_W} / ${COMP_H}`,
          background: "var(--paper)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <Player
          ref={playerRef}
          component={Demo as React.ComponentType}
          durationInFrames={DURATION_FRAMES}
          compositionWidth={COMP_W}
          compositionHeight={COMP_H}
          fps={FPS}
          loop
          clickToPlay={false}
          style={{ width: "100%", height: "100%" }}
        />
        {!playing && (
          <button
            onClick={handlePlayToggle}
            aria-label="Play demo"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(31,30,29,0.04)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(31,30,29,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(31,30,29,0.04)")}
          >
            <span
              style={{
                width: 78,
                height: 78,
                borderRadius: "50%",
                background: "var(--ink)",
                color: "var(--paper)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 30px rgba(31,30,29,0.35)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          padding: "0.75rem 0.5rem 0",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            onClick={handlePlayToggle}
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: 8,
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {playing ? "Pause" : "Play demo"}
          </button>
          <button
            onClick={() => {
              setVoiceOn((v) => {
                const next = !v;
                if (!next) {
                  clipsRef.current.forEach((c) => c?.pause());
                  if (typeof window !== "undefined" && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                  }
                }
                return next;
              });
            }}
            style={{
              background: voiceOn ? "var(--accent-soft)" : "transparent",
              color: voiceOn ? "var(--accent-deep)" : "var(--text-secondary)",
              border: `1px solid ${voiceOn ? "rgba(16,185,129,0.35)" : "var(--border)"}`,
              padding: "0.5rem 1rem",
              borderRadius: 8,
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {loadingVoice ? "Loading voice…" : voiceOn ? "Voice on" : "Voice off"}
          </button>
        </div>
        <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
          26-second demo · runs in your browser
        </span>
      </div>
    </div>
  );
}
