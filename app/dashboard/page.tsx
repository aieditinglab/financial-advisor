import { createClient } from "@/lib/supabase/server";
import DashboardView from "@/components/dashboard/DashboardView";
import type { Item } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: items, error: itemsErr }, { data: profile }] = await Promise.all([
    supabase
      .from("items")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("profiles")
      .select("is_admin, plan, accepted_terms_at, email")
      .eq("id", user!.id)
      .maybeSingle(),
  ]);

  if (itemsErr) {
    return (
      <div style={{ maxWidth: "900px", margin: "3rem auto", padding: "0 1.5rem" }}>
        <div
          style={{
            padding: "1rem 1.25rem",
            background: "rgba(159,42,42,0.08)",
            border: "1px solid rgba(159,42,42,0.25)",
            borderRadius: "10px",
            color: "#9F2A2A",
            fontSize: "0.9rem",
          }}
        >
          Couldn&apos;t load your items: {itemsErr.message}
        </div>
      </div>
    );
  }

  return (
    <DashboardView
      items={(items ?? []) as Item[]}
      isAdmin={!!profile?.is_admin}
      plan={profile?.plan ?? "free"}
      autoOpenWalkthrough={params.welcome === "1"}
    />
  );
}
