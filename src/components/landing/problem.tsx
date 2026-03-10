export function Problem() {
  const painPoints = [
    {
      emoji: "🖍️",
      text: "You highlighted it. Never applied it.",
    },
    {
      emoji: "📖",
      text: "You finished the book. Nothing changed.",
    },
    {
      emoji: "🛒",
      text: "You bought another book instead of doing the work.",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32" style={{ background: 'linear-gradient(180deg, #fdf8f0 0%, #fef5e8 100%)' }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="mb-4 text-center font-heading text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
          Your bookshelf is{" "}
          <span className="text-orange-500">lying to you.</span>
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-stone-500 sm:text-lg">
          You know this feeling better than anyone.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3" style={{ background: undefined }}>
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-orange-100 bg-[#fdf3e3] p-8 transition-all hover:border-orange-300 hover:bg-[#feecd5] hover:shadow-lg hover:shadow-orange-100"
            >
              <div className="mb-4 text-4xl">{point.emoji}</div>
              <p className="text-base font-medium leading-snug text-stone-700 group-hover:text-stone-900 transition-colors">
                &ldquo;{point.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
