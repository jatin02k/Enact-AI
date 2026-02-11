import { Target, Zap, TrendingUp } from "lucide-react";

export function FoundersManifesto() {
  return (
    <section className="bg-warm-cream py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-espresso sm:text-4xl md:text-5xl">
            Founders&apos; Manifesto
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-deep-brown/80">
            Why we built Enact AI
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Principle 1 */}
          <div className="rounded-2xl bg-white p-8 border border-soft-sand/60 shadow-sm transition-all hover:shadow-lg hover:shadow-coral/5">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-coral/20 ring-1 ring-coral/30">
              <Target className="h-7 w-7 text-coral" />
            </div>
            <h3 className="font-heading text-xl font-bold text-deep-brown mb-3">
              Action Over Consumption
            </h3>
            <p className="text-warm-gray leading-relaxed">
              We believe knowledge without action is worthless. Every book you read should translate into tangible changes in your life, not just highlights in your Kindle.
            </p>
          </div>

          {/* Principle 2 */}
          <div className="rounded-2xl bg-white p-8 border border-soft-sand/60 shadow-sm transition-all hover:shadow-lg hover:shadow-coral/5">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-warm-gold/20 ring-1 ring-warm-gold/30">
              <Zap className="h-7 w-7 text-warm-gold" />
            </div>
            <h3 className="font-heading text-xl font-bold text-deep-brown mb-3">
              Momentum Compounds
            </h3>
            <p className="text-warm-gray leading-relaxed">
              Small daily actions create unstoppable momentum. We&apos;re building a system that turns your reading into a daily practice of growth and accountability.
            </p>
          </div>

          {/* Principle 3 */}
          <div className="rounded-2xl bg-white p-8 border border-soft-sand/60 shadow-sm transition-all hover:shadow-lg hover:shadow-coral/5">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-sage/20 ring-1 ring-sage/30">
              <TrendingUp className="h-7 w-7 text-sage" />
            </div>
            <h3 className="font-heading text-xl font-bold text-deep-brown mb-3">
              Proof Over Promises
            </h3>
            <p className="text-warm-gray leading-relaxed">
              Words are cheap. We require proof of completion. Upload evidence, earn XP, and build an undeniable track record of personal transformation.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-light-peach p-8 border border-coral/20 shadow-sm">
          <blockquote className="text-center">
            <p className="font-heading text-xl font-semibold text-deep-brown sm:text-2xl">
              &ldquo;The gap between knowing and doing is where dreams die. We&apos;re here to close that gap.&rdquo;
            </p>
            <footer className="mt-4 text-warm-gray">
              — The Enact AI Team
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
