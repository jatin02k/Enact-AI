import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-amber-50/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold tracking-tight text-stone-900 font-heading">
            ENACT <span className="text-orange-500">AI</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
          >
            Sign In
          </Link>
          <Link href="#waitlist">
            <Button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all shadow-sm">
              Join Waitlist
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
