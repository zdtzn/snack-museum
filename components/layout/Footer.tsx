export function Footer() {
  return (
    <footer className="border-t border-primary/10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-2xl mb-2">🛒</p>
        <p className="text-sm text-dark/40 font-medium">
          鑫安好物优选
        </p>
        <p className="text-xs text-dark/30 mt-1">
          精选好物 · 品质生活
        </p>
        <p className="text-xs text-dark/25 mt-2">
          © {new Date().getFullYear()} 鑫安好物优选
        </p>
      </div>
    </footer>
  );
}
