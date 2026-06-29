"use client";

import { useAboutData } from "@/lib/useAboutData";

export function Brands() {
  const data = useAboutData("brands");
  if (!data) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-primary/5">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">{data.title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.items.map((b, i) => (
          <div key={i} className={`glass p-5 card-hover flex items-start gap-4 ${b.highlight ? "border-2 border-primary/30" : ""}`}>
            <div className="text-4xl shrink-0" aria-hidden="true">{b.emoji || "🍪"}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-extrabold text-dark text-sm">{b.name}</h3>
                {b.highlight && <span className="text-[10px] bg-primary/15 text-primary font-bold px-1.5 py-0.5 rounded-full">爆款</span>}
              </div>
              <p className="text-xs text-dark/50">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
