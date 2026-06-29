import { Snack, SnackCategory } from "./snacks";

const VALID_CATEGORIES: SnackCategory[] = [
  "puffed", "candy", "spicy-snack", "instant-food", "beverage", "healthy",
];

export interface ValidationResult {
  ok: boolean;
  error?: string;
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function isNumber(v: unknown): v is number {
  return typeof v === "number" && !Number.isNaN(v);
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

/** 校验零食创建/更新的请求体 */
export function validateSnackInput(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "请求体必须是对象" };
  }
  const b = body as Record<string, unknown>;

  if (!isString(b.name) || b.name.trim().length === 0) {
    return { ok: false, error: "name 必填且为非空字符串" };
  }
  if (!isString(b.brand) || b.brand.trim().length === 0) {
    return { ok: false, error: "brand 必填且为非空字符串" };
  }
  if (!isString(b.category) || !VALID_CATEGORIES.includes(b.category as SnackCategory)) {
    return { ok: false, error: `category 必须是 ${VALID_CATEGORIES.join(", ")} 之一` };
  }
  if (b.rating !== undefined && (!isNumber(b.rating) || b.rating < 0 || b.rating > 5)) {
    return { ok: false, error: "rating 必须是 0-5 之间的数字" };
  }
  if (b.tags !== undefined && !isStringArray(b.tags)) {
    return { ok: false, error: "tags 必须是字符串数组" };
  }
  if (b.image !== undefined && !isString(b.image)) {
    return { ok: false, error: "image 必须是字符串" };
  }
  if (b.subtitle !== undefined && !isString(b.subtitle)) {
    return { ok: false, error: "subtitle 必须是字符串" };
  }
  if (b.review !== undefined && !isString(b.review)) {
    return { ok: false, error: "review 必须是字符串" };
  }
  if (b.date !== undefined && !isString(b.date)) {
    return { ok: false, error: "date 必须是字符串" };
  }
  if (b.wechat !== undefined && !isString(b.wechat)) {
    return { ok: false, error: "wechat 必须是字符串" };
  }
  if (b.phone !== undefined && !isString(b.phone)) {
    return { ok: false, error: "phone 必须是字符串" };
  }

  return { ok: true };
}

/** 通用对象校验：确保是普通对象（非数组、非 null） */
export function validateObject(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, error: "请求体必须是对象" };
  }
  return { ok: true };
}

/** 清洗字符串：限制长度，去除控制字符 */
export function sanitizeString(s: unknown, maxLen = 1000): string {
  if (typeof s !== "string") return "";
  return s.slice(0, maxLen).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

/** 构造安全的 Snack 对象（用于写入前） */
export function sanitizeSnack(input: Record<string, unknown>): Omit<Snack, "id"> {
  return {
    name: sanitizeString(input.name, 100),
    subtitle: sanitizeString(input.subtitle, 200),
    category: (input.category as SnackCategory) || "puffed",
    brand: sanitizeString(input.brand, 100),
    image: sanitizeString(input.image, 500),
    rating: typeof input.rating === "number" ? Math.max(0, Math.min(5, input.rating)) : 3,
    tags: Array.isArray(input.tags) ? input.tags.slice(0, 20).map((t) => sanitizeString(t, 50)) : [],
    review: sanitizeString(input.review, 2000),
    date: sanitizeString(input.date, 20) || new Date().toISOString().slice(0, 10),
    wechat: sanitizeString(input.wechat, 100),
    phone: sanitizeString(input.phone, 30),
  };
}
