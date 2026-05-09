export const PLATFORMS = [
  { value: "ebay", label: "eBay" },
  { value: "stockx", label: "StockX" },
  { value: "amazon", label: "Amazon FBA" },
  { value: "whatnot", label: "Whatnot" },
  { value: "depop", label: "Depop" },
  { value: "mercari", label: "Mercari" },
  { value: "poshmark", label: "Poshmark" },
  { value: "facebook", label: "Facebook Marketplace" },
  { value: "etsy", label: "Etsy" },
  { value: "other", label: "Other" },
] as const;

export type PlatformValue = (typeof PLATFORMS)[number]["value"];

export const platformLabel = (value: string | null | undefined): string => {
  const match = PLATFORMS.find((p) => p.value === value);
  return match?.label ?? "—";
};
