export function Footer() {
  return (
    <footer className="border-t border-primary/10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-2xl mb-2">🍿</p>
        <p className="text-sm text-dark/40 font-medium">
          零食博物馆 · Snack Museum
        </p>
        <p className="text-xs text-dark/30 mt-1">
          Made with ❤️ and lots of snacking
        </p>
        <p className="text-xs text-dark/25 mt-2">
          © {new Date().getFullYear()} Snack Museum. 所有零食测评均为个人主观感受。
        </p>
      </div>
    </footer>
  );
}
