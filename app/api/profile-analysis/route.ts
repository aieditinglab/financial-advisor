import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { aimlGenerate } from "@/lib/aiml";

export const runtime = "nodejs";

const SYSTEM = `You are Bolt Resell AI, analyzing a reseller's platform profile. Return a JSON object with exactly this shape:
{
  "summary": "<2-3 sentence overview of their selling performance>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"],
  "goalSuggestions": ["<goal 1>", "<goal 2>"]
}

Be specific and actionable. Reference their stats. No other text outside the JSON.`;

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json();
  const { platform, username, stats } = body;

  if (!platform || !username) {
    return NextResponse.json({ error: "missing platform or username" }, { status: 400 });
  }

  try {
    const prompt = `Analyze this reseller's ${platform} profile:
Username: ${username}
Total Sales: ${stats?.totalSales ?? "unknown"}
Total Revenue: $${stats?.totalRevenue ?? "unknown"}
Average Rating: ${stats?.avgRating ?? "unknown"}/5
Active Listings: ${stats?.activeListings ?? "unknown"}

Generate an analysis report with strengths, improvements, and goal suggestions.`;

    const raw = await aimlGenerate({
      system: SYSTEM,
      messages: [{ role: "user", text: prompt }],
      temperature: 0.5,
    });

    const cleaned = raw.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    const report = JSON.parse(cleaned);
    return NextResponse.json({ report });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Analysis failed";
    return NextResponse.json(
      {
        report: {
          summary: `Unable to complete analysis: ${msg}`,
          strengths: ["Consistent selling activity", "Multi-platform presence"],
          improvements: ["Consider cross-listing more items", "Optimize pricing strategy"],
          goalSuggestions: ["Increase monthly sales by 20%", "Expand to one new platform"],
        },
      },
      { status: 200 }
    );
  }
}
