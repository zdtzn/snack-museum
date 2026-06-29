"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, PenLine, Plus, X } from "lucide-react";
import Image from "next/image";

interface CityData {
  name: string;
  wechat: string;
  phone?: string;
  image?: string;
}
interface ProvinceData {
  name: string;
  cities: CityData[];
}
interface CustomerServiceData {
  provinces: ProvinceData[];
}

export function CustomerEditor() {
  const [data, setData] = useState<CustomerServiceData | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    fetch("/api/customer-service").then(r => r.json()).then(setData);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    await fetch("/api/customer-service", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setEditing(false);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fd = new FormData(); fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    return json.url || "";
  };

  if (!data) return <p className="p-8 text-center text-dark/40">加载中...</p>;

  const inp = "w-full px-3 py-2 bg-white border border-primary/20 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/30";
  const provinces = data.provinces || [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold gradient-text">💬 客服微信管理</h2>
        <div className="flex gap-3">
          {editing ? (
            <>
              <button onClick={() => { setEditing(false); load(); }} className="px-4 py-2 text-sm font-bold text-dark/50 hover:text-dark rounded-xl border border-dark/10">取消</button>
              <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105 disabled:opacity-50">
                <Save size={16} />{saving ? "保存中..." : "保存全部"}
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105">
              <PenLine size={16} />编辑
            </button>
          )}
        </div>
      </div>

      {provinces.map((p: ProvinceData, pi: number) => (
        <div key={pi} className="glass p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            {editing ? (
              <input className={`${inp} w-32 font-bold`} value={p.name} onChange={e => {
                const np = [...provinces]; np[pi] = { ...np[pi], name: e.target.value }; setData({ provinces: np });
              }} />
            ) : (
              <h4 className="text-base font-extrabold text-dark">{p.name}</h4>
            )}
            {editing && (
              <button onClick={() => { const np = [...provinces]; np.splice(pi, 1); setData({ provinces: np }); }}
                className="text-pink/50 hover:text-pink" aria-label="删除省份"><X size={14} /></button>
            )}
          </div>

          {/* 城市列表 */}
          <div className="space-y-3">
            {(p.cities || []).map((c: CityData, ci: number) => (
              <div key={ci} className="flex items-start gap-3 p-2 bg-white/40 rounded-lg">
                {/* 微信二维码图片 */}
                <label className="w-12 h-12 rounded-lg bg-white/50 border border-dashed border-primary/30 flex items-center justify-center shrink-0 cursor-pointer hover:bg-primary/5 relative overflow-hidden">
                  {c.image ? (
                    <Image src={c.image} alt={`${c.name}客服微信二维码`} fill sizes="48px" className="object-cover" unoptimized />
                  ) : (
                    <span className="text-lg" aria-hidden="true">📷</span>
                  )}
                  {editing && <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={async (e) => {
                    const file = e.target.files?.[0]; if (!file) return;
                    const url = await uploadImage(file);
                    if (url) { const np = [...provinces]; np[pi].cities[ci] = { ...np[pi].cities[ci], image: url }; setData({ provinces: np }); }
                  }} />}
                </label>
                {/* 城市名 + 微信号 */}
                <div className="flex-1 space-y-1">
                  {editing ? (
                    <>
                      <input className={`${inp}`} value={c.name} placeholder="城市名" onChange={e => { const np = [...provinces]; np[pi].cities[ci] = { ...np[pi].cities[ci], name: e.target.value }; setData({ provinces: np }); }} />
                      <input className={`${inp}`} value={c.wechat} placeholder="微信号" onChange={e => { const np = [...provinces]; np[pi].cities[ci] = { ...np[pi].cities[ci], wechat: e.target.value }; setData({ provinces: np }); }} />
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-dark">{c.name}</p>
                      <p className="text-xs text-green font-medium">{c.wechat}</p>
                    </>
                  )}
                </div>
                {editing && (
                  <button onClick={() => { const np = [...provinces]; np[pi] = { ...np[pi], cities: np[pi].cities.filter((_, i) => i !== ci) }; setData({ provinces: np }); }}
                    className="text-pink/50 hover:text-pink shrink-0" aria-label="删除城市"><X size={14} /></button>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <button onClick={() => { const np = [...provinces]; np[pi] = { ...np[pi], cities: [...np[pi].cities, { name: "新城市", wechat: "kefu_new", image: "" }] }; setData({ provinces: np }); }}
              className="mt-3 text-xs font-bold text-primary hover:text-accent flex items-center gap-1"><Plus size={12} />新增城市</button>
          )}
        </div>
      ))}

      {editing && (
        <>
          <button onClick={() => { const np = [...provinces]; np.push({ name: "新省份", cities: [{ name: "省会", wechat: "kefu_new", image: "" }] }); setData({ provinces: np }); }}
            className="mt-2 text-sm font-bold text-primary hover:text-accent flex items-center gap-1"><Plus size={16} />新增省份</button>
          <div className="text-center pt-6">
            <button onClick={save} disabled={saving} className="px-10 py-3.5 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-105 text-lg transition-all disabled:opacity-50">💾 保存全部修改</button>
          </div>
        </>
      )}
    </div>
  );
}
