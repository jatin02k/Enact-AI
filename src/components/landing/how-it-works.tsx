import { Camera, CheckCircle2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Camera,
    title: "Capture",
    description: "Snap a photo of any book page. AI extracts one actionable task.",
  },
  {
    icon: CheckCircle2,
    title: "Act",
    description: "Do the task in real life. Take a proof photo of your work.",
  },
  {
    icon: Trophy,
    title: "Verify",
    description: "AI verifies your proof. Gain XP. Build your streak. Grown.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-warm-cream py-24 sm:py-32">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:text-center text-left max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-espresso sm:text-4xl">
            Three steps to momentum.
          </h2>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 md:max-w-none md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex flex-col items-start rounded-2xl border border-soft-sand/60 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg hover:shadow-coral/5"
            >
              <div className="absolute right-6 top-6 -z-10 font-heading text-8xl font-black text-warm-gold/10 pointer-events-none select-none">
                0{index + 1}
              </div>
              
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-light-peach text-coral shadow-sm ring-1 ring-black/5">
                <step.icon className="h-7 w-7" aria-hidden="true" />
              </div>
              
              <h3 className="mb-3 text-xl font-semibold text-deep-brown">
                {step.title}
              </h3>
              
              <p className="text-base leading-relaxed text-warm-gray">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
