import aboutData from "@/data/about-data.json";

export function Cooperation() {
  const d = aboutData.cooperation;
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-primary/5">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">{d.title}</h2>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {d.advantages.map((text, i) => (
            <div key={i} className="glass p-4 flex items-center gap-3 card-hover">
              <span className="text-lg shrink-0">✅</span>
              <span className="text-sm text-dark/70">{text}</span>
            </div>
          ))}
        </div>
        <div className="glass p-6 text-center">
          <p className="text-xs font-bold text-primary mb-4 uppercase tracking-widest">合作流程</p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm font-bold text-dark">
            {d.processSteps.map((step, i) => (
              <span key={i}>
                {i > 0 && <span className="text-primary text-lg mx-1">→</span>}
                <span className={`glass px-4 py-2 rounded-full ${i === d.processSteps.length - 1 ? "bg-primary/10 border-primary/20" : ""}`}>
                  {step}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
