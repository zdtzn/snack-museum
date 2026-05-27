export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFEAA7] via-[#FFD08A] to-accent/30 pt-12 pb-16 px-4">
      {/* 装饰圆点 */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-pink/10 rounded-full blur-2xl" />
      <div className="absolute bottom-5 right-20 w-32 h-32 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-green/15 rounded-full blur-2xl" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <p className="text-sm font-bold tracking-widest uppercase text-dark/40 mb-4">
          ✨ 独立零食测评博客
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          <span className="gradient-text">零食博物馆</span>
        </h1>
        <p className="text-lg sm:text-xl text-dark/50 max-w-2xl mx-auto mb-8 leading-relaxed">
          专注小众、地方特色及健康零食的独立测评。
          <br className="hidden sm:block" />
          发现你从未尝过的美味，也帮你避开难吃的坑。
        </p>

        {/* 统计数字 */}
        <div className="flex justify-center gap-6 sm:gap-10">
          <Stat value="12+" label="零食测评" />
          <Stat value="红黑榜" label="良心避雷指南" />
          <Stat value="🎲" label="今天吃什么" />
        </div>

        {/* 漂浮零食 emoji */}
        <div className="absolute left-[5%] top-[20%] text-4xl animate-bounce hidden lg:block">🍪</div>
        <div className="absolute right-[8%] top-[30%] text-3xl animate-pulse hidden lg:block">🍬</div>
        <div className="absolute left-[10%] bottom-[15%] text-3xl animate-bounce hidden lg:block" style={{ animationDelay: "0.5s" }}>🥤</div>
      </div>

      {/* 波浪分割 */}
      <div className="wave-divider mt-12" />
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-extrabold gradient-text">
        {value}
      </div>
      <div className="text-xs text-dark/40 mt-1 font-medium">{label}</div>
    </div>
  );
}
