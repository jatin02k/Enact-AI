export function SocialProof() {
  return (
    <section className="bg-gradient-to-b from-sunrise to-warm-cream py-24">
      <div className="container mx-auto px-4 text-center">
        <h3 className="mb-12 font-heading text-2xl font-semibold text-deep-brown sm:text-3xl">
          Built for the aggressive self-improver.
        </h3>
        
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <blockquote className="relative rounded-2xl bg-white p-8 text-lg font-medium leading-relaxed text-deep-brown shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow">
            &ldquo;I&apos;ve been &apos;reading&apos; for years. Enact made me actually do.&rdquo;
            <footer className="mt-4 text-sm font-normal text-warm-gray">— Alex K.</footer>
          </blockquote>
          
          <blockquote className="relative rounded-2xl bg-white p-8 text-lg font-medium leading-relaxed text-deep-brown shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow">
            &ldquo;The AI won&apos;t let you bullshit. Finally, accountability that works.&rdquo;
            <footer className="mt-4 text-sm font-normal text-warm-gray">— Sarah M.</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
