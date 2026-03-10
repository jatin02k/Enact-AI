'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitEmail, type ActionState } from "@/actions/waitlist";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const initialState: ActionState = {
  error: '',
  success: false
}

export function FinalCTA() {
  const [state, formAction, isPending] = useActionState(submitEmail, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    } else if (state.success) {
      toast.success("You're on the list!");
    }
  }, [state]);

  return (
    <section id="final-cta" className="relative overflow-hidden py-28 sm:py-36" style={{ background: 'linear-gradient(160deg, #fef5e8 0%, #fdf0d5 100%)' }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
      {/* Soft radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-orange-100 opacity-70 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <span className="mb-6 text-xs font-bold uppercase tracking-widest text-orange-500">
          Ready?
        </span>
        <h2 className="mb-10 font-heading text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
          Don&apos;t just own the book.{" "}
          <br />
          <span className="text-orange-500">Enact it.</span>
        </h2>

        <form
          action={formAction}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="h-14 rounded-xl border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus-visible:ring-orange-500 focus-visible:border-orange-500 shadow-sm transition-all disabled:opacity-50"
            disabled={isPending}
          />
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="h-14 w-full rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 text-base sm:w-auto shadow-lg shadow-orange-200 disabled:opacity-50 transition-all"
          >
            {isPending ? 'Joining...' : 'Join Waitlist'}
          </Button>
        </form>

        <p className="mt-6 text-sm text-stone-500">
          Launching March 2026 • No spam. Ever.
        </p>
      </div>
    </section>
  );
}
