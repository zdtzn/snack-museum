"use client";

import { useState, useEffect } from "react";
import { Snack, SnackCategory, CATEGORY_LABELS } from "@/lib/snacks";
import { Plus, Trash2, Edit3, X, Upload } from "lucide-react";
import { AboutEditor } from "./AboutEditor";
import { CustomerEditor } from "./CustomerEditor";
import { PriceComparisonEditor } from "./PriceComparisonEditor";

const ALL_CATEGORIES: SnackCategory[] = [
  "puffed", "candy", "spicy-snack", "instant-food", "beverage", "healthy",
];

const emptyForm = () => ({
  name: "", subtitle: "", category: "puffed" as SnackCategory,
  brand: "", image: "", rating: 3, tags: [] as string[],
  review: "", date: new Date().toISOString().slice(0, 10), wechat: "", phone: "",
});

export default function AdminPage() {
  const [tab, setTab] = useState<"products" | "about" | "customer" | "price">("products");
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [editing, setEditing] = useState<Snack | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const loadSnacks = async () => {
    const res = await fetch("/api/snacks");
    const data = await res.json();
    setSnacks(data.snacks);
  };

  useEffect(() => {
    let ignore = false;

    fetch("/api/snacks")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setSnacks(data.snacks);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setForm({ ...form, image: data.url });
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.name || !form.brand) return;
    // 同时支持中英文逗号分割
    const tags = tagInput
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = { ...form, tags };
    if (editing) {
      await fetch(`/api/snacks/${editing.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/snacks", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
    }
    setShowForm(false); setEditing(null); setForm(emptyForm());
    loadSnacks();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/snacks/${id}`, { method: "DELETE" });
    loadSnacks();
  };

  const handleEdit = (snack: Snack) => {
    setEditing(snack);
    setForm({
      name: snack.name, subtitle: snack.subtitle, category: snack.category,
      brand: snack.brand, image: snack.image || "", rating: snack.rating,
      tags: [...snack.tags], review: snack.review, date: snack.date,
      wechat: snack.wechat || "", phone: snack.phone || "",
    });
    setTagInput(snack.tags.join("，"));
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Tab切换 */}
      <div className="flex gap-4 mb-8">
        <button onClick={() => setTab("products")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === "products" ? "bg-primary text-white shadow-lg" : "bg-white/60 text-dark/50 hover:bg-primary/10"}`}>
          📦 产品管理
        </button>
        <button onClick={() => setTab("about")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === "about" ? "bg-primary text-white shadow-lg" : "bg-white/60 text-dark/50 hover:bg-primary/10"}`}>
          📖 关于我们
        </button>
        <button onClick={() => setTab("customer")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === "customer" ? "bg-primary text-white shadow-lg" : "bg-white/60 text-dark/50 hover:bg-primary/10"}`}>
          💬 客服微信
        </button>
        <button onClick={() => setTab("price")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === "price" ? "bg-primary text-white shadow-lg" : "bg-white/60 text-dark/50 hover:bg-primary/10"}`}>
          💰 价格对比
        </button>
      </div>

      {tab === "about" ? <AboutEditor /> : tab === "customer" ? <CustomerEditor /> : tab === "price" ? <PriceComparisonEditor /> : (
      <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold gradient-text mb-1">🛠️ 管理后台</h1>
          <p className="text-sm text-dark/40">共 {snacks.length} 款产品</p>
        </div>
        <button onClick={() => { setEditing(null); setForm(emptyForm()); setTagInput(""); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Plus size={18} />添加产品
        </button>
      </div>

      {/* 表单弹窗 */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 p-4 bg-dark/40 backdrop-blur-sm overflow-y-auto">
          <div className="glass-heavy w-full max-w-2xl p-6 relative">
            <button onClick={() => { setShowForm(false); setEditing(null); }}
              className="absolute top-4 right-4 text-dark/30 hover:text-dark/60" aria-label="关闭"><X size={20} /></button>
            <h2 className="text-xl font-extrabold text-dark mb-6">{editing ? "编辑" : "添加产品"}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-dark/60 mb-1">产品名称 *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-dark/60 mb-1">一句话推荐</label>
                <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark/60 mb-1">品牌 *</label>
                <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark/60 mb-1">分类</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as SnackCategory })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {ALL_CATEGORIES.map((cat) => <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-dark/60 mb-1">口感评分 ({form.rating})</label>
                <input type="range" min="0" max="5" step="0.1" value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })}
                  className="w-full accent-primary" />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark/60 mb-1">日期</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark/60 mb-1">微信</label>
                <input value={form.wechat} onChange={(e) => setForm({ ...form, wechat: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="微信号或二维码说明" />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark/60 mb-1">电话</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="选填" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="tagInput" className="block text-sm font-bold text-dark/60 mb-1">标签（逗号分隔）</label>
                <input id="tagInput" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="云南特产，传统糕点" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-dark/60 mb-1">简介</label>
                <textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })}
                  rows={3} className="w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-dark/60 mb-2">产品图片</label>
                <label className="flex items-center gap-2 px-4 py-2 bg-white/70 border border-dashed border-primary/30 rounded-lg cursor-pointer hover:bg-primary/5">
                  <Upload size={16} className="text-primary" />
                  <span className="text-sm text-dark/50">{uploading ? "上传中..." : "点击上传图片"}</span>
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
                {form.image && <p className="text-xs text-primary mt-1 truncate">{form.image}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-primary/10">
              <button onClick={() => { setShowForm(false); setEditing(null); }}
                className="px-5 py-2 text-sm font-bold text-dark/50 hover:text-dark">取消</button>
              <button onClick={handleSave}
                className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105">
                {editing ? "保存" : "添加"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 列表 */}
      <div className="glass overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary/10 bg-primary/5">
              <th className="text-left px-4 py-3 font-bold text-dark/60">名称</th>
              <th className="text-left px-4 py-3 font-bold text-dark/60 hidden sm:table-cell">分类</th>
              <th className="text-center px-4 py-3 font-bold text-dark/60">口感评分</th>
              <th className="text-left px-4 py-3 font-bold text-dark/60 hidden sm:table-cell">微信</th>
              <th className="text-right px-4 py-3 font-bold text-dark/60">操作</th>
            </tr>
          </thead>
          <tbody>
            {snacks.map((snack) => (
              <tr key={snack.id} className="border-b border-primary/5 hover:bg-primary/5">
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
                <td className="px-4 py-3 text-xs text-dark/40 hidden sm:table-cell">{snack.wechat || "-"}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(snack)} className="p-1.5 rounded-lg hover:bg-primary/10 text-dark/40 hover:text-primary"><Edit3 size={16} /></button>
                  <button onClick={() => handleDelete(snack.id)} className="p-1.5 rounded-lg hover:bg-pink/10 text-dark/40 hover:text-pink"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
      )}
    </div>
  );
}
