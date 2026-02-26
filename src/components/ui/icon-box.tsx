import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// =============================================================================
// ICON BOX COMPONENT
// =============================================================================

const iconBoxVariants = cva(
  "inline-flex items-center justify-center rounded-lg transition-all duration-300",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-14 w-14",
        "2xl": "h-16 w-16",
      },
      variant: {
        default: "bg-muted/50 text-foreground",
        primary: "bg-primary/10 text-primary",
        accent: "bg-accent/10 text-accent",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        error: "bg-destructive/10 text-destructive",
        ghost: "bg-transparent text-muted-foreground",
        outline: "border border-border bg-transparent text-foreground",
        glow: "bg-primary/10 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
        xl: "rounded-xl",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
      rounded: "default",
    },
  }
);

export interface IconBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconBoxVariants> {
  icon?: React.ComponentType<{ className?: string }>;
  enableHover?: boolean;
}

const IconBox = React.forwardRef<HTMLDivElement, IconBoxProps>(
  ({ className, size, variant, rounded, icon: Icon, enableHover = false, children, ...props }, ref) => {
    // Map size to icon size
    const iconClassName = iconSizes[size || "md"];
    
    return (
      <div
        ref={ref}
        className={cn(
          iconBoxVariants({ size, variant, rounded, className }),
          enableHover && "hover:scale-110 hover:bg-primary/20"
        )}
        {...props}
      >
        {Icon ? <Icon className={iconClassName} /> : children}
      </div>
    );
  }
);
IconBox.displayName = "IconBox";

// =============================================================================
// ICON SIZES HELPER
// =============================================================================

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
  "2xl": "h-8 w-8",
} as const;

export { IconBox, iconBoxVariants, iconSizes };
