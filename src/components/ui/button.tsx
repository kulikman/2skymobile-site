import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary: filled, accent on dark background, white text
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        // Destructive
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        // Secondary: outlined with accent.primary, transparent dark background
        outline: "border border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary",
        // Secondary filled
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Ghost: text-only with accent color
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        // Ghost with accent
        "ghost-accent": "text-primary hover:bg-primary/10 hover:text-primary",
        // Link style
        link: "text-primary underline-offset-4 hover:underline",
        // Premium gradient with shimmer
        premium: "relative overflow-hidden bg-gradient-to-r from-[hsl(193,100%,49%)] to-[hsl(216,100%,46%)] text-white font-semibold shadow-md hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] btn-shimmer",
        // Glow effect with pulse animation
        glow: "bg-primary text-primary-foreground shadow-glow hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] animate-glow-pulse-strong btn-shimmer",
        // CTA glow - strong pulsing glow for hero buttons
        "cta-glow": "relative overflow-hidden bg-gradient-to-r from-[hsl(193,100%,49%)] to-[hsl(216,100%,46%)] text-white font-semibold shadow-lg animate-glow-pulse-strong hover:scale-[1.02] active:scale-[0.98] btn-shimmer",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg font-semibold",
        // Icon buttons: circular/square, 36-40px
        icon: "h-10 w-10 rounded-lg",
        "icon-sm": "h-9 w-9 rounded-md",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
