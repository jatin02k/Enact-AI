import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-soft-sand/40 bg-warm-cream/80 backdrop-blur-md supports-[backdrop-filter]:bg-warm-cream/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold tracking-tight text-espresso font-heading">
            ENACT AI
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-warm-gray transition-colors hover:text-deep-brown"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
