import { Camera, CheckCircle2, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Camera,
    label: "CAPTURE",
    title: "Snap Any Page",
    description:
      "Open any self-help book. Snap a photo of any page. No typing, no summarising.",
    iconBg: "bg-orange-500",
    labelColor: "text-orange-500",
    borderHover: "hover:border-orange-200",
  },
  {
    number: "02",
    icon: Zap,
    label: "ACT",
    title: "Get 1 Task",
    description:
      "AI reads the page and gives you exactly one real-world task to do today. Not a summary. An action.",
    iconBg: "bg-amber-500",
    labelColor: "text-amber-600",
    borderHover: "hover:border-amber-200",
  },
  {
    number: "03",
    icon: CheckCircle2,
    label: "PROVE",
    title: "Upload Proof",
    description:
      "Do the task. Upload a proof photo. AI verifies you actually did it. Earn XP. Build your streak.",
    iconBg: "bg-green-500",
    labelColor: "text-green-600",
    borderHover: "hover:border-green-200",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32" style={{ background: 'linear-gradient(180deg, #fef5e8 0%, #fdf2de 100%)' }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
            How It Works
          </span>
        </div>
        <h2 className="mb-4 text-center font-heading text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Three steps to momentum.
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-stone-500">
          Not a tutorial. A game loop. Every day you play, you level up.
        </p>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 md:max-w-none md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`group relative flex flex-col rounded-2xl border border-orange-100 bg-[#fdf8f0] p-8 transition-all hover:shadow-xl hover:shadow-orange-100 ${step.borderHover}`}
            >
              {/* Step number watermark */}
              <div className="pointer-events-none absolute right-6 top-6 select-none font-heading text-7xl font-black text-stone-100">
                {step.number}
              </div>

              {/* Label pill */}
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-stone-100 bg-stone-50 px-3 py-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${step.labelColor}`}>
                  {step.label}
                </span>
              </div>

              {/* Icon */}
              <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${step.iconBg} shadow-md`}>
                <step.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>

              <h3 className="mb-3 text-xl font-semibold text-stone-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-500 group-hover:text-stone-600 transition-colors">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
