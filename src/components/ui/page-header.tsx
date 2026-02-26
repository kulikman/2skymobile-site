import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// =============================================================================
// PAGE HEADER COMPONENT
// =============================================================================

const pageHeaderVariants = cva("relative", {
  variants: {
    background: {
      default: "bg-background",
      muted: "bg-muted/30",
      gradient: "gradient-surface",
      hero: "gradient-hero",
      dark: "gradient-dark",
    },
    padding: {
      sm: "py-12 md:py-16",
      default: "py-16 md:py-24",
      lg: "py-24 md:py-32",
    },
    align: {
      left: "text-left",
      center: "text-center",
    },
  },
  defaultVariants: {
    background: "gradient",
    padding: "default",
    align: "center",
  },
});

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pageHeaderVariants> {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  backLink?: {
    label: string;
    href: string;
  };
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (
    {
      className,
      background,
      padding,
      align,
      title,
      description,
      breadcrumbs,
      backLink,
      badge,
      actions,
      children,
      ...props
    },
    ref
  ) => (
    <header
      ref={ref}
      className={cn(pageHeaderVariants({ background, padding, align, className }))}
      {...props}
    >
      <div className="container mx-auto px-4">
        {/* Back Link */}
        {backLink && (
          <Link
            to={backLink.href}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">{backLink.label}</span>
          </Link>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="h-4 w-4" />}
                {item.href ? (
                  <Link
                    to={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && <div className="mb-4">{badge}</div>}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        )}

        {/* Actions */}
        {actions && (
          <div
            className={cn(
              "flex gap-4 mt-8",
              align === "center" && "justify-center"
            )}
          >
            {actions}
          </div>
        )}

        {/* Custom children */}
        {children}
      </div>
    </header>
  )
);
PageHeader.displayName = "PageHeader";

export { PageHeader, pageHeaderVariants };
