import * as React from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// GRADIENT ORB - Blurred gradient spheres for backgrounds
// =============================================================================

interface GradientOrbProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "accent" | "secondary";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  blur?: "sm" | "md" | "lg";
  animate?: boolean;
}

const orbSizes = {
  sm: "w-32 h-32",
  md: "w-48 h-48",
  lg: "w-64 h-64",
  xl: "w-96 h-96",
};

const orbColors = {
  primary: "bg-primary/20",
  accent: "bg-accent/20",
  secondary: "bg-secondary/30",
};

const orbPositions = {
  "top-left": "-top-16 -left-16",
  "top-right": "-top-16 -right-16",
  "bottom-left": "-bottom-16 -left-16",
  "bottom-right": "-bottom-16 -right-16",
  "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const orbBlurs = {
  sm: "blur-2xl",
  md: "blur-3xl",
  lg: "blur-[100px]",
};

const GradientOrb = React.forwardRef<HTMLDivElement, GradientOrbProps>(
  ({ 
    className, 
    size = "md", 
    color = "primary", 
    position = "top-right",
    blur = "lg",
    animate = false,
    ...props 
  }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute rounded-full pointer-events-none opacity-50",
        orbSizes[size],
        orbColors[color],
        orbPositions[position],
        orbBlurs[blur],
        animate && "animate-float",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
);
GradientOrb.displayName = "GradientOrb";

// =============================================================================
// GLOW LINE - Glowing separator line between sections
// =============================================================================

interface GlowLineProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "horizontal" | "vertical";
  color?: "primary" | "accent" | "muted";
}

const glowLineColors = {
  primary: "from-transparent via-primary/50 to-transparent",
  accent: "from-transparent via-accent/50 to-transparent",
  muted: "from-transparent via-border to-transparent",
};

const GlowLine = React.forwardRef<HTMLDivElement, GlowLineProps>(
  ({ className, variant = "horizontal", color = "primary", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        variant === "horizontal" 
          ? "bg-gradient-to-r h-px w-full my-4" 
          : "bg-gradient-to-b w-px h-full mx-4",
        glowLineColors[color],
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
);
GlowLine.displayName = "GlowLine";

// =============================================================================
// NETWORK GRID - Subtle grid pattern for backgrounds
// =============================================================================

interface NetworkGridProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: "light" | "medium" | "strong";
}

const gridOpacities = {
  light: "opacity-[0.02]",
  medium: "opacity-[0.05]",
  strong: "opacity-[0.08]",
};

const NetworkGrid = React.forwardRef<HTMLDivElement, NetworkGridProps>(
  ({ className, opacity = "light", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 pointer-events-none",
        gridOpacities[opacity],
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
      aria-hidden="true"
      {...props}
    />
  )
);
NetworkGrid.displayName = "NetworkGrid";

// =============================================================================
// ANIMATED DOTS - Floating animated dots
// =============================================================================

interface FloatingDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

const FloatingDots = React.forwardRef<HTMLDivElement, FloatingDotsProps>(
  ({ className, count = 5, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30 animate-float"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
);
FloatingDots.displayName = "FloatingDots";

export { GradientOrb, GlowLine, NetworkGrid, FloatingDots };
