import { BookOpen } from "lucide-react";

export function Problem() {
  return (
    <section className="bg-light-peach py-24 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-warm-cream p-4 shadow-sm ring-1 ring-black/5">
          <BookOpen className="h-10 w-10 text-warm-gold" />
        </div>
        
        <h2 className="font-heading text-3xl font-bold tracking-tight text-espresso sm:text-4xl md:text-5xl">
          You have a library of unfinished books.
        </h2>
        
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-deep-brown/80 sm:text-xl">
          Atomic Habits. Deep Work. The 7 Habits. You bought them. You highlighted them. 
          Maybe you finished them. But did you actually change anything? 
          <span className="block mt-4 font-semibold text-deep-brown">
            Information without implementation is just entertainment.
          </span>
        </p>
      </div>
    </section>
  );
}
