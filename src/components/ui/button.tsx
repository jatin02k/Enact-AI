import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-coral text-white hover:bg-[#E55A3B] hover:shadow-[0_0_20px_rgba(255,107,74,0.3)] hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-warm-gold text-white hover:bg-[#E0964F]",
        ghost: "hover:bg-warm-gray/10 text-deep-brown",
        link: "text-deep-brown underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-8 py-3", // 56px height
        sm: "h-10 rounded-md px-4",
        lg: "h-16 rounded-md px-10",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
