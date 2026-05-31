export function Stores() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-sm font-bold text-primary tracking-widest uppercase mb-2">VISIT US</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">欢迎到店选品</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "旗舰店", addr: "中国食品城西区9栋107号" },
          { label: "东区大卖场", addr: "主力店1-139号" },
          { label: "大卖场3楼", addr: "152-153号" },
        ].map((s, i) => (
          <div key={i} className="glass p-5 text-center card-hover">
            <p className="text-2xl mb-2">📍</p>
            <p className="text-xs font-bold text-primary mb-1">{s.label}</p>
            <p className="text-sm text-dark/60">{s.addr}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a href="tel:15854995666" className="glass p-4 flex items-center justify-center gap-3 card-hover">
          <span className="text-xl">📞</span>
          <div>
            <p className="text-xs text-dark/40">电话</p>
            <p className="text-sm font-extrabold text-dark">15854995666</p>
          </div>
        </a>
        <a href="tel:13869901588" className="glass p-4 flex items-center justify-center gap-3 card-hover">
          <span className="text-xl">📞</span>
          <div>
            <p className="text-xs text-dark/40">电话</p>
            <p className="text-sm font-extrabold text-dark">13869901588</p>
          </div>
        </a>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-customer-service"))}
          className="glass p-4 flex items-center justify-center gap-3 card-hover"
        >
          <span className="text-xl">💬</span>
          <div>
            <p className="text-xs text-dark/40">微信</p>
            <p className="text-sm font-extrabold text-dark">选地区加客服</p>
          </div>
        </button>
      </div>
    </section>
  );
}
