const MODEL = "gemini-2.0-flash";

interface GeminiPart {
  text: string;
}
interface GeminiContent {
  role?: "user" | "model";
  parts: GeminiPart[];
}
interface GeminiResponse {
  candidates?: { content: { parts: GeminiPart[] } }[];
  error?: { message: string };
}

export async function geminiGenerate(opts: {
  system?: string;
  messages: { role: "user" | "model"; text: string }[];
  temperature?: number;
}): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

  const contents: GeminiContent[] = opts.messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: opts.temperature ?? 0.6,
      maxOutputTokens: 1024,
    },
  };
  if (opts.system) {
    body.systemInstruction = { parts: [{ text: opts.system }] };
  }

  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  const json = (await r.json()) as GeminiResponse;
  if (!r.ok) throw new Error(json.error?.message ?? "Gemini request failed");
  return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
}
