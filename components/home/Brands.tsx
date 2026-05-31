export function Brands() {
  const brands = [
    { name: "乐逍遥果板", desc: "网红大爆款", emoji: "🍬", highlight: true },
    { name: "琅琅脆小鱼小虾", desc: "海味零食，回购率高", emoji: "🦐" },
    { name: "宏途味了你山药薄片", desc: "健康零食赛道爆款", emoji: "🥔" },
    { name: "华统面", desc: "方便速食，利润空间大", emoji: "🍜" },
    { name: "旺娃啤酒豆", desc: "二十多年，童年经典", emoji: "🍺" },
    { name: "穗之杰麻将素毛肚", desc: "素食辣条新势力", emoji: "🌶" },
    { name: "金丝猴爆汁豆干", desc: "老品牌新口味，信任度高", emoji: "🦍" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-primary/5">
      <div className="text-center mb-10">
        <p className="text-sm font-bold text-primary tracking-widest uppercase mb-2">PRODUCTS</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">我们的王牌产品线</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((b, i) => (
          <div
            key={i}
            className={`glass p-5 card-hover flex items-start gap-4 ${
              b.highlight ? "border-2 border-primary/30" : ""
            }`}
          >
            <div className="text-4xl shrink-0">{b.emoji}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-extrabold text-dark text-sm">{b.name}</h3>
                {b.highlight && (
                  <span className="text-[10px] bg-primary/15 text-primary font-bold px-1.5 py-0.5 rounded-full">
                    爆款
                  </span>
                )}
              </div>
              <p className="text-xs text-dark/50">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
