export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/70 bg-white/45">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center">
        <p className="text-sm font-semibold text-dark/55">鑫安零食博物馆</p>
        <p className="mt-1 text-xs text-dark/35">精选零食 · 品质生活</p>
        <p className="mt-2 text-xs text-dark/25">© {new Date().getFullYear()} 鑫安零食博物馆</p>
      </div>
    </footer>
  );
}
