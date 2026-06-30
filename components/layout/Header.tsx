"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "首页" },
    { href: "/leaderboard", label: "热榜" },
    { href: "/test", label: "测试" },
    { href: "/about", label: "关于" },
    { href: "/random", label: "随机推荐" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-black tracking-tight text-dark">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-dark text-base text-white shadow-sm">
            零
          </span>
          <span className="gradient-text">鑫安零食博物馆</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-dark/60 transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full border border-dark/10 bg-white px-3 py-2 text-dark/70 transition hover:text-dark sm:hidden"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/60 bg-white/92 px-4 py-3 sm:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-2 text-sm font-medium text-dark/70 hover:bg-primary/8 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
