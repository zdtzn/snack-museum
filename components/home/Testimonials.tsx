export function Testimonials() {
  const list = [
    { text: "合作十多年了，每次补货都很快，价格实在", name: "张总", role: "社区团购团长" },
    { text: "利润最高的几款都是老板推荐的，很懂市场", name: "李总", role: "拼多多店主" },
    { text: "临沂食品城逛了一圈，最后还是选鑫安", name: "王总", role: "连锁便利店" },
    { text: "小批量也能拿货，对我们刚起步的太友好了", name: "刘哥", role: "零食店店主" },
    { text: "发货速度没得说，上午下单下午就出了", name: "赵姐", role: "抖音带货主播" },
    { text: "品种多、价格好，一个档口搞定所有货", name: "陈总", role: "超市采购" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-sm font-bold text-primary tracking-widest uppercase mb-2">TESTIMONIALS</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">他们都在和我们合作</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((item, i) => (
          <div key={i} className="glass p-5 card-hover">
            <p className="text-3xl mb-3">💬</p>
            <p className="text-sm text-dark/70 leading-relaxed mb-4 italic">
              "{item.text}"
            </p>
            <div className="flex items-center gap-3 border-t border-primary/10 pt-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                {item.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-dark">{item.name}</p>
                <p className="text-xs text-dark/40">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
