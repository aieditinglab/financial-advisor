export type ItemStatus = "in_inventory" | "listed" | "sold";

export interface Item {
  id: string;
  user_id: string;
  name: string;
  platform: string | null;
  cogs: number;
  sale_price: number | null;
  fees: number;
  shipping: number;
  status: ItemStatus;
  sold_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DemoItem {
  id: string;
  name: string;
  platform: string;
  cogs: number;
  sale_price: number;
  fees: number;
  shipping: number;
  status: ItemStatus;
  sold_at: string | null;
}

export const computeProfit = (item: {
  sale_price: number | null;
  cogs: number;
  fees: number;
  shipping: number;
}): number => {
  const sale = item.sale_price ?? 0;
  return sale - item.cogs - item.fees - item.shipping;
};
