import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", user.id)
    .order("month", { ascending: false });

  return NextResponse.json({ goals: data ?? [] });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = (await req.json()) as {
    month: string;
    profit_target: number;
    revenue_target: number;
    notes?: string;
  };

  if (!body.month) return NextResponse.json({ error: "missing month" }, { status: 400 });

  const { data, error } = await supabase
    .from("goals")
    .upsert(
      {
        user_id: user.id,
        month: body.month,
        profit_target: body.profit_target,
        revenue_target: body.revenue_target,
        notes: body.notes ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,month" },
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ goal: data });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  await supabase.from("goals").delete().eq("user_id", user.id).eq("id", id);
  return NextResponse.json({ ok: true });
}
