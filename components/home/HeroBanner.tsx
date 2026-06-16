export function HeroBanner() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12 sm:pt-16">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[linear-gradient(135deg,rgba(255,252,247,0.96),rgba(245,222,190,0.7)_55%,rgba(249,238,223,0.2))]" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-xs font-bold tracking-[0.18em] text-primary">
            XIN AN SNACK CURATION
          </p>
          <h1 className="text-4xl font-black leading-[1.06] tracking-tight text-dark sm:text-6xl lg:text-7xl">
            把真正好吃的
            <span className="block gradient-text">零食挑出来</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-dark/60 sm:text-lg">
            鑫安好物优选把口味、口碑和拿货便利度放在一起筛选。少一点踩雷，多一点能反复回购的好味道。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-customer-service"))}
              className="inline-flex items-center justify-center rounded-full bg-dark px-6 py-3 text-sm font-bold text-white shadow-xl shadow-dark/10 transition hover:-translate-y-0.5 hover:bg-dark/90"
            >
              联系微信拿货
            </button>
            <a
              href="#snack-list"
              className="inline-flex items-center justify-center rounded-full border border-dark/10 bg-white/75 px-6 py-3 text-sm font-bold text-dark/70 transition hover:border-primary/30 hover:text-primary"
            >
              先看看精选
            </a>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[
              ["6类", "零食分类"],
              ["4.8+", "口感优选"],
              ["本地", "客服对接"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-dark/10 bg-white/60 px-4 py-3">
                <p className="text-xl font-black text-dark">{value}</p>
                <p className="mt-1 text-xs font-medium text-dark/40">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-4 bottom-0 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-2xl shadow-dark/10 backdrop-blur">
            <div className="rounded-[1.5rem] bg-[#2b2119] p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">today picks</p>
                  <p className="mt-1 text-2xl font-black">今日零食柜</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-primary-light">新鲜补货</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ["🍿", "酥脆膨化", "追剧搭子"],
                  ["🌶", "麻辣小食", "越吃越香"],
                  ["🥤", "清爽饮品", "解腻刚好"],
                  ["🍬", "甜口糖果", "办公室分享"],
                ].map(([emoji, title, desc]) => (
                  <div key={title} className="rounded-2xl bg-white/[0.08] p-4">
                    <p className="text-3xl">{emoji}</p>
                    <p className="mt-3 text-sm font-bold">{title}</p>
                    <p className="mt-1 text-xs text-white/45">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-white px-4 py-3 text-dark">
                <p className="text-xs font-bold text-dark/40">选品逻辑</p>
                <p className="mt-1 text-sm font-bold">好吃、好卖、好联系，三件事一起看。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
