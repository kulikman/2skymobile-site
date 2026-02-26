import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// =============================================================================
// HEADING COMPONENT
// =============================================================================

const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    level: {
      1: "text-4xl md:text-5xl lg:text-6xl leading-tight",
      2: "text-3xl md:text-4xl lg:text-5xl leading-tight",
      3: "text-2xl md:text-3xl leading-snug",
      4: "text-xl md:text-2xl leading-snug",
      5: "text-lg md:text-xl leading-normal",
      6: "text-base md:text-lg leading-normal",
    },
  },
  defaultVariants: {
    level: 2,
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, as, children, ...props }, ref) => {
    const Component = as || (`h${level}` as keyof JSX.IntrinsicElements);
    return React.createElement(
      Component,
      {
        ref,
        className: cn(headingVariants({ level, className })),
        ...props,
      },
      children
    );
  }
);
Heading.displayName = "Heading";

// =============================================================================
// TEXT COMPONENT
// =============================================================================

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-primary",
      success: "text-success",
      warning: "text-warning",
      error: "text-destructive",
    },
    size: {
      xs: "text-xs leading-normal",
      sm: "text-sm leading-relaxed",
      base: "text-base leading-relaxed",
      lg: "text-lg leading-relaxed",
      xl: "text-xl leading-relaxed",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "normal",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, weight, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref as any}
      className={cn(textVariants({ variant, size, weight, className }))}
      {...props}
    />
  )
);
Text.displayName = "Text";

// =============================================================================
// LABEL COMPONENT
// =============================================================================

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        accent: "text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LabelTextProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const LabelText = React.forwardRef<HTMLLabelElement, LabelTextProps>(
  ({ className, variant, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants({ variant, className }))}
      {...props}
    />
  )
);
LabelText.displayName = "LabelText";

// =============================================================================
// GRADIENT TEXT COMPONENT
// =============================================================================

const gradientTextVariants = cva(
  "bg-clip-text text-transparent font-bold",
  {
    variants: {
      gradient: {
        primary: "bg-gradient-to-r from-primary via-primary/80 to-accent",
        accent: "bg-gradient-to-r from-accent via-primary to-accent",
        hero: "bg-gradient-to-r from-foreground via-primary to-accent",
        muted: "bg-gradient-to-r from-muted-foreground to-foreground",
      },
      size: {
        sm: "text-lg md:text-xl",
        base: "text-xl md:text-2xl",
        lg: "text-2xl md:text-3xl lg:text-4xl",
        xl: "text-3xl md:text-4xl lg:text-5xl",
        "2xl": "text-4xl md:text-5xl lg:text-6xl",
      },
    },
    defaultVariants: {
      gradient: "primary",
      size: "base",
    },
  }
);

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientTextVariants> {}

const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, gradient, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(gradientTextVariants({ gradient, size, className }))}
      {...props}
    />
  )
);
GradientText.displayName = "GradientText";

// =============================================================================
// CAPTION COMPONENT
// =============================================================================

const Caption = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-xs text-muted-foreground leading-normal", className)}
    {...props}
  />
));
Caption.displayName = "Caption";

// =============================================================================
// EXPORTS
// =============================================================================

export {
  Heading,
  headingVariants,
  Text,
  textVariants,
  LabelText,
  labelVariants,
  GradientText,
  gradientTextVariants,
  Caption,
};
