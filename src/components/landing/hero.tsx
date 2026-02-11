'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { submitEmail, type ActionState } from "@/app/action";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const initialState: ActionState={
  error: '',
  success: false
}

export function Hero() {
  const [state,formAction,isPending] = useActionState(submitEmail,initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    } else if (state.success) {
      toast.success("You are on the list!");
    }
  }, [state]);

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-warm-cream px-4 pb-16 pt-24 md:pt-32">
      {/* Background Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sunrise to-transparent opacity-50" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <Badge variant="gold" className="mb-8 px-4 py-1.5 text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-500">
          Launching March 2026
        </Badge>
        
        <h1 className="font-heading text-5xl font-bold leading-[1.1] tracking-tight text-espresso sm:text-6xl md:text-7xl lg:text-[5rem] animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          Stop Reading. <br className="hidden sm:block" />
          <span className="text-coral">Start Doing.</span>
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg text-deep-brown/90 sm:text-xl animate-in fade-in slide-in-from-bottom-5 duration-1000 fill-mode-both delay-200">
          Turn your self-help books into real-world action. AI extracts tasks. 
          You upload proof. Build momentum daily.
        </p>

        <form action={formAction} className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both delay-300">
          <Input 
            type="email" 
            name="email"
            placeholder="your@email.com" 
            required
            disabled={isPending}
            className="h-14 bg-light-peach/80 transition-all hover:bg-light-peach focus:bg-light-peach"
          />
          <Button type="submit" size="lg" disabled={isPending} className="h-14 w-full px-8 text-base sm:w-auto shadow-lg shadow-coral/20">
            {isPending? 'Joining...':'Join Waitlist'}
          </Button>
        </form>

        <p className="mt-6 text-sm font-medium text-warm-gray animate-in fade-in zoom-in duration-1000 delay-500">
          Join <span className="font-semibold text-deep-brown">the first 100 builders</span> proving they do the work.
        </p>
      </div>
    </section>
  );
}
