"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PLATFORMS } from "@/lib/platforms";
import type { ItemStatus } from "@/lib/types";

export default function AddItemDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [cogs, setCogs] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [fees, setFees] = useState("");
  const [shipping, setShipping] = useState("");
  const [status, setStatus] = useState<ItemStatus>("in_inventory");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("You must be signed in.");
      setSubmitting(false);
      return;
    }

    const parseNum = (v: string) => (v.trim() === "" ? 0 : parseFloat(v));
    const sale = salePrice.trim() === "" ? null : parseFloat(salePrice);

    const { error: insertErr } = await supabase.from("items").insert({
      user_id: user.id,
      name: name.trim(),
      platform: platform || null,
      cogs: parseNum(cogs),
      sale_price: sale,
      fees: parseNum(fees),
      shipping: parseNum(shipping),
      status,
      sold_at: status === "sold" ? new Date().toISOString() : null,
    });

    setSubmitting(false);

    if (insertErr) {
      setError(insertErr.message);
      return;
    }

    onClose();
    router.refresh();
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
    letterSpacing: "0.02em",
    textTransform: "uppercase" as const,
    marginBottom: "5px",
  };

  const inputStyle = {
    width: "100%",
    background: "var(--paper-soft)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "0.65rem 0.85rem",
    color: "var(--ink)",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.15s, background 0.15s",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(31,30,29,0.45)",
        backdropFilter: "blur(2px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          borderRadius: "14px",
          border: "1px solid var(--border)",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "1.75rem",
          boxShadow: "0 20px 60px rgba(31,30,29,0.18)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <h2
              className="serif"
              style={{
                fontSize: "1.4rem",
                fontWeight: 500,
                color: "var(--ink)",
                margin: 0,
                letterSpacing: "-0.015em",
              }}
            >
              Add an item
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                margin: "4px 0 0",
                lineHeight: 1.5,
              }}
            >
              Log inventory, listings, or sales. You can edit details later.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Item name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nike Dunk Low Panda"
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.background = "var(--surface)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--paper-soft)";
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
            <div>
              <label style={labelStyle}>Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--paper-soft)";
                }}
              >
                <option value="">Select…</option>
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ItemStatus)}
                style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--paper-soft)";
                }}
              >
                <option value="in_inventory">In inventory</option>
                <option value="listed">Listed</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
            <div>
              <label style={labelStyle}>What you paid (COGS)</label>
              <MoneyInput value={cogs} onChange={setCogs} placeholder="0.00" />
            </div>
            <div>
              <label style={labelStyle}>Sale price</label>
              <MoneyInput
                value={salePrice}
                onChange={setSalePrice}
                placeholder={status === "sold" ? "0.00" : "—"}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={labelStyle}>Platform fees</label>
              <MoneyInput value={fees} onChange={setFees} placeholder="0.00" />
            </div>
            <div>
              <label style={labelStyle}>Shipping</label>
              <MoneyInput value={shipping} onChange={setShipping} placeholder="0.00" />
            </div>
          </div>

          {error && (
            <div
              style={{
                marginBottom: "1rem",
                padding: "0.65rem 0.85rem",
                background: "rgba(159,42,42,0.08)",
                border: "1px solid rgba(159,42,42,0.2)",
                borderRadius: "8px",
                color: "#9F2A2A",
                fontSize: "0.85rem",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                padding: "0.6rem 1.1rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || name.trim().length === 0}
              style={{
                background: submitting || !name.trim() ? "var(--text-muted)" : "var(--ink)",
                color: "var(--paper)",
                border: "none",
                padding: "0.6rem 1.25rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: submitting || !name.trim() ? "not-allowed" : "pointer",
                fontFamily: "inherit",
              }}
            >
              {submitting ? "Saving…" : "Save item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MoneyInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div style={{ position: "relative" }}>
      <span
        style={{
          position: "absolute",
          left: "0.85rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-muted)",
          fontSize: "0.9rem",
          pointerEvents: "none",
        }}
      >
        $
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "" || /^\d*\.?\d{0,2}$/.test(v)) onChange(v);
        }}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "var(--paper-soft)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "0.65rem 0.85rem 0.65rem 1.65rem",
          color: "var(--ink)",
          fontSize: "0.9rem",
          outline: "none",
          fontFamily: "inherit",
          transition: "border-color 0.15s, background 0.15s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.background = "var(--surface)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.background = "var(--paper-soft)";
        }}
      />
    </div>
  );
}
