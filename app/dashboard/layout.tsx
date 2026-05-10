import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/dashboard/SignOutButton";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  const email = user.email ?? "";
  const initial = email.charAt(0).toUpperCase();
  const isAdmin = !!profile?.is_admin;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--paper)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "0 1.25rem 0 4rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
        className="fl-dash-header"
      >
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "26px",
              height: "26px",
              background: "var(--ink)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 12l3.5-3.5 2.5 2.5 3.5-4.5 3 2.5"
                stroke="#FAFAF8"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="serif"
            style={{
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "var(--ink)",
            }}
          >
            FlipLedger
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <span
            style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}
            className="hide-on-mobile"
          >
            {email}
          </span>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "var(--accent-soft)",
              color: "var(--accent-deep)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: "0.8rem",
            }}
          >
            {initial}
          </div>
          <SignOutButton />
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar isAdmin={isAdmin} />
        <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
      </div>

      <footer
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          padding: "1rem 1.75rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", margin: 0, lineHeight: 1.6 }}>
          AI outputs are informational only — not financial, tax, or legal advice.{" "}
          <Link href="/disclaimer" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Full disclaimer
          </Link>
          {" · "}
          <Link href="/terms" style={{ color: "var(--text-muted)" }}>Terms</Link>
          {" · "}
          <Link href="/privacy" style={{ color: "var(--text-muted)" }}>Privacy</Link>
        </p>
      </footer>

      <style>{`
        @media (max-width: 640px) {
          .hide-on-mobile { display: none !important; }
        }
        @media (min-width: 901px) {
          .fl-dash-header { padding-left: 1.75rem !important; }
        }
      `}</style>
    </div>
  );
}
