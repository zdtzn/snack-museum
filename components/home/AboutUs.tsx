import aboutData from "@/data/about-data.json";

export function AboutUs() {
  const d = aboutData.aboutUs;
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">{d.title}</h2>
        <p className="text-dark/40 text-sm">{d.subtitle}</p>
      </div>
      <div className="glass p-6 sm:p-10 max-w-3xl mx-auto text-center mb-10">
        <p className="text-dark/70 leading-relaxed text-sm sm:text-base">{d.content}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {d.stats.map((item, i) => (
          <div key={i} className="glass p-5 text-center card-hover">
            <p className="text-3xl mb-2">{item.icon}</p>
            <p className="text-2xl font-extrabold gradient-text">{item.num}</p>
            <p className="text-xs text-dark/40 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
