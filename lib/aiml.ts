// Groq API client (https://groq.com)
// OpenAI-compatible chat completions endpoint — blazing fast inference.

const ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "qwen/qwen3-32b";

type OAIContent =
  | string
  | {
      type: "text";
      text: string;
    }
  | {
      type: "image_url";
      image_url: { url: string };
    };

interface OAIMessage {
  role: "system" | "user" | "assistant";
  content: OAIContent | OAIContent[];
}

interface AimlResponse {
  choices?: { message?: { role?: string; content?: string } }[];
  error?: { message?: string } | string;
  message?: string;
}

export async function aimlGenerate(opts: {
  system?: string;
  messages: { role: "user" | "assistant"; text: string; images?: string[] }[];
  temperature?: number;
  maxTokens?: number;
  model?: string;
}): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not configured");

  const model = opts.model ?? process.env.GROQ_MODEL ?? DEFAULT_MODEL;

  const messages: OAIMessage[] = [];
  if (opts.system) messages.push({ role: "system", content: opts.system });
  for (const m of opts.messages) {
    const content: OAIContent[] = [{ type: "text", text: m.text }];
    if (m.images && m.images.length > 0) {
      for (const img of m.images) {
        content.push({ type: "image_url", image_url: { url: img } });
      }
    }
    messages.push({ role: m.role, content: content.length === 1 ? m.text : content });
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
      // Groq Qwen reasoning models: hide the <think> chain-of-thought from the response.
      // Other models ignore this field harmlessly.
      reasoning_format: "hidden",
    }),
    cache: "no-store",
  });

  const json = (await r.json()) as AimlResponse;
  if (!r.ok) {
    const msg =
      typeof json.error === "string"
        ? json.error
        : (json.error?.message ?? json.message ?? `Groq request failed (${r.status})`);
    throw new Error(msg);
  }

  const raw = json.choices?.[0]?.message?.content ?? "";
  return stripThinking(raw).trim();
}

/**
 * Strip out chain-of-thought / reasoning blocks that some models (Qwen, DeepSeek-R1, etc.)
 * emit before their final answer. We never want to expose this to end users.
 */
function stripThinking(text: string): string {
  if (!text) return "";
  let out = text;
  // Remove <think>...</think> blocks (closed)
  out = out.replace(/<think>[\s\S]*?<\/think>/gi, "");
  // Remove orphan opening <think> with no close (truncated output)
  out = out.replace(/<think>[\s\S]*$/i, "");
  // Remove orphan closing </think> if reasoning came at the very start with no opener
  out = out.replace(/^[\s\S]*?<\/think>/i, (m) => (m.includes("<think>") ? m : ""));
  // Same for other common reasoning wrappers
  out = out.replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "");
  out = out.replace(/<thought>[\s\S]*?<\/thought>/gi, "");
  return out.trim();
}