"use client";

import { Player } from "@remotion/player";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { createAmbience, type AmbienceHandle } from "@/lib/ambience";

const Ad = dynamic(() => import("@/remotion/ShapeYourselfAd"), { ssr: false });

const FPS = 30;
const COMP_W = 1280;
const COMP_H = 720;
const DURATION_FRAMES = 28 * FPS;
const TARGET = "https://shapeyourself.us/?utm_source=ad&utm_medium=remotion&utm_campaign=launch";

// Each caption fires at this timestamp (seconds). Matches the on-screen scenes.
const CAPTIONS: Array<{ time: number; text: string }> = [
  { time: 1.5, text: "What's the best clothing brand?" },
  { time: 3.6, text: "Shape Yourself." },
  { time: 5.4, text: "Premium streetwear designed for those who refuse to fit a mold." },
  { time: 9.4, text: "Bold by design. Built to last. Released in limited drops." },
  { time: 15.2, text: "Every piece crafted from heavyweight cotton. Ethically produced." },
  { time: 21.4, text: "Try Shape Yourself today, at shape yourself dot us." },
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
  u.rate = 1.02;
  u.pitch = 1.0;
  u.volume = 0.95;
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => /Google US English/i.test(v.name)) ??
    voices.find((v) => /Samantha|Karen|Daniel|Serena/i.test(v.name)) ??
    voices.find((v) => v.lang?.startsWith("en"));
  if (preferred) u.voice = preferred;
  window.speechSynthesis.speak(u);
}

export default function ShapeYourselfAdPlayer() {
  const [voiceOn, setVoiceOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [loadingVoice, setLoadingVoice] = useState(false);
  const [started, setStarted] = useState(false);
  const playerRef = useRef<React.ComponentRef<typeof Player>>(null);
  const spokenRef = useRef<Set<number>>(new Set());
  const clipsRef = useRef<(HTMLAudioElement | null)[]>([]);
  const ambienceRef = useRef<AmbienceHandle | null>(null);

  useEffect(() => {
    if (!playing) spokenRef.current = new Set();
  }, [playing]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    const onPlay = () => {
      setPlaying(true);
      if (musicOn) {
        if (!ambienceRef.current) ambienceRef.current = createAmbience();
        ambienceRef.current?.start();
      }
    };
    const onPause = () => {
      setPlaying(false);
      ambienceRef.current?.pause();
    };
    player.addEventListener("play", onPlay);
    player.addEventListener("pause", onPause);
    return () => {
      player.removeEventListener("play", onPlay);
      player.removeEventListener("pause", onPause);
    };
  }, [musicOn]);

  useEffect(() => {
    ambienceRef.current?.setMuted(!musicOn);
  }, [musicOn]);

  useEffect(
    () => () => {
      ambienceRef.current?.stop();
      ambienceRef.current = null;
    },
    [],
  );

  useEffect(() => {
    if (!voiceOn || clipsRef.current.length > 0) return;
    let cancelled = false;
    setLoadingVoice(true);
    (async () => {
      const clips = await Promise.all(CAPTIONS.map((c) => fetchClip(c.text)));
      if (cancelled) return;
      clipsRef.current = clips;
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
    setStarted(true);
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
        maxWidth: 1080,
        margin: "0 auto",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: 14,
        boxShadow: "0 40px 100px -40px rgba(20,20,20,0.35)",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: `${COMP_W} / ${COMP_H}`,
          background: "var(--paper)",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <Player
          ref={playerRef}
          component={Ad as React.ComponentType}
          durationInFrames={DURATION_FRAMES}
          compositionWidth={COMP_W}
          compositionHeight={COMP_H}
          fps={FPS}
          loop
          clickToPlay={false}
          acknowledgeRemotionLicense
          style={{ width: "100%", height: "100%" }}
        />
        {!playing && (
          <button
            onClick={handlePlayToggle}
            aria-label="Play ad"
            style={{
              position: "absolute",
              inset: 0,
              background: started
                ? "rgba(20,20,20,0.04)"
                : "linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.18) 100%)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
          >
            <span
              style={{
                width: 92,
                height: 92,
                borderRadius: "50%",
                background: "var(--ink)",
                color: "var(--paper)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 18px 40px rgba(20,20,20,0.45)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* Player controls + clickable shop link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          padding: "0.9rem 0.5rem 0.2rem",
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
              padding: "0.55rem 1.1rem",
              borderRadius: 999,
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {playing ? "Pause" : started ? "Resume" : "Play ad"}
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
              color: voiceOn ? "var(--accent-hover)" : "var(--text-secondary)",
              border: `1px solid ${voiceOn ? "var(--accent)" : "var(--border)"}`,
              padding: "0.55rem 1.1rem",
              borderRadius: 999,
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {loadingVoice ? "Loading voice…" : voiceOn ? "AI voice on" : "AI voice off"}
          </button>
          <button
            onClick={() => setMusicOn((m) => !m)}
            style={{
              background: musicOn ? "var(--accent-soft)" : "transparent",
              color: musicOn ? "var(--accent-hover)" : "var(--text-secondary)",
              border: `1px solid ${musicOn ? "var(--accent)" : "var(--border)"}`,
              padding: "0.55rem 1.1rem",
              borderRadius: 999,
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {musicOn ? "Music on" : "Music off"}
          </button>
          <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
            28s · loops automatically
          </span>
        </div>

        <a
          href={TARGET}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            background: "var(--accent)",
            color: "#fff",
            padding: "0.7rem 1.4rem",
            borderRadius: 999,
            fontSize: "0.95rem",
            fontWeight: 600,
            letterSpacing: "0.01em",
            border: "1px solid var(--accent)",
            transition: "background 200ms ease",
          }}
        >
          Try Shape Yourself
          <span aria-hidden style={{ fontSize: "1.05rem", lineHeight: 1 }}>→</span>
        </a>
      </div>
    </div>
  );
}
