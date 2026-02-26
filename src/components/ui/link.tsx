import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";

// =============================================================================
// TEXT LINK COMPONENT
// =============================================================================

const textLinkVariants = cva(
  "inline-flex items-center gap-1 transition-colors duration-200 cursor-pointer",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
        muted: "text-muted-foreground hover:text-foreground",
        ghost: "text-foreground/80 hover:text-foreground",
        underline: "text-foreground underline underline-offset-4 hover:text-primary",
      },
      size: {
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
);

export interface TextLinkProps
  extends Omit<RouterLinkProps, "className">,
    VariantProps<typeof textLinkVariants> {
  className?: string;
  external?: boolean;
}

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ className, variant, size, external, children, to, ...props }, ref) => {
    if (external) {
      return (
        <a
          ref={ref}
          href={to as string}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(textLinkVariants({ variant, size, className }))}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      );
    }

    return (
      <RouterLink
        ref={ref}
        to={to}
        className={cn(textLinkVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }
);
TextLink.displayName = "TextLink";

// =============================================================================
// ARROW LINK COMPONENT
// =============================================================================

const arrowLinkVariants = cva(
  "inline-flex items-center gap-2 font-medium transition-all duration-200 group",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80",
        muted: "text-muted-foreground hover:text-foreground",
        foreground: "text-foreground hover:text-primary",
      },
      size: {
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
);

export interface ArrowLinkProps
  extends Omit<RouterLinkProps, "className">,
    VariantProps<typeof arrowLinkVariants> {
  className?: string;
  external?: boolean;
}

const ArrowLink = React.forwardRef<HTMLAnchorElement, ArrowLinkProps>(
  ({ className, variant, size, external, children, to, ...props }, ref) => {
    const content = (
      <>
        <span>{children}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </>
    );

    if (external) {
      return (
        <a
          ref={ref}
          href={to as string}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(arrowLinkVariants({ variant, size, className }))}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <RouterLink
        ref={ref}
        to={to}
        className={cn(arrowLinkVariants({ variant, size, className }))}
        {...props}
      >
        {content}
      </RouterLink>
    );
  }
);
ArrowLink.displayName = "ArrowLink";

// =============================================================================
// BACK LINK COMPONENT
// =============================================================================

const backLinkVariants = cva(
  "inline-flex items-center gap-2 font-medium transition-all duration-200 group",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground",
        primary: "text-primary hover:text-primary/80",
      },
      size: {
        sm: "text-sm",
        base: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
);

export interface BackLinkProps
  extends Omit<RouterLinkProps, "className">,
    VariantProps<typeof backLinkVariants> {
  className?: string;
}

const BackLink = React.forwardRef<HTMLAnchorElement, BackLinkProps>(
  ({ className, variant, size, children, to, ...props }, ref) => (
    <RouterLink
      ref={ref}
      to={to}
      className={cn(backLinkVariants({ variant, size, className }))}
      {...props}
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      <span>{children}</span>
    </RouterLink>
  )
);
BackLink.displayName = "BackLink";

// =============================================================================
// EXPORTS
// =============================================================================

export {
  TextLink,
  textLinkVariants,
  ArrowLink,
  arrowLinkVariants,
  BackLink,
  backLinkVariants,
};
