import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-orange-100 py-10" style={{ background: '#fdf8f0' }}>
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:gap-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-stone-900">
            ENACT <span className="text-orange-500">AI</span>
          </span>
          <span className="text-stone-400 text-sm ml-2">
            © {new Date().getFullYear()}
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <span className="text-stone-400">Contact:</span>
          <Link
            href="mailto:jatin02kr@gmail.com"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            jatin02kr@gmail.com
          </Link>
          <Link
            href="/privacy"
            className="text-stone-400 transition-colors hover:text-stone-900"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
