"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, PenLine, Plus, X } from "lucide-react";

export function CustomerEditor() {
  const [data, setData] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    fetch("/api/customer-service").then(r => r.json()).then(setData);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/customer-service", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setEditing(false);
    load();
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
              <button onClick={save} disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105 disabled:opacity-50">
                <Save size={16} />{saving ? "保存中..." : "保存全部"}
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105">
              <PenLine size={16} />编辑
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {provinces.map((p: any, pi: number) => (
          <div key={pi} className="glass p-4">
            <div className="flex items-center gap-2 mb-3">
              {editing ? (
                <input className={`${inp} w-32 font-bold`} value={p.name} onChange={e => {
                  const newProvinces = [...provinces];
                  newProvinces[pi].name = e.target.value;
                  setData({ provinces: newProvinces });
                }} />
              ) : (
                <h4 className="text-base font-extrabold text-dark">{p.name}</h4>
              )}
              {editing && (
                <button onClick={() => {
                  const newProvinces = [...provinces];
                  newProvinces.splice(pi, 1);
                  setData({ provinces: newProvinces });
                }} className="text-pink/50 hover:text-pink"><X size={14} /></button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {(p.cities || []).map((c: any, ci: number) => (
                <div key={ci} className="flex items-center gap-2">
                  {editing ? (
                    <>
                      <input className={`${inp} w-20`} value={c.name} placeholder="城市" onChange={e => {
                        const np = [...provinces];
                        np[pi].cities[ci].name = e.target.value;
                        setData({ provinces: np });
                      }} />
                      <input className={`${inp} flex-1`} value={c.wechat} placeholder="微信号" onChange={e => {
                        const np = [...provinces];
                        np[pi].cities[ci].wechat = e.target.value;
                        setData({ provinces: np });
                      }} />
                      <button onClick={() => {
                        const np = [...provinces];
                        np[pi].cities.splice(ci, 1);
                        setData({ provinces: np });
                      }} className="text-pink/50 hover:text-pink shrink-0"><X size={12} /></button>
                    </>
                  ) : (
                    <span className="text-xs"><span className="font-bold text-dark">{c.name}</span> <span className="text-dark/40">→</span> <span className="text-green font-medium">{c.wechat}</span></span>
                  )}
                </div>
              ))}
            </div>

            {editing && (
              <button onClick={() => {
                const np = [...provinces];
                np[pi].cities.push({ name: "新城市", wechat: "kefu_new" });
                setData({ provinces: np });
              }} className="mt-2 text-xs font-bold text-primary hover:text-accent flex items-center gap-1">
                <Plus size={12} />新增城市
              </button>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <>
          <button onClick={() => {
            const np = [...provinces];
            np.push({ name: "新省份", cities: [{ name: "省会", wechat: "kefu_new" }] });
            setData({ provinces: np });
          }} className="mt-4 text-sm font-bold text-primary hover:text-accent flex items-center gap-1">
            <Plus size={16} />新增省份
          </button>

          <div className="text-center pt-6">
            <button onClick={save} disabled={saving}
              className="px-10 py-3.5 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-105 text-lg transition-all disabled:opacity-50">
              💾 保存全部修改
            </button>
          </div>
        </>
      )}
    </div>
  );
}
