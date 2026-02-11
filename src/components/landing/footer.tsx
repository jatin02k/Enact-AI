import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-soft-sand/50 bg-light-peach py-10">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:gap-0">
        <p className="text-sm font-medium text-warm-gray">
          &copy; {new Date().getFullYear()} Enact AI
        </p>

        <nav className="flex items-center gap-4">
            Contact:
            <Link
              href="mailto:jatin02kr@gmail.com"
              className="text-coral hover:text-coral/80 transition-colors"
            >
              jatin02kr@gmail.com
            </Link>
            
          <Link
            href="/privacy"
            className="text-sm text-warm-gray transition-colors hover:text-deep-brown"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
