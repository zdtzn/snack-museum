export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFEAA7] via-[#FFD08A] to-accent/30 pt-12 pb-16 px-4">
      <div className="absolute top-10 left-10 w-24 h-24 bg-pink/10 rounded-full blur-2xl" />
      <div className="absolute bottom-5 right-20 w-32 h-32 bg-primary/15 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <p className="text-sm font-bold tracking-widest uppercase text-dark/40 mb-4">
          🛒 精选好物 · 品质生活
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          <span className="gradient-text">鑫安好物优选</span>
        </h1>
        <p className="text-lg sm:text-xl text-dark/50 max-w-2xl mx-auto mb-8 leading-relaxed">
          精选每一款零食，为你找到值得品尝的好味道
        </p>

        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-customer-service"))}
            className="inline-flex items-center gap-2 px-5 py-3 bg-white/80 text-dark font-bold rounded-full
              shadow-lg shadow-primary/10 hover:shadow-xl hover:scale-105 transition-all text-sm border border-green/30"
          >
            💬 联系微信
          </button>
        </div>
      </div>

      <div className="wave-divider mt-12" />
    </section>
  );
}
