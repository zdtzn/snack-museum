"use client";

import { useAboutData } from "@/lib/useAboutData";

export function Testimonials() {
  const data = useAboutData("testimonials");
  if (!data) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10"><h2 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">{data.title}</h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.items.map((item,i)=>(
          <div key={i} className="glass p-5 card-hover">
            <p className="text-3xl mb-3" aria-hidden="true">💬</p>
            <p className="text-sm text-dark/70 leading-relaxed mb-4 italic">&ldquo;{item.text}&rdquo;</p>
            <div className="flex items-center gap-3 border-t border-primary/10 pt-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold" aria-hidden="true">{item.name?.[0] || "?"}</div>
              <div><p className="text-sm font-bold text-dark">{item.name}</p><p className="text-xs text-dark/40">{item.role}</p></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
