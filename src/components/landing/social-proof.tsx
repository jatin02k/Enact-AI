const testimonials = [
  {
    quote: "Finally an app that makes me actually DO the stuff",
    name: "Rahul",
    age: 22,
    city: "Delhi",
    avatar: "R",
    bg: "bg-orange-500",
  },
  {
    quote: "I completed 7 tasks from Atomic Habits in a week",
    name: "Priya",
    age: 25,
    city: "Bangalore",
    avatar: "P",
    bg: "bg-pink-500",
  },
  {
    quote: "The proof system is brutal in the best way",
    name: "Alex",
    age: 24,
    city: "London",
    avatar: "A",
    bg: "bg-blue-500",
  },
];

const stats = [
  { value: "23", label: "tasks completed" },
  { value: "4", label: "people on waitlist" },
  { value: "7", label: "books enacted" },
];

export function SocialProof() {
  return (
    <section className="relative py-24 sm:py-32" style={{ background: 'linear-gradient(180deg, #fdf8f0 0%, #fef5e8 100%)' }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
            Community
          </span>
        </div>
        <h2 className="mb-16 text-center font-heading text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Built for people who are{" "}
          <span className="text-orange-500">done just reading.</span>
        </h2>

        {/* Testimonial cards */}
        <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group flex flex-col rounded-2xl border border-orange-100 bg-[#fef6ea] p-6 transition-all hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100"
            >
              {/* Stars */}
              <div className="mb-3 flex gap-0.5 text-orange-400 text-sm">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-stone-700">
                &ldquo;{t.quote}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${t.bg} text-sm font-bold text-white`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{t.name}, {t.age}</p>
                  <p className="text-xs text-stone-500">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-stone-900">{stat.value}</p>
              <p className="text-xs text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
