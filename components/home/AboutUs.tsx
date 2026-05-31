export function AboutUs() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-sm font-bold text-primary tracking-widest uppercase mb-2">ABOUT US</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">30年食品批发老店 · 鑫安好物优选</h2>
        <p className="text-dark/40 text-sm">始于1996，现扎根临沂中国国际食品城</p>
      </div>

      <div className="glass p-6 sm:p-10 max-w-3xl mx-auto text-center mb-10">
        <p className="text-dark/70 leading-relaxed text-sm sm:text-base">
          创立于1996年，坐落于山东省临沂市兰山区中国国际食品城。<br />
          30年专注食品批发，从小档口成长为多店铺、多品牌的综合食品供应链企业。<br />
          我们相信：<strong>好零食不需要贵，但一定要好吃、安全、有利润空间。</strong>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: "🏪", num: "多家", label: "实体店铺" },
          { icon: "📦", num: "30年", label: "行业经验" },
          { icon: "🤝", num: "1000+", label: "合作客户" },
          { icon: "⭐", num: "100+", label: "合作品牌" },
        ].map((item, i) => (
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
