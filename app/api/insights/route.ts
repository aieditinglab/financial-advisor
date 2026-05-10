import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { aimlGenerate } from "@/lib/aiml";
import { computeProfit, type Item } from "@/lib/types";

export const runtime = "nodejs";

const SYSTEM = `You are FlipLedger AI, generating an executive briefing for a reseller.

Return a JSON object with exactly this shape and no other text:
{
  "headline": "<one sentence overall summary, under 120 chars>",
  "highlights": [ { "title": "<short label>", "body": "<1 sentence>", "tone": "good" | "warn" | "info" } ],
  "actions": [ "<single concrete action sentence>" ]
}

Rules:
- "highlights" should have 3 items.
- "actions" should have 2 to 4 items, each a concrete next step the user can take this week.
- Tone "good" for wins, "warn" for losses or risk, "info" for neutral observations.
- Use the actual dollar figures from the data; round to whole dollars unless the cents matter.
- Don't invent items, platforms, or trends that aren't in the data.
- If there's not enough data (no sold items), say so honestly in the headline and recommend tracking more flips.`;

interface ItemRow extends Item {}

function buildContext(items: ItemRow[]): string {
  const sold = items.filter((i) => i.status === "sold");
  const active = items.filter((i) => i.status !== "sold");
  const totalProfit = sold.reduce(
    (acc, i) =>
      acc +
      computeProfit({
        sale_price: i.sale_price,
        cogs: Number(i.cogs),
        fees: Number(i.fees),
        shipping: Number(i.shipping),
      }),
    0,
  );
  const totalRevenue = sold.reduce((acc, i) => acc + Number(i.sale_price ?? 0), 0);
  const margin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  const platforms = new Map<string, { count: number; profit: number; revenue: number }>();
  sold.forEach((i) => {
    const p = i.platform ?? "unknown";
    const cur = platforms.get(p) ?? { count: 0, profit: 0, revenue: 0 };
    cur.count += 1;
    cur.profit += computeProfit({
      sale_price: i.sale_price,
      cogs: Number(i.cogs),
      fees: Number(i.fees),
      shipping: Number(i.shipping),
    });
    cur.revenue += Number(i.sale_price ?? 0);
    platforms.set(p, cur);
  });

  const losers = sold
    .map((i) => ({
      name: i.name,
      platform: i.platform,
      profit: computeProfit({
        sale_price: i.sale_price,
        cogs: Number(i.cogs),
        fees: Number(i.fees),
        shipping: Number(i.shipping),
      }),
    }))
    .filter((x) => x.profit < 0)
    .sort((a, b) => a.profit - b.profit)
    .slice(0, 5);

  const inventoryCapital = active.reduce((acc, i) => acc + Number(i.cogs), 0);

  return [
    `Sold items: ${sold.length}.`,
    `Active inventory: ${active.length} items, $${inventoryCapital.toFixed(2)} tied up.`,
    `Lifetime revenue: $${totalRevenue.toFixed(2)}, profit: $${totalProfit.toFixed(2)}, margin: ${margin.toFixed(1)}%.`,
    "",
    "Profit by platform:",
    ...Array.from(platforms.entries()).map(
      ([p, v]) =>
        `- ${p}: ${v.count} sales, $${v.profit.toFixed(2)} profit on $${v.revenue.toFixed(2)} revenue (${
          v.revenue > 0 ? ((v.profit / v.revenue) * 100).toFixed(1) : "0"
        }% margin)`,
    ),
    "",
    "Loss-making items:",
    ...losers.map((l) => `- ${l.name} (${l.platform ?? "—"}): $${l.profit.toFixed(2)}`),
  ].join("\n");
}

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const items = (data ?? []) as ItemRow[];
  const context = buildContext(items);

  try {
    const raw = await aimlGenerate({
      system: SYSTEM,
      messages: [{ role: "user", text: `Reseller data:\n\n${context}\n\nReturn the JSON briefing.` }],
      temperature: 0.4,
    });
    const cleaned = raw.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    const parsed = JSON.parse(cleaned);
    return NextResponse.json({ insights: parsed });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI request failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
