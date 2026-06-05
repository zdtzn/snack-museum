"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, PenLine, X } from "lucide-react";

export function AboutEditor() {
  const [data, setData] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/about").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/about", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setEditing(false);
    setMsg("✅ 已保存");
    setTimeout(() => setMsg(""), 2000);
  };

  const update = (section: string, field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const input = "w-full px-3 py-2 bg-white border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
  const lbl = "block text-sm font-bold text-dark/60 mb-1";

  // 图片上传
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]; if (!file) return;
    const fd = new FormData(); fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (json.url) {
      const items = [...(data.brands?.items || [])];
      items[index] = { ...items[index], image: json.url };
      update("brands", "items", items);
    }
  };

  if (!data) return <p className="p-8 text-center text-dark/40">加载中...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 顶部 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold gradient-text">关于我们</h2>
        <div className="flex gap-3">
          {editing ? (
            <>
              <button onClick={() => { setEditing(false); fetch("/api/about").then(r=>r.json()).then(setData); }}
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

      {/* ======== 关于我们 ======== */}
      <Block title="📖 关于我们">
        {editing ? (
          <>
            <div className="mb-2"><label className={lbl}>标题</label><input className={input} value={data.aboutUs?.title||""} onChange={e=>update("aboutUs","title",e.target.value)} /></div>
            <div className="mb-2"><label className={lbl}>副标题</label><input className={input} value={data.aboutUs?.subtitle||""} onChange={e=>update("aboutUs","subtitle",e.target.value)} /></div>
            <div className="mb-2"><label className={lbl}>正文</label><textarea rows={3} className={input} value={data.aboutUs?.content||""} onChange={e=>update("aboutUs","content",e.target.value)} /></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(data.aboutUs?.stats||[]).map((s:any,i:number)=>(
                <div key={i} className="text-center">
                  <input className={`${input} text-center`} placeholder="Emoji" value={s.icon} onChange={e=>{const st=[...data.aboutUs.stats];st[i].icon=e.target.value;update("aboutUs","stats",st)}} />
                  <input className={`${input} text-center mt-1`} placeholder="数字" value={s.num} onChange={e=>{const st=[...data.aboutUs.stats];st[i].num=e.target.value;update("aboutUs","stats",st)}} />
                  <input className={`${input} text-center mt-1`} placeholder="标签" value={s.label} onChange={e=>{const st=[...data.aboutUs.stats];st[i].label=e.target.value;update("aboutUs","stats",st)}} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h3 className="text-lg font-extrabold gradient-text">{data.aboutUs?.title}</h3>
            <p className="text-xs text-dark/40">{data.aboutUs?.subtitle}</p>
            <p className="text-sm text-dark/70 mt-2">{data.aboutUs?.content}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
              {(data.aboutUs?.stats||[]).map((s:any,i:number)=>(
                <div key={i} className="text-center"><p className="text-xl">{s.icon}</p><p className="font-extrabold gradient-text">{s.num}</p><p className="text-xs text-dark/40">{s.label}</p></div>
              ))}
            </div>
          </div>
        )}
      </Block>

      {/* ======== 王牌产品 ======== */}
      <Block title="🏆 王牌产品线">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(data.brands?.items||[]).map((b:any,i:number)=>(
            <div key={i} className="glass p-3">
              {editing ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="w-16 h-16 rounded-xl bg-white/50 border border-dashed border-primary/30 flex items-center justify-center text-2xl cursor-pointer hover:bg-primary/5 shrink-0 relative overflow-hidden">
                      {b.image ? <img src={b.image} alt="" className="w-full h-full object-cover" /> : <span>🖼️</span>}
                      <input type="file" accept="image/*" onChange={(e)=>handleImageUpload(e,i)} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </label>
                    <div className="flex-1">
                      <input className={`${input} text-xs mb-1`} value={b.emoji||""} placeholder="Emoji" onChange={e=>{const it=[...data.brands.items];it[i].emoji=e.target.value;update("brands","items",it)}} />
                      <input className={`${input} text-xs mb-1`} value={b.name} placeholder="名称" onChange={e=>{const it=[...data.brands.items];it[i].name=e.target.value;update("brands","items",it)}} />
                      <input className={`${input} text-xs`} value={b.desc} placeholder="一句话卖点" onChange={e=>{const it=[...data.brands.items];it[i].desc=e.target.value;update("brands","items",it)}} />
                    </div>
                    <button onClick={()=>{const it=[...data.brands.items];it.splice(i,1);update("brands","items",it)}} className="text-pink/50 hover:text-pink"><X size={14}/></button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  {b.image ? <img src={b.image} alt="" className="w-10 h-10 rounded-lg object-cover" /> : <span className="text-2xl">{b.emoji||"🍪"}</span>}
                  <div>
                    <div className="flex items-center gap-1"><span className="font-extrabold text-dark text-sm">{b.name}</span>{b.highlight&&<span className="text-[10px] bg-primary/15 text-primary font-bold px-1 rounded-full">爆款</span>}</div>
                    <p className="text-xs text-dark/50">{b.desc}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {editing && (
          <button onClick={()=>{const it=[...data.brands.items||[]];it.push({name:"新品",desc:"卖点描述",emoji:"🍪",highlight:false,image:""});update("brands","items",it)}}
            className="mt-3 flex items-center gap-1 text-xs font-bold text-primary hover:text-accent"><Plus size={14}/>新增品牌</button>
        )}
      </Block>

      {/* ======== 店铺地址 ======== */}
      <Block title="📍 店铺地址">
        {(data.stores?.addresses||[]).map((a:any,i:number)=>(
          <div key={i} className="mb-2">
            {editing ? (
              <div className="flex gap-2">
                <input className={`${input} w-32`} value={a.label} placeholder="名称" onChange={e=>{const ad=[...data.stores.addresses];ad[i].label=e.target.value;update("stores","addresses",ad)}} />
                <input className={`${input} flex-1`} value={a.addr} placeholder="地址" onChange={e=>{const ad=[...data.stores.addresses];ad[i].addr=e.target.value;update("stores","addresses",ad)}} />
                {editing&&<button onClick={()=>{const ad=[...data.stores.addresses];ad.splice(i,1);update("stores","addresses",ad)}} className="text-pink/50 hover:text-pink"><X size={14}/></button>}
              </div>
            ) : (
              <p className="text-sm"><span className="font-bold text-primary">{a.label}</span> · {a.addr}</p>
            )}
          </div>
        ))}
        {editing && <button onClick={()=>{const ad=[...data.stores.addresses||[]];ad.push({label:"新店",addr:""});update("stores","addresses",ad)}} className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1"><Plus size={14}/>新增地址</button>}
        <p className="text-xs text-dark/40 mt-2">📞 电话：{(data.stores?.phones||[]).join(" / ")}</p>
      </Block>

      {/* ======== 合作优势 ======== */}
      <Block title="🤝 合作优势">
        {(data.cooperation?.advantages||[]).map((text:string,i:number)=>(
          <div key={i} className="flex gap-2 mb-2">
            <input className={`${input} flex-1`} value={text} readOnly={!editing} onChange={e=>{const ad=[...data.cooperation.advantages];ad[i]=e.target.value;update("cooperation","advantages",ad)}} />
            {editing&&<button onClick={()=>{const ad=[...data.cooperation.advantages];ad.splice(i,1);update("cooperation","advantages",ad)}} className="text-pink/50 hover:text-pink"><X size={14}/></button>}
          </div>
        ))}
        {editing && <button onClick={()=>{const ad=[...data.cooperation.advantages||[]];ad.push("新优势");update("cooperation","advantages",ad)}} className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1"><Plus size={14}/>新增优势</button>}
        <label className={`${lbl} mt-3`}>合作流程（逗号分隔）</label>
        <input className={input} value={(data.cooperation?.processSteps||[]).join("，")} readOnly={!editing} onChange={e=>update("cooperation","processSteps",e.target.value.split("，").map((s:string)=>s.trim()).filter(Boolean))} />
      </Block>

      {/* ======== 客户评价 ======== */}
      <Block title="💬 客户评价">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(data.testimonials?.items||[]).map((t:any,i:number)=>(
            <div key={i} className="glass p-3">
              <textarea rows={2} className={`${input} text-xs`} value={t.text} readOnly={!editing} onChange={e=>{const it=[...data.testimonials.items];it[i].text=e.target.value;update("testimonials","items",it)}} />
              <div className="flex gap-2 mt-1">
                <input className={`${input} flex-1 text-xs`} value={t.name} readOnly={!editing} placeholder="名字" onChange={e=>{const it=[...data.testimonials.items];it[i].name=e.target.value;update("testimonials","items",it)}} />
                <input className={`${input} flex-1 text-xs`} value={t.role} readOnly={!editing} placeholder="角色" onChange={e=>{const it=[...data.testimonials.items];it[i].role=e.target.value;update("testimonials","items",it)}} />
                {editing&&<button onClick={()=>{const it=[...data.testimonials.items];it.splice(i,1);update("testimonials","items",it)}} className="text-pink/50 hover:text-pink"><X size={14}/></button>}
              </div>
            </div>
          ))}
        </div>
        {editing && (
          <button onClick={()=>{const it=[...data.testimonials.items||[]];it.push({text:"评价内容",name:"姓名",role:"身份"});update("testimonials","items",it)}}
            className="mt-3 flex items-center gap-1 text-xs font-bold text-primary hover:text-accent"><Plus size={14}/>新增评价</button>
        )}
      </Block>

      {/* 底部保存 */}
      {editing && (
        <div className="text-center pt-4 pb-8">
          <button onClick={save} disabled={saving}
            className="px-10 py-3.5 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-105 text-lg transition-all disabled:opacity-50">
            💾 保存全部修改
          </button>
        </div>
      )}
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="glass p-5 mb-6"><h3 className="text-base font-extrabold text-dark mb-4">{title}</h3>{children}</div>;
}
