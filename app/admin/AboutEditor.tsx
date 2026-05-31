"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Upload } from "lucide-react";

export function AboutEditor() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/about").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMsg(res.ok ? "✅ 已保存" : "❌ 保存失败");
    setTimeout(() => setMsg(""), 2000);
  };

  const update = (section: string, field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  if (!data) return <p className="p-8 text-dark/40">加载中...</p>;

  const inputClass = "w-full px-3 py-2 bg-white/70 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
  const labelClass = "block text-sm font-bold text-dark/60 mb-1";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold gradient-text">编辑关于我们</h2>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105 disabled:opacity-50">
          <Save size={16} />{saving ? "保存中..." : "保存全部"}
        </button>
      </div>
      {msg && <p className="text-center text-sm font-bold mb-4 text-green">{msg}</p>}

      {/* 关于我们 */}
      <Section title="📖 关于我们">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><label className={labelClass}>标题</label>
            <input className={inputClass} value={data.aboutUs?.title || ""} onChange={(e) => update("aboutUs", "title", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={labelClass}>副标题</label>
            <input className={inputClass} value={data.aboutUs?.subtitle || ""} onChange={(e) => update("aboutUs", "subtitle", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={labelClass}>正文</label>
            <textarea rows={3} className={inputClass} value={data.aboutUs?.content || ""} onChange={(e) => update("aboutUs", "content", e.target.value)} /></div>
          {(data.aboutUs?.stats || []).map((s: any, i: number) => (
            <div key={i}><label className={labelClass}>数据卡片 {i+1}</label>
              <input className={inputClass} value={`${s.icon} ${s.num} ${s.label}`} onChange={(e) => {
                const parts = e.target.value.split(" ");
                const stats = [...data.aboutUs.stats];
                stats[i] = { icon: parts[0] || "", num: parts[1] || "", label: parts.slice(2).join(" ") || "" };
                update("aboutUs", "stats", stats);
              }} />
            </div>
          ))}
        </div>
      </Section>

      {/* 品牌 */}
      <Section title="🏆 王牌产品">
        <div className="grid grid-cols-2 gap-3">
          {(data.brands?.items || []).map((b: any, i: number) => (
            <div key={i} className="glass p-3">
              <div className="flex gap-2 mb-1">
                <input className={`${inputClass} flex-1 text-xs`} placeholder="Emoji" value={b.emoji || ""} onChange={(e) => { const items = [...data.brands.items]; items[i].emoji = e.target.value; update("brands", "items", items); }} />
                <input className={`${inputClass} flex-1 text-xs`} placeholder="名称" value={b.name} onChange={(e) => { const items = [...data.brands.items]; items[i].name = e.target.value; update("brands", "items", items); }} />
              </div>
              <input className={`${inputClass} text-xs`} placeholder="描述" value={b.desc} onChange={(e) => { const items = [...data.brands.items]; items[i].desc = e.target.value; update("brands", "items", items); }} />
            </div>
          ))}
        </div>
      </Section>

      {/* 店铺 */}
      <Section title="📍 店铺地址">
        {(data.stores?.addresses || []).map((a: any, i: number) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className={`${inputClass} w-32`} placeholder="名称" value={a.label} onChange={(e) => { const addrs = [...data.stores.addresses]; addrs[i].label = e.target.value; update("stores", "addresses", addrs); }} />
            <input className={`${inputClass} flex-1`} placeholder="地址" value={a.addr} onChange={(e) => { const addrs = [...data.stores.addresses]; addrs[i].addr = e.target.value; update("stores", "addresses", addrs); }} />
          </div>
        ))}
        <div className="text-xs text-dark/40">电话：{(data.stores?.phones || []).join(" / ")}</div>
      </Section>

      {/* 合作优势 */}
      <Section title="🤝 合作优势">
        {(data.cooperation?.advantages || []).map((text: string, i: number) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className={`${inputClass} flex-1`} value={text} onChange={(e) => { const adv = [...data.cooperation.advantages]; adv[i] = e.target.value; update("cooperation", "advantages", adv); }} />
          </div>
        ))}
        <label className={labelClass}>合作流程（逗号分隔）</label>
        <input className={inputClass} value={(data.cooperation?.processSteps || []).join("，")} onChange={(e) => { update("cooperation", "processSteps", e.target.value.split("，").map((s: string) => s.trim()).filter(Boolean)); }} />
      </Section>

      {/* 客户评价 */}
      <Section title="💬 客户评价">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(data.testimonials?.items || []).map((t: any, i: number) => (
            <div key={i} className="glass p-3">
              <textarea rows={2} className={`${inputClass} text-xs`} value={t.text} onChange={(e) => { const items = [...data.testimonials.items]; items[i].text = e.target.value; update("testimonials", "items", items); }} />
              <div className="flex gap-2 mt-1">
                <input className={`${inputClass} flex-1 text-xs`} placeholder="名字" value={t.name} onChange={(e) => { const items = [...data.testimonials.items]; items[i].name = e.target.value; update("testimonials", "items", items); }} />
                <input className={`${inputClass} flex-1 text-xs`} placeholder="角色" value={t.role} onChange={(e) => { const items = [...data.testimonials.items]; items[i].role = e.target.value; update("testimonials", "items", items); }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="text-center pt-6">
        <button onClick={save} className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105">💾 保存全部修改</button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass p-5 mb-6">
      <h3 className="text-base font-extrabold text-dark mb-4">{title}</h3>
      {children}
    </div>
  );
}
