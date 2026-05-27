// 零食条目类型
export interface Snack {
  id: string;
  name: string;
  subtitle: string; // 一句话卖点
  category: SnackCategory;
  brand: string;
  image: string; // 图片URL或占位路径
  rating: number; // 0-5 总评分
  scores: {
    taste: number; // 口味 0-10
    value: number; // 性价比 0-10
    packaging: number; // 包装 0-10
    health: number; // 健康度 0-10
  };
  tags: string[]; // 标签
  review: string; // 简评
  markdownContent: string; // 详细测评Markdown
  isRecommended: boolean; // true=红榜 false=黑榜
  date: string; // 测评日期
  purchaseLink?: string; // 购买链接
}

// 零食分类
export type SnackCategory =
  | "puffed" // 膨化
  | "candy" // 糖果
  | "nuts" // 坚果
  | "dried-fruit" // 果干
  | "beverage" // 饮品
  | "baked" // 烘焙
  | "healthy"; // 健康零食

// 分类中文名映射
export const CATEGORY_LABELS: Record<SnackCategory, string> = {
  puffed: "🍿 膨化",
  candy: "🍬 糖果",
  nuts: "🥜 坚果",
  "dried-fruit": "🍑 果干",
  beverage: "🥤 饮品",
  baked: "🥐 烘焙",
  healthy: "🥗 健康零食",
};

// 分类图标映射
export const CATEGORY_EMOJIS: Record<SnackCategory, string> = {
  puffed: "🍿",
  candy: "🍬",
  nuts: "🥜",
  "dried-fruit": "🍑",
  beverage: "🥤",
  baked: "🥐",
  healthy: "🥗",
};

// 评分维度中文名
export const SCORE_DIMENSIONS = {
  taste: "口味",
  value: "性价比",
  packaging: "包装",
  health: "健康度",
} as const;
