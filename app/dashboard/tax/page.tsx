import { createClient } from "@/lib/supabase/server";
import TaxView from "@/components/dashboard/TaxView";
import type { Item } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function TaxPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: items } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return <TaxView items={(items ?? []) as Item[]} />;
}
