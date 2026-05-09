import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const VOICE_ID = "uYXf8XasLslADfZ2MB4u";

export async function POST(req: NextRequest) {
  const { text } = (await req.json()) as { text?: string };
  if (!text) return NextResponse.json({ error: "missing text" }, { status: 400 });

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "tts_disabled" }, { status: 503 });

  const r = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
      cache: "no-store",
    },
  );

  if (!r.ok) {
    const detail = await r.text();
    return NextResponse.json({ error: "tts_failed", detail }, { status: 502 });
  }

  const audio = await r.arrayBuffer();
  return new NextResponse(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
