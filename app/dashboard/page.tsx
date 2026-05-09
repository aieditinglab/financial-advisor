import { createClient } from "@/lib/supabase/server";
import DashboardView from "@/components/dashboard/DashboardView";
import type { Item } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div style={{ maxWidth: "900px", margin: "3rem auto", padding: "0 1.5rem" }}>
        <div
          style={{
            padding: "1rem 1.25rem",
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "10px",
            color: "#B91C1C",
            fontSize: "0.9rem",
          }}
        >
          Couldn&apos;t load your items: {error.message}
        </div>
      </div>
    );
  }

  return <DashboardView items={(items ?? []) as Item[]} />;
}
