import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { aimlGenerate } from "@/lib/aiml";
import { computeProfit, type Item } from "@/lib/types";

export const runtime = "nodejs";

const SYSTEM = `You are Bolt Resell AI, a financial assistant for resellers (eBay, StockX, Depop, Whatnot, Amazon, Mercari, Poshmark, Grailed, Goat, OfferUp).

You speak plainly and help small sellers understand their numbers, not lecture them. Keep answers short and useful — usually 1–4 sentences. When you reference dollar amounts, format them with a $ and two decimals (e.g., $124.50). Use plain bullet points only when the user asks for a list.

When the user has tracked items in their dashboard, ground your answer in those numbers — do not invent figures. If the data does not contain the answer, say so honestly.

You are NOT a licensed financial, tax, or legal advisor. If the user asks about taxes, legal structure, or investment advice, share general framing and remind them to talk to a professional.`;

interface FileAttachment {
  id: string;
  name: string;
  type: string;
  base64: string;
}

interface ChatRequest {
  message: string;
  history?: { role: "user" | "assistant" | "model"; text: string }[];
  attachments?: FileAttachment[];
}

function buildItemContext(items: Item[]): string {
  if (items.length === 0) {
    return "The user has not tracked any items yet.";
  }
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

  const platformProfits = new Map<string, { count: number; profit: number }>();
  sold.forEach((i) => {
    const p = i.platform ?? "unknown";
    const cur = platformProfits.get(p) ?? { count: 0, profit: 0 };
    cur.count += 1;
    cur.profit += computeProfit({
      sale_price: i.sale_price,
      cogs: Number(i.cogs),
      fees: Number(i.fees),
      shipping: Number(i.shipping),
    });
    platformProfits.set(p, cur);
  });

  const recent = items.slice(0, 25).map((i) => {
    const profit = computeProfit({
      sale_price: i.sale_price,
      cogs: Number(i.cogs),
      fees: Number(i.fees),
      shipping: Number(i.shipping),
    });
    return `- ${i.name} | ${i.platform ?? "—"} | ${i.status} | cogs $${Number(i.cogs).toFixed(2)} | sale ${
      i.sale_price === null ? "—" : `$${Number(i.sale_price).toFixed(2)}`
    } | profit ${i.status === "sold" ? `$${profit.toFixed(2)}` : "—"}`;
  });

  const lines = [
    `Total items tracked: ${items.length}.`,
    `Sold: ${sold.length}, in inventory or listed: ${active.length}.`,
    `Lifetime revenue: $${totalRevenue.toFixed(2)}.`,
    `Lifetime net profit: $${totalProfit.toFixed(2)}.`,
    `Average margin: ${margin.toFixed(1)}%.`,
    "",
    "Profit by platform:",
    ...Array.from(platformProfits.entries()).map(
      ([p, { count, profit }]) => `- ${p}: ${count} sales, $${profit.toFixed(2)} profit`,
    ),
    "",
    "Recent items (newest first):",
    ...recent,
  ];
  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = (await req.json()) as ChatRequest;
  if (!body.message?.trim()) {
    return NextResponse.json({ error: "missing message" }, { status: 400 });
  }

  const { data: items } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const context = buildItemContext((items ?? []) as Item[]);

  const messages: { role: "user" | "assistant"; text: string; images?: string[] }[] = [];
  messages.push({
    role: "user",
    text: `Here is the user's tracked reseller data. Treat it as ground truth.\n\n${context}`,
  });
  messages.push({
    role: "assistant",
    text: "Got it — I have the user's reseller data. What would you like to know?",
  });
  for (const m of body.history ?? []) {
    // Accept legacy "model" role alias from older client bundles.
    const role = m.role === "model" ? "assistant" : m.role;
    if (role === "user" || role === "assistant") {
      messages.push({ role, text: m.text });
    }
  }

  // Extract image attachments
  const images: string[] = [];
  if (body.attachments && body.attachments.length > 0) {
    for (const att of body.attachments) {
      if (att.type.startsWith("image/")) {
        images.push(att.base64);
      }
    }
  }

  messages.push({ role: "user", text: body.message, images: images.length > 0 ? images : undefined });

  try {
    const reply = await aimlGenerate({ system: SYSTEM, messages, temperature: 0.55 });

    await supabase.from("chat_messages").insert([
      { user_id: user.id, role: "user", content: body.message },
      { user_id: user.id, role: "assistant", content: reply },
    ]);

    return NextResponse.json({ reply });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI request failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("chat_messages")
    .select("id, role, content, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(60);

  return NextResponse.json({ messages: data ?? [] });
}

export async function DELETE() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  await supabase.from("chat_messages").delete().eq("user_id", user.id);
  return NextResponse.json({ ok: true });
}
