export interface MarketResult {
  title: string;
  price: number;
  currency: string;
  url?: string;
  source: string;
}

const ENDPOINT = "https://app.scrapingbee.com/api/v1/";

async function fetchHtml(url: string): Promise<string | null> {
  const apiKey = process.env.SCRAPINGBEE_API_KEY;
  if (!apiKey) return null;

  const params = new URLSearchParams({
    api_key: apiKey,
    url,
    render_js: "false",
    block_resources: "true",
    country_code: "us",
  });

  try {
    const r = await fetch(`${ENDPOINT}?${params.toString()}`, {
      cache: "no-store",
    });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  }
}

function parsePrices(html: string, source: string): MarketResult[] {
  // Generic price pattern: $123.45 near a likely title element. We pull
  // candidate titles + prices from the raw HTML using a couple of regexes.
  const results: MarketResult[] = [];
  const seen = new Set<string>();

  // Match anchor text + a near-by USD price. Loose pattern, but works on
  // eBay and Google Shopping listing snippets.
  const pattern =
    /<a[^>]*href="([^"]+)"[^>]*>([^<]{8,160})<\/a>[\s\S]{0,500}?\$([0-9]{1,4}(?:[.,][0-9]{1,2})?)/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) && results.length < 10) {
    const href = decodeHtml(match[1]);
    const title = decodeHtml(match[2]).replace(/\s+/g, " ").trim();
    const priceStr = match[3].replace(/,/g, "");
    const price = Number.parseFloat(priceStr);
    if (!title || price < 1 || price > 50000 || seen.has(title.toLowerCase())) continue;
    seen.add(title.toLowerCase());
    results.push({
      title,
      price,
      currency: "USD",
      url: href.startsWith("http") ? href : undefined,
      source,
    });
  }
  return results;
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

export async function searchEbaySold(query: string): Promise<MarketResult[]> {
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
    query,
  )}&LH_Sold=1&LH_Complete=1`;
  const html = await fetchHtml(url);
  if (!html) return [];
  return parsePrices(html, "eBay (sold)");
}

export async function searchEbayActive(query: string): Promise<MarketResult[]> {
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}`;
  const html = await fetchHtml(url);
  if (!html) return [];
  return parsePrices(html, "eBay (active)");
}

export interface MarketSummary {
  query: string;
  count: number;
  median: number | null;
  low: number | null;
  high: number | null;
  average: number | null;
  results: MarketResult[];
}

export function summarize(results: MarketResult[], query: string): MarketSummary {
  if (results.length === 0) {
    return { query, count: 0, median: null, low: null, high: null, average: null, results };
  }
  const prices = results.map((r) => r.price).sort((a, b) => a - b);
  const median =
    prices.length % 2 === 1
      ? prices[(prices.length - 1) >> 1]
      : (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2;
  const average = prices.reduce((acc, p) => acc + p, 0) / prices.length;
  return {
    query,
    count: results.length,
    median,
    low: prices[0],
    high: prices[prices.length - 1],
    average,
    results,
  };
}
