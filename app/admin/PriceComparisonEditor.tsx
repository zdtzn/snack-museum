"use client";

import { useState, useEffect } from "react";
import { Save, PenLine, Upload } from "lucide-react";

export function PriceComparisonEditor() {
  const [data, setData] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/price-comparison").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/price-comparison", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setEditing(false);
    setMsg("✅ 价格对比已保存");
    setTimeout(() => setMsg(""), 2000);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    return json.url || "";
  };

  if (!data) return <p className="p-8 text-center text-dark/40">加载中...</p>;

  const inp = "w-full px-3 py-2 bg-white border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
  const lbl = "block text-sm font-bold text-dark/60 mb-1";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold gradient-text">💰 价格对比模块</h2>
        <div className="flex gap-3">
          {editing ? (
            <>
              <button onClick={() => { setEditing(false); fetch("/api/price-comparison").then(r => r.json()).then(setData); }}
                className="px-4 py-2 text-sm font-bold text-dark/50 hover:text-dark rounded-xl border border-dark/10">取消</button>
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
      {msg && <p className="text-center text-sm font-bold mb-4 text-green">{msg}</p>}

      {/* 左右双栏对比布局 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* ===== 左侧：超市零售 ===== */}
        <div className="glass p-5 border-2 border-zinc-200">
          <h3 className="text-sm font-extrabold text-zinc-600 mb-4">🛍️ 左侧 — 超市零售</h3>

          <label className={lbl}>背景图片</label>
          <ImageUploader
            currentUrl={data.leftImage}
            editing={editing}
            onUpload={async (file) => {
              const url = await uploadImage(file);
              if (url) setData({ ...data, leftImage: url });
            }}
          />

          <label className={`${lbl} mt-3`}>标题</label>
          <input className={inp} value={data.leftTitle || ""} readOnly={!editing}
            onChange={e => setData({ ...data, leftTitle: e.target.value })} />

          <label className={`${lbl} mt-3`}>描述</label>
          <input className={inp} value={data.leftDesc || ""} readOnly={!editing}
            onChange={e => setData({ ...data, leftDesc: e.target.value })} />

          <label className={`${lbl} mt-3`}>大号标语（如&quot;就几包...&quot;）</label>
          <input className={inp} value={data.leftBadge || ""} readOnly={!editing}
            onChange={e => setData({ ...data, leftBadge: e.target.value })} />

          <label className={`${lbl} mt-3`}>价格标签</label>
          <input className={inp} value={data.leftPriceLabel || ""} readOnly={!editing}
            onChange={e => setData({ ...data, leftPriceLabel: e.target.value })} />

          <label className={`${lbl} mt-3`}>价格结果</label>
          <input className={inp} value={data.leftPriceValue || ""} readOnly={!editing}
            onChange={e => setData({ ...data, leftPriceValue: e.target.value })} />
        </div>

        {/* ===== 右侧：鑫安批发 ===== */}
        <div className="glass p-5 border-2 border-amber-200">
          <h3 className="text-sm font-extrabold text-amber-700 mb-4">📦 右侧 — 鑫安批发</h3>

          <label className={lbl}>背景图片</label>
          <ImageUploader
            currentUrl={data.rightImage}
            editing={editing}
            onUpload={async (file) => {
              const url = await uploadImage(file);
              if (url) setData({ ...data, rightImage: url });
            }}
          />

          <label className={`${lbl} mt-3`}>标题</label>
          <input className={inp} value={data.rightTitle || ""} readOnly={!editing}
            onChange={e => setData({ ...data, rightTitle: e.target.value })} />

          <label className={`${lbl} mt-3`}>描述</label>
          <input className={inp} value={data.rightDesc || ""} readOnly={!editing}
            onChange={e => setData({ ...data, rightDesc: e.target.value })} />

          <label className={`${lbl} mt-3`}>大号标语（如&quot;一整箱！&quot;）</label>
          <input className={inp} value={data.rightBadge || ""} readOnly={!editing}
            onChange={e => setData({ ...data, rightBadge: e.target.value })} />

          <label className={`${lbl} mt-3`}>价格标签</label>
          <input className={inp} value={data.rightPriceLabel || ""} readOnly={!editing}
            onChange={e => setData({ ...data, rightPriceLabel: e.target.value })} />

          <label className={`${lbl} mt-3`}>价格结果</label>
          <input className={inp} value={data.rightPriceValue || ""} readOnly={!editing}
            onChange={e => setData({ ...data, rightPriceValue: e.target.value })} />
        </div>
      </div>

      {/* 底部 CTA 文案 */}
      <div className="glass p-5 mt-6">
        <h3 className="text-sm font-extrabold text-dark/60 mb-4">🔘 底部 CTA 按钮</h3>
        <label className={lbl}>按钮文案</label>
        <input className={inp} value={data.ctaText || ""} readOnly={!editing}
          onChange={e => setData({ ...data, ctaText: e.target.value })} />
        <label className={`${lbl} mt-3`}>按钮下方小字</label>
        <input className={inp} value={data.ctaSub || ""} readOnly={!editing}
          onChange={e => setData({ ...data, ctaSub: e.target.value })} />
      </div>

      {/* 底部保存按钮 */}
      {editing && (
        <div className="text-center pt-6 pb-8">
          <button onClick={save} disabled={saving}
            className="px-10 py-3.5 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-105 text-lg transition-all disabled:opacity-50">
            💾 保存全部修改
          </button>
        </div>
      )}

      {/* 预览 */}
      {!editing && (
        <div className="mt-8 glass p-5">
          <h3 className="text-sm font-extrabold text-dark/60 mb-4">👁 前端预览效果</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-40 rounded-xl overflow-hidden bg-zinc-700 flex items-center justify-center text-white font-bold">
              {data.leftImage ? (
                <img src={data.leftImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : null}
              <span className="relative z-10 text-3xl">{data.leftBadge}</span>
            </div>
            <div className="relative h-40 rounded-xl overflow-hidden bg-amber-500 flex items-center justify-center text-white font-bold">
              {data.rightImage ? (
                <img src={data.rightImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : null}
              <span className="relative z-10 text-3xl">{data.rightBadge}</span>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm font-bold bg-dark text-white inline-block px-6 py-2 rounded-xl">{data.ctaText}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/** 图片上传小组件 */
function ImageUploader({
  currentUrl,
  editing,
  onUpload,
}: {
  currentUrl: string;
  editing: boolean;
  onUpload: (file: File) => void;
}) {
  return (
    <label className="flex items-center gap-3 p-3 bg-white/50 border border-dashed border-primary/30 rounded-lg cursor-pointer hover:bg-primary/5">
      {currentUrl ? (
        <img src={currentUrl} alt="" className="w-16 h-16 rounded-lg object-cover" />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center text-2xl">🖼️</div>
      )}
      <div>
        <p className="text-xs font-bold text-dark">{currentUrl ? "点击更换图片" : "点击上传图片"}</p>
        {currentUrl && <p className="text-[10px] text-dark/30 truncate max-w-[200px]">{currentUrl}</p>}
      </div>
      {editing && (
        <input
          type="file" accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
          }}
        />
      )}
    </label>
  );
}
