import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface ProfileRow {
  id: string;
  email: string | null;
  is_admin: boolean;
  plan: string;
  accepted_terms_at: string | null;
  created_at: string;
}

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: me } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!me?.is_admin) {
    return (
      <div style={{ maxWidth: "640px", margin: "5rem auto", padding: "0 1.5rem" }}>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "2.5rem 2rem",
            textAlign: "center",
          }}
        >
          <h1
            className="serif"
            style={{
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "var(--ink)",
              marginBottom: "0.5rem",
            }}
          >
            Admin only
          </h1>
          <p style={{ color: "var(--text-secondary)", margin: "0 0 1.5rem" }}>
            This page is restricted to FlipLedger admins.
          </p>
          <Link
            href="/dashboard"
            style={{
              display: "inline-block",
              background: "var(--ink)",
              color: "var(--paper)",
              padding: "0.6rem 1.25rem",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const [{ data: profiles }, { count: itemCount }, { count: soldCount }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, email, is_admin, plan, accepted_terms_at, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase.from("items").select("id", { count: "exact", head: true }),
    supabase.from("items").select("id", { count: "exact", head: true }).eq("status", "sold"),
  ]);

  const planCounts = (profiles ?? []).reduce(
    (acc, p) => {
      acc[p.plan] = (acc[p.plan] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const fmt = (iso: string | null): string =>
    iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.75rem 1rem 5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <Link
          href="/dashboard"
          style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}
        >
          ← Dashboard
        </Link>
        <span
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: "20px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Admin
        </span>
      </div>
      <h1
        className="serif"
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
          fontWeight: 500,
          color: "var(--ink)",
          letterSpacing: "-0.025em",
          margin: "0.5rem 0 0.5rem",
        }}
      >
        System overview
      </h1>
      <p style={{ color: "var(--text-secondary)", margin: "0 0 1.75rem", fontSize: "0.95rem" }}>
        FlipLedger administrative dashboard. Visible only to authorized accounts.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "0.75rem",
          marginBottom: "1.75rem",
        }}
      >
        <AdminStat label="Total users" value={String(profiles?.length ?? 0)} />
        <AdminStat label="Total items tracked" value={String(itemCount ?? 0)} />
        <AdminStat label="Items sold" value={String(soldCount ?? 0)} />
        <AdminStat label="Pro / Max users" value={String((planCounts.pro ?? 0) + (planCounts.max ?? 0))} />
      </div>

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
            Recent users
          </h2>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            {profiles?.length ?? 0} {profiles?.length === 1 ? "user" : "users"}
          </span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "640px" }}>
            <thead>
              <tr style={{ background: "var(--paper-soft)" }}>
                <Th>Email</Th>
                <Th>Plan</Th>
                <Th>Role</Th>
                <Th>Joined</Th>
                <Th>Terms accepted</Th>
              </tr>
            </thead>
            <tbody>
              {((profiles ?? []) as ProfileRow[]).map((p) => (
                <tr key={p.id} style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  <Td>{p.email ?? "—"}</Td>
                  <Td>
                    <span
                      style={{
                        display: "inline-block",
                        background:
                          p.plan === "max"
                            ? "var(--accent-soft)"
                            : p.plan === "pro"
                              ? "rgba(217,119,87,0.12)"
                              : "var(--paper-soft)",
                        color:
                          p.plan === "max"
                            ? "var(--accent-deep)"
                            : p.plan === "pro"
                              ? "#B0532E"
                              : "var(--text-secondary)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: "20px",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {p.plan}
                    </span>
                  </Td>
                  <Td>
                    {p.is_admin ? (
                      <span
                        style={{
                          background: "var(--ink)",
                          color: "var(--paper)",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "20px",
                          textTransform: "uppercase",
                        }}
                      >
                        Admin
                      </span>
                    ) : (
                      <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>User</span>
                    )}
                  </Td>
                  <Td>{fmt(p.created_at)}</Td>
                  <Td>{fmt(p.accepted_terms_at)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p
        style={{
          marginTop: "1.5rem",
          color: "var(--text-muted)",
          fontSize: "0.78rem",
          lineHeight: 1.55,
        }}
      >
        Admin privileges are tied to{" "}
        <span className="mono" style={{ color: "var(--ink)" }}>
          aieditinglab@gmail.com
        </span>
        . Other accounts cannot access this page.
      </p>
    </div>
  );
}

function AdminStat({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "1.15rem 1.25rem",
      }}
    >
      <div
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.78rem",
          fontWeight: 500,
          marginBottom: "0.4rem",
        }}
      >
        {label}
      </div>
      <div
        className="serif"
        style={{
          fontSize: "1.65rem",
          fontWeight: 500,
          color: "var(--ink)",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
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

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: "0.85rem 1rem",
        fontSize: "0.88rem",
        color: "var(--ink-2)",
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
}
