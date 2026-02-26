import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva(
  "relative",
  {
    variants: {
      background: {
        default: "bg-background",
        muted: "bg-muted/30",
        card: "bg-card",
        dark: "gradient-dark text-foreground",
        gradient: "gradient-surface",
        hero: "gradient-hero",
      },
      padding: {
        none: "",
        sm: "section-padding-sm",
        default: "section-padding",
        lg: "py-24 md:py-32 lg:py-40",
      },
    },
    defaultVariants: {
      background: "default",
      padding: "default",
    },
  }
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div" | "article";
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, background, padding, as: Component = "section", ...props }, ref) => (
    <Component
      ref={ref as any}
      className={cn(sectionVariants({ background, padding, className }))}
      {...props}
    />
  )
);
Section.displayName = "Section";

// Section Header Component
interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, subtitle, align = "center", dark = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
      {...props}
    >
      <h2 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4",
        dark ? "text-foreground" : "text-foreground"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg md:text-xl leading-relaxed",
          dark ? "text-muted-foreground" : "text-muted-foreground"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
);
SectionHeader.displayName = "SectionHeader";

export { Section, SectionHeader, sectionVariants };
