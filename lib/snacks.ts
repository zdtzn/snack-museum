export interface Snack {
  id: string;
  name: string;
  subtitle: string;
  category: SnackCategory;
  brand: string;
  image: string;
  rating: number;
  tags: string[];
  review: string;
  date: string;
  wechat?: string;
  phone?: string;
}

export type SnackCategory =
  | "puffed" | "candy" | "spicy-snack" | "instant-food"
  | "beverage" | "healthy";

export const CATEGORY_LABELS: Record<SnackCategory, string> = {
  puffed: "🍿 膨化",
  candy: "🍬 糖果",
  "spicy-snack": "🌶 辣条",
  "instant-food": "🍜 方便速食",
  beverage: "🥤 饮品",
  healthy: "🥗 健康零食",
};

export const CATEGORY_EMOJIS: Record<SnackCategory, string> = {
  puffed: "🍿", candy: "🍬", "spicy-snack": "🌶",
  "instant-food": "🍜", beverage: "🥤", healthy: "🥗",
};
