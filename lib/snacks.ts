// 零食条目类型
export interface Snack {
  id: string;
  name: string;
  subtitle: string;
  category: SnackCategory;
  brand: string;
  image: string;
  rating: number; // 口感评分 0-5
  tags: string[];
  review: string;
  date: string;
  wechat?: string; // 微信号/联系方式
  phone?: string; // 联系电话
}

export type SnackCategory =
  | "puffed" | "candy" | "nuts" | "dried-fruit"
  | "beverage" | "baked" | "healthy";

export const CATEGORY_LABELS: Record<SnackCategory, string> = {
  puffed: "🍿 膨化",
  candy: "🍬 糖果",
  nuts: "🥜 坚果",
  "dried-fruit": "🍑 果干",
  beverage: "🥤 饮品",
  baked: "🥐 烘焙",
  healthy: "🥗 健康零食",
};

export const CATEGORY_EMOJIS: Record<SnackCategory, string> = {
  puffed: "🍿", candy: "🍬", nuts: "🥜",
  "dried-fruit": "🍑", beverage: "🥤", baked: "🥐", healthy: "🥗",
};
