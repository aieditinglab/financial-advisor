import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  searchEbayActive,
  searchEbaySold,
  summarize,
  type MarketResult,
} from "@/lib/scrapingbee";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { query, mode } = (await req.json()) as { query?: string; mode?: "sold" | "active" };
  if (!query?.trim()) return NextResponse.json({ error: "missing query" }, { status: 400 });

  const fn = mode === "active" ? searchEbayActive : searchEbaySold;
  let results: MarketResult[] = [];
  try {
    results = await fn(query);
  } catch {
    results = [];
  }

  const summary = summarize(results, query);

  await supabase.from("market_searches").insert({
    user_id: user.id,
    query,
    platform: "ebay",
    results: summary,
  });

  return NextResponse.json({ summary });
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("market_searches")
    .select("id, query, platform, results, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(15);

  return NextResponse.json({ searches: data ?? [] });
}
