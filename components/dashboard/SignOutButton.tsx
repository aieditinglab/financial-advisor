"use client";

export default function SignOutButton() {
  return (
    <form action="/auth/signout" method="post">
      <button
        type="submit"
        style={{
          background: "transparent",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
          padding: "0.4rem 0.85rem",
          borderRadius: "6px",
          fontSize: "0.8rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.15s, border-color 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--paper-soft)";
          e.currentTarget.style.borderColor = "var(--text-muted)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        Sign out
      </button>
    </form>
  );
}
