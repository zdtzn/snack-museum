"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "首页" },
    { href: "/leaderboard", label: "好物精选" },
    { href: "/about", label: "关于我们" },
    { href: "/random", label: "今天吃什么 🎲" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-heavy border-b border-white/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold tracking-tight flex items-center gap-2">
          <span className="text-2xl">🍿</span>
          <span className="gradient-text">鑫安好物优选</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-dark/60 hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <button onClick={() => setOpen(!open)} className="sm:hidden text-dark/60 p-2 relative z-50">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 移动端菜单 */}
      {open && (
        <div className="sm:hidden glass-heavy border-t border-white/30 px-4 py-4">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-dark/70 hover:text-primary transition-colors text-base font-medium py-1"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
