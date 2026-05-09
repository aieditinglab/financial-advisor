"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ItemStatus } from "@/lib/types";
import { computeProfit } from "@/lib/types";
import { platformLabel } from "@/lib/platforms";
import { createClient } from "@/lib/supabase/client";

export interface DashboardRow {
  id: string;
  name: string;
  platform: string | null;
  cogs: number;
  sale_price: number | null;
  fees: number;
  shipping: number;
  status: ItemStatus;
  sold_at: string | null;
  isDemo: boolean;
}

const statusLabel: Record<ItemStatus, string> = {
  in_inventory: "Inventory",
  listed: "Listed",
  sold: "Sold",
};

const statusStyle: Record<ItemStatus, { bg: string; color: string }> = {
  in_inventory: { bg: "var(--paper-soft)", color: "var(--text-secondary)" },
  listed: { bg: "rgba(217,119,87,0.1)", color: "#B0532E" },
  sold: { bg: "var(--accent-soft)", color: "var(--accent-deep)" },
};

const fmtMoney = (n: number | null): string => {
  if (n === null) return "—";
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(n);
  return `${sign}$${abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const fmtDate = (iso: string | null): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function ItemsTable({
  rows,
  editable,
}: {
  rows: DashboardRow[];
  editable: boolean;
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!editable) return;
    if (!confirm("Delete this item? This can't be undone.")) return;
    setDeletingId(id);
    const supabase = createClient();
    const { error } = await supabase.from("items").delete().eq("id", id);
    setDeletingId(null);
    if (error) {
      alert(`Couldn't delete: ${error.message}`);
      return;
    }
    router.refresh();
  };

  if (rows.length === 0) {
    return (
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <p
          className="serif"
          style={{
            fontSize: "1.15rem",
            fontWeight: 500,
            color: "var(--ink)",
            margin: "0 0 0.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          No items yet
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: 0 }}>
          Click <strong style={{ color: "var(--ink)" }}>Add item</strong> to log your first flip.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "0.95rem 1.25rem",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          className="serif"
          style={{
            fontSize: "1.05rem",
            fontWeight: 500,
            color: "var(--ink)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Items
        </h2>
        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
          {rows.length} {rows.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "720px" }}>
          <thead>
            <tr style={{ background: "var(--paper-soft)" }}>
              <Th>Item</Th>
              <Th>Platform</Th>
              <Th>Status</Th>
              <Th align="right">COGS</Th>
              <Th align="right">Sale</Th>
              <Th align="right">Fees</Th>
              <Th align="right">Profit</Th>
              <Th align="right">Date</Th>
              {editable && <Th align="right" />}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const profit = computeProfit({
                sale_price: r.sale_price,
                cogs: r.cogs,
                fees: r.fees,
                shipping: r.shipping,
              });
              const isSold = r.status === "sold";
              const profitColor = !isSold
                ? "var(--text-muted)"
                : profit >= 0
                  ? "var(--accent-deep)"
                  : "#9F2A2A";
              const status = statusStyle[r.status];
              return (
                <tr
                  key={r.id}
                  style={{
                    borderTop: "1px solid var(--border-subtle)",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--paper-soft)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <Td>
                    <div style={{ fontWeight: 500, color: "var(--ink)" }}>{r.name}</div>
                  </Td>
                  <Td>
                    <span style={{ color: "var(--text-secondary)" }}>{platformLabel(r.platform)}</span>
                  </Td>
                  <Td>
                    <span
                      style={{
                        display: "inline-block",
                        background: status.bg,
                        color: status.color,
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: "20px",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {statusLabel[r.status]}
                    </span>
                  </Td>
                  <Td align="right">
                    <span className="mono" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {fmtMoney(r.cogs)}
                    </span>
                  </Td>
                  <Td align="right">
                    <span className="mono" style={{ fontSize: "0.85rem", color: isSold ? "var(--ink)" : "var(--text-muted)" }}>
                      {fmtMoney(r.sale_price)}
                    </span>
                  </Td>
                  <Td align="right">
                    <span className="mono" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {fmtMoney(isSold ? r.fees + r.shipping : null)}
                    </span>
                  </Td>
                  <Td align="right">
                    <span
                      className="mono"
                      style={{ fontSize: "0.9rem", color: profitColor, fontWeight: 600 }}
                    >
                      {isSold ? fmtMoney(profit) : "—"}
                    </span>
                  </Td>
                  <Td align="right">
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      {fmtDate(r.sold_at)}
                    </span>
                  </Td>
                  {editable && (
                    <Td align="right">
                      {!r.isDemo && (
                        <button
                          onClick={() => handleDelete(r.id)}
                          disabled={deletingId === r.id}
                          aria-label="Delete item"
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--text-muted)",
                            cursor: deletingId === r.id ? "default" : "pointer",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "0.78rem",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#9F2A2A")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                        >
                          {deletingId === r.id ? "…" : "Delete"}
                        </button>
                      )}
                    </Td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children?: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      style={{
        textAlign: align,
        padding: "0.65rem 1rem",
        fontSize: "0.72rem",
        fontWeight: 600,
        color: "var(--text-muted)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <td
      style={{
        textAlign: align,
        padding: "0.85rem 1rem",
        fontSize: "0.9rem",
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
}
