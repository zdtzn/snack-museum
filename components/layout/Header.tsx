import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass-heavy border-b border-white/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight flex items-center gap-2"
        >
          <span className="text-2xl">🍿</span>
          <span className="gradient-text">鑫安好物优选</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-dark/60 hover:text-primary transition-colors"
          >
            首页
          </Link>
          <Link
            href="/leaderboard"
            className="text-dark/60 hover:text-pink transition-colors"
          >
            好物精选
          </Link>
          <Link
            href="/about"
            className="text-dark/60 hover:text-primary transition-colors"
          >
            关于我们
          </Link>
          <Link
            href="/random"
            className="text-dark/60 hover:text-accent transition-colors"
          >
            今天吃什么 🎲
          </Link>
        </nav>

        {/* 移动端汉堡菜单占位 */}
        <button className="sm:hidden text-dark/60 p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
