import { createClient } from "@/lib/supabase/server";
import GoalsView from "@/components/dashboard/GoalsView";
import type { Item } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function GoalsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: items }, { data: goals }] = await Promise.all([
    supabase.from("items").select("*").eq("user_id", user!.id),
    supabase.from("goals").select("*").eq("user_id", user!.id).order("month", { ascending: false }),
  ]);

  return <GoalsView items={(items ?? []) as Item[]} initialGoals={goals ?? []} />;
}
