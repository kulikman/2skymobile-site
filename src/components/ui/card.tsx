import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Unified Card component with variants, tilt, and glow effects
 * Replaces: InteractiveCard, PremiumCard
 */
const cardVariants = cva(
  "rounded-xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border border-border/50 text-card-foreground shadow-sm",
        flat: "bg-card border border-border/50",
        elevated: "bg-card border border-transparent shadow-md hover:shadow-lg",
        outlined: "bg-transparent border border-border",
        interactive: "bg-card border border-transparent shadow-sm hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 cursor-pointer",
        glass: "bg-card/80 backdrop-blur-xl border border-border/30",
        "glass-dark": "bg-foreground/5 backdrop-blur-xl border border-foreground/10",
        ghost: "bg-transparent",
        glow: "bg-card border border-primary/20 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "none",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Enable 3D tilt effect on hover */
  enableTilt?: boolean;
  /** Enable mouse-follow glow effect */
  enableGlow?: boolean;
  /** Tilt intensity (1-20, default 8) */
  tiltIntensity?: number;
  /** Glow color (HSL format) */
  glowColor?: string;
  /** Glow intensity (0-1, default 0.12) */
  glowIntensity?: number;
  /** Render as different element */
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    padding,
    enableTilt = false, 
    enableGlow = false, 
    tiltIntensity = 8,
    glowColor = "hsl(var(--primary))",
    glowIntensity = 0.12,
    onMouseMove, 
    onMouseLeave, 
    style, 
    children,
    ...props 
  }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [transform, setTransform] = React.useState("");
    const [glowPosition, setGlowPosition] = React.useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || (!enableTilt && !enableGlow)) {
        onMouseMove?.(e);
        return;
      }
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (enableTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
        const rotateY = ((x - centerX) / centerX) * tiltIntensity;
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
      }
      
      if (enableGlow) {
        setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
      }
      
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setTransform("");
      setGlowPosition({ x: 50, y: 50 });
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    return (
      <div
        ref={cardRef}
        className={cn(
          cardVariants({ variant, padding }),
          (enableTilt || enableGlow) && "relative overflow-hidden",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ 
          ...style,
          transform: enableTilt ? transform : undefined,
        }}
        {...props}
      >
        {/* Mouse-follow glow effect */}
        {enableGlow && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(600px circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor} / ${glowIntensity}, transparent 40%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}
        {enableGlow ? <div className="relative z-10">{children}</div> : children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-tight tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  cardVariants,
  // Backwards compatibility aliases
  Card as PremiumCard,
  CardHeader as PremiumCardHeader,
  CardTitle as PremiumCardTitle,
  CardDescription as PremiumCardDescription,
  CardContent as PremiumCardContent,
  CardFooter as PremiumCardFooter,
};
