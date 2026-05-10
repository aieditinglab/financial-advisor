"use client";

import { useEffect, useRef, useState } from "react";

interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What's my best-performing platform?",
  "Where am I losing money?",
  "Should I list more or hold inventory?",
  "Estimate my quarterly tax bill.",
];

export default function ChatView() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    void (async () => {
      try {
        const r = await fetch("/api/chat");
        if (r.ok) {
          const data = (await r.json()) as { messages: Msg[] };
          setMessages(data.messages ?? []);
        }
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setPending(true);
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: trimmed };
    const history = messages.map((m) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      text: m.content,
    }));
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = (await r.json()) as { reply?: string; error?: string };
      const reply: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply ?? `Sorry — ${data.error ?? "couldn't reach the AI."}`,
      };
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Network error. Try again?" },
      ]);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = async () => {
    if (!confirm("Clear chat history?")) return;
    setMessages([]);
    await fetch("/api/chat", { method: "DELETE" });
  };

  const empty = loaded && messages.length === 0;

  return (
    <div
      style={{
        maxWidth: "880px",
        margin: "0 auto",
        padding: "1.75rem 1rem 5rem",
        minHeight: "calc(100vh - 60px - 60px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1.25rem",
        }}
      >
        <div>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2rem)",
              fontWeight: 500,
              margin: 0,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            AI assistant
          </h1>
          <p style={{ color: "var(--text-secondary)", margin: "6px 0 0", fontSize: "0.92rem" }}>
            Ask anything about your reseller numbers — it has full context of your tracked items.
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            style={{
              background: "var(--surface)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "0.45rem 0.85rem",
              fontSize: "0.82rem",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        )}
      </div>

      <div
        ref={scrollerRef}
        style={{
          flex: 1,
          minHeight: "260px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "1.25rem",
          marginBottom: "1rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
        }}
      >
        {empty && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: "1rem 0" }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", margin: 0 }}>
              Try one of these to get started:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.5rem" }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="fl-lift"
                  style={{
                    textAlign: "left",
                    background: "var(--paper-soft)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "0.75rem 0.95rem",
                    fontSize: "0.88rem",
                    color: "var(--ink)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <Bubble key={m.id} role={m.role} content={m.content} />
        ))}

        {pending && (
          <div style={{ display: "flex", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.85rem", padding: "0.25rem 0.5rem" }}>
            <span className="fl-typing-dot" />
            <span className="fl-typing-dot" style={{ animationDelay: "0.15s" }} />
            <span className="fl-typing-dot" style={{ animationDelay: "0.3s" }} />
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "flex-end",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "0.5rem 0.65rem",
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(input);
            }
          }}
          placeholder="Ask about your numbers…"
          rows={1}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            padding: "0.55rem 0.4rem",
            fontFamily: "inherit",
            fontSize: "0.95rem",
            color: "var(--ink)",
            maxHeight: "160px",
          }}
        />
        <button
          type="submit"
          disabled={pending || !input.trim()}
          style={{
            background: pending || !input.trim() ? "var(--border)" : "var(--ink)",
            color: "var(--paper)",
            border: "none",
            borderRadius: 10,
            padding: "0.55rem 0.9rem",
            fontSize: "0.85rem",
            fontWeight: 500,
            cursor: pending || !input.trim() ? "not-allowed" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l10-5-3 12-2-5-5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          Send
        </button>
      </form>

      <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "0.65rem", textAlign: "center" }}>
        AI can make mistakes. Verify important decisions yourself.
      </p>

      <style>{`
        @keyframes fl-typing {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-2px); }
        }
        .fl-typing-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--text-muted);
          display: inline-block;
          animation: fl-typing 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function Bubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "85%",
        background: isUser ? "var(--ink)" : "var(--paper-soft)",
        color: isUser ? "var(--paper)" : "var(--ink)",
        border: isUser ? "none" : "1px solid var(--border)",
        borderRadius: 14,
        padding: "0.7rem 0.95rem",
        fontSize: "0.95rem",
        lineHeight: 1.55,
        whiteSpace: "pre-wrap",
        animation: "fl-rise 320ms cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      {content}
    </div>
  );
}
