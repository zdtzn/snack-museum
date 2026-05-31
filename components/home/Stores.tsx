"use client";

import { useEffect, useState } from "react";

export function Stores() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch("/api/about").then(r=>r.json()).then(d=>setData(d.stores)); }, []);
  if (!data) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10"><h2 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">{data.title}</h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {data.addresses.map((s:any,i:number)=>(
          <div key={i} className="glass p-5 text-center card-hover"><p className="text-2xl mb-2">📍</p><p className="text-xs font-bold text-primary mb-1">{s.label}</p><p className="text-sm text-dark/60">{s.addr}</p></div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {data.phones.map((p:string,i:number)=>(
          <a key={i} href={`tel:${p}`} className="glass p-4 flex items-center justify-center gap-3 card-hover"><span className="text-xl">📞</span><div><p className="text-xs text-dark/40">电话</p><p className="text-sm font-extrabold text-dark">{p}</p></div></a>
        ))}
        <button onClick={()=>window.dispatchEvent(new CustomEvent("open-customer-service"))} className="glass p-4 flex items-center justify-center gap-3 card-hover"><span className="text-xl">💬</span><div><p className="text-xs text-dark/40">微信</p><p className="text-sm font-extrabold text-dark">选地区加客服</p></div></button>
      </div>
    </section>
  );
}
