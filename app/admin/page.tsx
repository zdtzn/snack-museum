"use client";

import { useState, useEffect } from "react";
import { Snack, SnackCategory, CATEGORY_LABELS } from "@/lib/snacks";
import { Plus, Trash2, Edit3, X, Upload, ImageIcon } from "lucide-react";

const ALL_CATEGORIES: SnackCategory[] = [
  "puffed", "candy", "nuts", "dried-fruit", "beverage", "baked", "healthy",
];

const emptySnack = (): Omit<Snack, "id"> => ({
  name: "",
  subtitle: "",
  category: "puffed",
  brand: "",
  image: "",
  rating: 3,
  scores: { taste: 5, value: 5, packaging: 5, health: 5 },
  tags: [],
  review: "",
  isRecommended: true,
  date: new Date().toISOString().slice(0, 10),
  purchaseLink: "",
  markdownContent: "",
});

export default function AdminPage() {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [editing, setEditing] = useState<Snack | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptySnack());
  const [uploading, setUploading] = useState(false);

  // 加载数据
  const loadSnacks = async () => {
    const res = await fetch("/api/snacks");
    const data = await res.json();
    setSnacks(data.snacks);
  };

  useEffect(() => {
    loadSnacks();
  }, []);

  // 图片上传
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();

    if (data.url) {
      setForm({ ...form, image: data.url });
    }
    setUploading(false);
  };

  // 保存（新增或编辑）
  const handleSave = async () => {
    if (!form.name || !form.brand) return;

    const tagInput = (
      document.getElementById("tagInput") as HTMLInputElement
    )?.value;
    const tags = tagInput
      ? tagInput.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const payload = {
      ...form,
      tags,
    };

    if (editing) {
      await fetch(`/api/snacks/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/snacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setShowForm(false);
    setEditing(null);
    setForm(emptySnack());
    loadSnacks();
  };

  // 删除
  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这个零食吗？")) return;
    await fetch(`/api/snacks/${id}`, { method: "DELETE" });
    loadSnacks();
  };

  // 编辑
  const handleEdit = (snack: Snack) => {
    setEditing(snack);
    setForm({
      name: snack.name,
      subtitle: snack.subtitle,
      category: snack.category,
      brand: snack.brand,
      image: snack.image,
      rating: snack.rating,
      scores: { ...snack.scores },
      tags: [...snack.tags],
      review: snack.review,
      isRecommended: snack.isRecommended,
      date: snack.date,
      purchaseLink: snack.purchaseLink || "",
      markdownContent: snack.markdownContent || "",
    });
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold gradient-text mb-1">
            🛠️ 零食管理后台
          </h1>
          <p className="text-sm text-dark/40">
            当前共 {snacks.length} 条零食记录
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setForm(emptySnack());
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl
            shadow-lg shadow-primary/20 hover:scale-105 transition-all"
        >
          <Plus size={18} />
          添加零食
        </button>
      </div>

      {/* 表单弹窗 */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 p-4 bg-dark/40 backdrop-blur-sm overflow-y-auto">
          <div className="glass-heavy w-full max-w-2xl p-6 relative">
            <button
              onClick={() => { setShowForm(false); setEditing(null); }}
              className="absolute top-4 right-4 text-dark/30 hover:text-dark/60"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-extrabold text-dark mb-6">
              {editing ? `编辑：${editing.name}` : "添加新零食"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 名称 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-dark/60 mb-1">零食名称 *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="如：云南鲜花饼（玫瑰味）"
                />
              </div>

              {/* 一句话 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-dark/60 mb-1">一句话推荐</label>
                <input
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="如：一口咬下去，满嘴都是云南的春天"
                />
              </div>

              {/* 品牌 */}
              <div>
                <label className="block text-sm font-bold text-dark/60 mb-1">品牌 *</label>
                <input
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* 分类 */}
              <div>
                <label className="block text-sm font-bold text-dark/60 mb-1">分类</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as SnackCategory })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {ALL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </option>
                  ))}
                </select>
              </div>

              {/* 日期 */}
              <div>
                <label className="block text-sm font-bold text-dark/60 mb-1">测评日期</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* 红黑榜 */}
              <div>
                <label className="block text-sm font-bold text-dark/60 mb-1">红/黑榜</label>
                <select
                  value={form.isRecommended ? "red" : "black"}
                  onChange={(e) => setForm({ ...form, isRecommended: e.target.value === "red" })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="red">🔴 红榜（推荐）</option>
                  <option value="black">⚫ 黑榜（避雷）</option>
                </select>
              </div>

              {/* 总评分 */}
              <div>
                <label className="block text-sm font-bold text-dark/60 mb-1">
                  总评分 ({form.rating})
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })}
                  className="w-full accent-primary"
                />
              </div>

              {/* 四维度打分 */}
              <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["taste", "value", "packaging", "health"] as const).map((key) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-dark/40 mb-1">
                      {key === "taste" ? "😋 口味" : key === "value" ? "💰 性价比" : key === "packaging" ? "📦 包装" : "🥗 健康度"}
                      ({form.scores[key]})
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={form.scores[key]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          scores: { ...form.scores, [key]: parseFloat(e.target.value) },
                        })
                      }
                      className="w-full accent-primary"
                    />
                  </div>
                ))}
              </div>

              {/* 标签 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-dark/60 mb-1">
                  标签（逗号分隔）
                </label>
                <input
                  id="tagInput"
                  defaultValue={form.tags?.join("，") || ""}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="如：云南特产，传统糕点，玫瑰"
                />
              </div>

              {/* 购买链接 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-dark/60 mb-1">购买链接</label>
                <input
                  value={form.purchaseLink}
                  onChange={(e) => setForm({ ...form, purchaseLink: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* 简评 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-dark/60 mb-1">简评</label>
                <textarea
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>

              {/* 图片上传 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-dark/60 mb-2">零食图片</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-white/70 border border-dashed border-primary/30 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors">
                    <Upload size={16} className="text-primary" />
                    <span className="text-sm text-dark/50">
                      {uploading ? "上传中..." : "点击上传图片"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </label>
                  {form.image && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <ImageIcon size={16} />
                      <span className="truncate max-w-[200px]">{form.image}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-primary/10">
              <button
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="px-5 py-2 text-sm font-bold text-dark/50 hover:text-dark transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
              >
                {editing ? "保存修改" : "添加零食"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 零食列表 */}
      <div className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/10 bg-primary/5">
                <th className="text-left px-4 py-3 font-bold text-dark/60">图片</th>
                <th className="text-left px-4 py-3 font-bold text-dark/60">名称</th>
                <th className="text-left px-4 py-3 font-bold text-dark/60 hidden sm:table-cell">分类</th>
                <th className="text-center px-4 py-3 font-bold text-dark/60">评分</th>
                <th className="text-center px-4 py-3 font-bold text-dark/60 hidden sm:table-cell">状态</th>
                <th className="text-right px-4 py-3 font-bold text-dark/60">操作</th>
              </tr>
            </thead>
            <tbody>
              {snacks.map((snack) => (
                <tr key={snack.id} className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-light/30 to-accent/20 flex items-center justify-center text-lg">
                      🍪
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-dark">{snack.name}</div>
                    <div className="text-xs text-dark/40">{snack.brand}</div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {CATEGORY_LABELS[snack.category]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-bold">{snack.rating.toFixed(1)}</td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <span className={`text-xs font-bold ${snack.isRecommended ? "text-pink" : "text-dark/40"}`}>
                      {snack.isRecommended ? "🔴 红榜" : "⚫ 黑榜"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(snack)}
                        className="p-1.5 rounded-lg hover:bg-primary/10 text-dark/40 hover:text-primary transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(snack.id)}
                        className="p-1.5 rounded-lg hover:bg-pink/10 text-dark/40 hover:text-pink transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
