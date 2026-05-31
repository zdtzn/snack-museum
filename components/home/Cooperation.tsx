export function Cooperation() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-primary/5">
      <div className="text-center mb-10">
        <p className="text-sm font-bold text-primary tracking-widest uppercase mb-2">COOPERATION</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">和我们合作的优势</h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {[
            "30年老店，品质有保障，不跑路",
            "一手货源，价格有竞争力",
            "100+品牌可选，一站式配齐",
            "支持小批量拿货，新手也能起步",
            "提供选品建议，帮你挑利润最高的款",
            "商超/社区团购/线上平台/零食店，全渠道供货",
          ].map((text, i) => (
            <div key={i} className="glass p-4 flex items-center gap-3 card-hover">
              <span className="text-lg shrink-0">✅</span>
              <span className="text-sm text-dark/70">{text}</span>
            </div>
          ))}
        </div>

        <div className="glass p-6 text-center">
          <p className="text-xs font-bold text-primary mb-4 uppercase tracking-widest">合作流程</p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm font-bold text-dark">
            <span className="glass px-4 py-2 rounded-full">📋 选品咨询</span>
            <span className="text-primary text-lg">→</span>
            <span className="glass px-4 py-2 rounded-full">📦 确认数量</span>
            <span className="text-primary text-lg">→</span>
            <span className="glass px-4 py-2 rounded-full">💰 下单付款</span>
            <span className="text-primary text-lg">→</span>
            <span className="glass px-4 py-2 rounded-full bg-primary/10 border-primary/20">🚚 当天/次日发货</span>
          </div>
        </div>
      </div>
    </section>
  );
}
