// AI/ML API client (https://aimlapi.com)
// OpenAI-compatible chat completions endpoint.

const ENDPOINT = "https://api.aimlapi.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o-mini";

interface OAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AimlResponse {
  choices?: { message?: { role?: string; content?: string } }[];
  error?: { message?: string } | string;
  message?: string;
}

export async function aimlGenerate(opts: {
  system?: string;
  messages: { role: "user" | "assistant"; text: string }[];
  temperature?: number;
  maxTokens?: number;
  model?: string;
}): Promise<string> {
  const apiKey = process.env.AL_API_KEY;
  if (!apiKey) throw new Error("AL_API_KEY not configured");

  const model = opts.model ?? process.env.AL_MODEL ?? DEFAULT_MODEL;

  const messages: OAIMessage[] = [];
  if (opts.system) messages.push({ role: "system", content: opts.system });
  for (const m of opts.messages) {
    messages.push({ role: m.role, content: m.text });
  }

  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: opts.temperature ?? 0.6,
      max_tokens: opts.maxTokens ?? 1024,
    }),
    cache: "no-store",
  });

  const json = (await r.json()) as AimlResponse;
  if (!r.ok) {
    const msg =
      typeof json.error === "string"
        ? json.error
        : (json.error?.message ?? json.message ?? `AI/ML request failed (${r.status})`);
    throw new Error(msg);
  }

  return json.choices?.[0]?.message?.content?.trim() ?? "";
}
