'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { Camera, CheckCircle2, Zap, Star } from "lucide-react";
import { submitEmail, type ActionState} from "@/actions/waitlist";

const initialState: ActionState = {
  error: '',
  success: false
}

export function Hero() {
  const [state, formAction, isPending] = useActionState(submitEmail, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    } else if (state.success) {
      toast.success("You're on the list!");
    }
  }, [state]);

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fdf6ec 0%, #fef3e2 50%, #fdf0d5 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-orange-100 opacity-50 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[350px] w-[350px] rounded-full bg-amber-100 opacity-60 blur-[70px]" />

      <div className="container relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center gap-12 px-4 py-20 lg:flex-row lg:items-center lg:gap-16 lg:py-28">

        {/* ── LEFT: Text + CTA ── */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            Launching March 2026
          </div>

          {/* Headline */}
          <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-stone-900 sm:text-6xl lg:text-[4.5rem] animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
            Stop Reading.{" "}
            <span className="text-orange-500">Start Doing.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-5 max-w-xl text-lg text-stone-600 sm:text-xl animate-in fade-in slide-in-from-bottom-5 duration-1000 fill-mode-both delay-200">
            Snap any book page. Get 1 task. Prove you did it.{" "}
            <span className="font-semibold text-stone-800">Build momentum that compounds.</span>
          </p>

          {/* Email Form */}
          <form
            action={formAction}
            className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both delay-300"
          >
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              disabled={isPending}
              className="h-14 rounded-xl border border-orange-100 bg-white text-stone-900 placeholder:text-stone-400 focus-visible:ring-orange-500 focus-visible:border-orange-400 shadow-sm transition-all"
            />
            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="h-14 w-full rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 text-base sm:w-auto shadow-lg shadow-orange-200 transition-all"
            >
              {isPending ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </form>

          <p className="mt-4 text-sm font-medium text-stone-500 animate-in fade-in zoom-in duration-1000 delay-500">
            Join{" "}
            <span className="font-semibold text-stone-800">100+ builders</span>{" "}
            already on the waitlist
          </p>
        </div>

        {/* ── RIGHT: Phone Mockup ── */}
        <div className="flex flex-shrink-0 justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-500">
          <div className="relative w-[270px] sm:w-[290px]">
            {/* Soft shadow / glow */}
            <div
              className="absolute inset-0 scale-95 translate-y-6 rounded-[3.5rem] blur-2xl opacity-30"
              style={{ background: "linear-gradient(180deg, #f97316 0%, #fbbf24 100%)" }}
            />

            {/* Phone outer shell */}
            <div
              className="relative rounded-[3rem] p-[3px] shadow-2xl"
              style={{ background: "linear-gradient(160deg, #e7e0d8 0%, #c8bfb4 100%)" }}
            >
              {/* Inner bezel */}
              <div className="rounded-[2.8rem] overflow-hidden bg-[#f5ede0]">
                {/* Dynamic Island */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="h-6 w-24 rounded-full bg-stone-900" />
                </div>

                {/* Screen */}
                <div
                  className="mx-2 mb-2 rounded-[2.2rem] overflow-hidden"
                  style={{ background: "linear-gradient(160deg, #fdf8f0 0%, #fef5e8 100%)" }}
                >
                  <div className="p-4">
                    {/* Status bar */}
                    <div className="mb-4 flex items-center justify-between px-1">
                      <span className="text-[10px] font-semibold text-stone-500">9:41</span>
                      <span className="text-[10px] font-bold text-orange-500 tracking-tight">ENACT AI</span>
                      <span className="text-[10px] text-stone-400">⚡ 87%</span>
                    </div>

                    {/* Greeting */}
                    <div className="mb-4">
                      <p className="text-[10px] text-stone-400">Good morning, Rahul 👋</p>
                      <p className="text-sm font-bold text-stone-900">Today&apos;s Mission</p>
                    </div>

                    {/* Book snippet card */}
                    <div
                      className="mb-3 rounded-2xl p-3"
                      style={{ background: "linear-gradient(135deg, #fef9f0 0%, #fdf3e0 100%)", border: "1px solid #f5deb3" }}
                    >
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <span className="text-base">📖</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-amber-700">
                          Atomic Habits — Ch. 3
                        </span>
                      </div>
                      <p className="text-[10px] leading-relaxed text-stone-500 italic">
                        &ldquo;…the aggregation of marginal gains. Improve by just 1% each day…&rdquo;
                      </p>
                    </div>

                    {/* AI Task card */}
                    <div
                      className="mb-3 rounded-2xl p-3"
                      style={{ background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)", border: "1px solid #fed7aa" }}
                    >
                      <div className="mb-2 flex items-center gap-1.5">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500">
                          <Zap className="h-2.5 w-2.5 text-white" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-orange-600">
                          AI Task
                        </span>
                      </div>
                      <p className="text-xs font-semibold leading-tight text-stone-800">
                        Do 1% more reps than yesterday in your workout today.
                      </p>
                    </div>

                    {/* Proof upload */}
                    <div
                      className="mb-3 flex items-center gap-2 rounded-2xl p-3"
                      style={{ border: "1.5px dashed #d6c4a8", background: "#fdf8f0" }}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-100">
                        <Camera className="h-3.5 w-3.5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-stone-600">Upload proof photo</p>
                        <p className="text-[9px] text-stone-400">Tap to open camera</p>
                      </div>
                    </div>

                    {/* XP bar */}
                    <div className="mb-3">
                      <div className="mb-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                          <span className="text-[10px] font-semibold text-stone-600">Level 4</span>
                        </div>
                        <span className="text-[10px] font-bold text-orange-500">340 / 500 XP</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: "68%",
                            background: "linear-gradient(90deg, #f97316 0%, #fbbf24 100%)"
                          }}
                        />
                      </div>
                    </div>

                    {/* Streak badge */}
                    <div
                      className="flex items-center justify-between rounded-2xl px-3 py-2"
                      style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "1px solid #a7f3d0" }}
                    >
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-700">7-Day Streak</span>
                      </div>
                      <span className="text-sm">🔥</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
