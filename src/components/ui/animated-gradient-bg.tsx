import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientBgProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "aurora" | "mesh" | "orbs";
}

const AnimatedGradientBg = React.forwardRef<HTMLDivElement, AnimatedGradientBgProps>(
  ({ className, variant = "mesh", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0 overflow-hidden", className)}
        {...props}
      >
        {variant === "aurora" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
            <div className="aurora-blob aurora-blob-1" />
            <div className="aurora-blob aurora-blob-2" />
            <div className="aurora-blob aurora-blob-3" />
          </>
        )}
        
        {variant === "mesh" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
            <div className="mesh-gradient" />
          </>
        )}
        
        {variant === "orbs" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
            <div className="gradient-orb gradient-orb-1" />
            <div className="gradient-orb gradient-orb-2" />
            <div className="gradient-orb gradient-orb-3" />
          </>
        )}
        
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />
      </div>
    );
  }
);
AnimatedGradientBg.displayName = "AnimatedGradientBg";

export { AnimatedGradientBg };
