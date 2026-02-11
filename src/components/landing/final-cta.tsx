'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitEmail, type ActionState } from "@/app/action";
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
      toast.success("You are on the list!");
    }
  }, [state]);

  return (
    <section className="bg-warm-cream py-24 sm:py-32">
      <div className="container mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        <h2 className="mb-10 font-heading text-4xl font-bold leading-tight text-espresso sm:text-5xl">
          Don&apos;t just remember it.<br />
          <span className="text-coral">Enact it.</span>
        </h2>

        <form 
        action={formAction} 
        className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center relative"
        >
          <Input 
            type="email" 
            name="email"
            placeholder="your@email.com" 
            required
            className="h-14 bg-light-peach/80 transition-all hover:bg-light-peach focus:bg-light-peach disabled:opacity-50"
            disabled={isPending}
          />
          <Button 
            type="submit" 
            size="lg" 
            disabled={isPending}
            className="h-14 w-full px-8 text-base sm:w-auto shadow-lg shadow-coral/20 disabled:opacity-50"
          >
            {isPending ? 'Joining...' : 'Join Waitlist'}
          </Button>
        </form>

        <p className="mt-8 text-sm text-warm-gray">
          Launching March 2026 • No spam, just launch updates
        </p>
      </div>
    </section>
  );
}
