import type { CSSProperties } from "react";

export const labelStyle: CSSProperties = {
  display: "block",
  color: "var(--text-secondary)",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  marginBottom: "6px",
};

export const inputStyle: CSSProperties = {
  width: "100%",
  background: "var(--paper-soft)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  padding: "0.7rem 0.85rem",
  color: "var(--ink)",
  fontSize: "0.95rem",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.15s, background 0.15s",
};

export const buttonStyle: CSSProperties = {
  width: "100%",
  background: "var(--ink)",
  color: "var(--paper)",
  border: "none",
  borderRadius: "8px",
  padding: "0.8rem",
  fontWeight: 500,
  fontSize: "0.95rem",
  cursor: "pointer",
  fontFamily: "inherit",
  letterSpacing: "0",
  transition: "background 0.15s",
};

export const buttonDisabledStyle: CSSProperties = {
  ...buttonStyle,
  background: "var(--text-muted)",
  cursor: "not-allowed",
};

export const errorStyle: CSSProperties = {
  marginTop: "0.85rem",
  padding: "0.65rem 0.85rem",
  background: "rgba(159,42,42,0.06)",
  border: "1px solid rgba(159,42,42,0.2)",
  borderRadius: "8px",
  color: "#9F2A2A",
  fontSize: "0.85rem",
  lineHeight: 1.5,
};

export const noticeStyle: CSSProperties = {
  marginTop: "0.85rem",
  padding: "0.65rem 0.85rem",
  background: "var(--accent-soft)",
  border: "1px solid rgba(16,185,129,0.25)",
  borderRadius: "8px",
  color: "var(--accent-deep)",
  fontSize: "0.85rem",
  lineHeight: 1.5,
};
