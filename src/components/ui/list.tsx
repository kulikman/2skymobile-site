import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Check, Circle, ChevronRight } from "lucide-react";

// =============================================================================
// LIST CONTAINER
// =============================================================================

const listVariants = cva("", {
  variants: {
    spacing: {
      tight: "space-y-2",
      default: "space-y-3",
      relaxed: "space-y-4",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
});

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, spacing, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(listVariants({ spacing, className }))}
      {...props}
    />
  )
);
List.displayName = "List";

// =============================================================================
// LIST ITEM VARIANTS
// =============================================================================

const listItemVariants = cva("flex items-start gap-3", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
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
});

// =============================================================================
// CHECK LIST ITEM
// =============================================================================

export interface CheckListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  iconClassName?: string;
}

const CheckListItem = React.forwardRef<HTMLLIElement, CheckListItemProps>(
  ({ className, variant, size, iconClassName, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(listItemVariants({ variant, size, className }))}
      {...props}
    >
      <div className="flex-shrink-0 mt-0.5">
        <Check className={cn("h-5 w-5 text-success", iconClassName)} />
      </div>
      <span>{children}</span>
    </li>
  )
);
CheckListItem.displayName = "CheckListItem";

// =============================================================================
// BULLET LIST ITEM
// =============================================================================

export interface BulletListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  iconClassName?: string;
}

const BulletListItem = React.forwardRef<HTMLLIElement, BulletListItemProps>(
  ({ className, variant, size, iconClassName, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(listItemVariants({ variant, size, className }))}
      {...props}
    >
      <div className="flex-shrink-0 mt-2">
        <Circle className={cn("h-2 w-2 fill-current text-primary", iconClassName)} />
      </div>
      <span>{children}</span>
    </li>
  )
);
BulletListItem.displayName = "BulletListItem";

// =============================================================================
// ARROW LIST ITEM
// =============================================================================

export interface ArrowListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  iconClassName?: string;
}

const ArrowListItem = React.forwardRef<HTMLLIElement, ArrowListItemProps>(
  ({ className, variant, size, iconClassName, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(listItemVariants({ variant, size, className }))}
      {...props}
    >
      <div className="flex-shrink-0 mt-0.5">
        <ChevronRight className={cn("h-5 w-5 text-primary", iconClassName)} />
      </div>
      <span>{children}</span>
    </li>
  )
);
ArrowListItem.displayName = "ArrowListItem";

// =============================================================================
// FEATURE LIST COMPONENT
// =============================================================================

export interface FeatureListProps extends ListProps {
  features: string[];
  iconClassName?: string;
}

const FeatureList = React.forwardRef<HTMLUListElement, FeatureListProps>(
  ({ className, spacing, features, iconClassName, ...props }, ref) => (
    <List ref={ref} spacing={spacing} className={className} {...props}>
      {features.map((feature, index) => (
        <CheckListItem key={index} iconClassName={iconClassName}>
          {feature}
        </CheckListItem>
      ))}
    </List>
  )
);
FeatureList.displayName = "FeatureList";

// =============================================================================
// ICON LIST ITEM (Custom icon)
// =============================================================================

export interface IconListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  icon: React.ReactNode;
}

const IconListItem = React.forwardRef<HTMLLIElement, IconListItemProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(listItemVariants({ variant, size, className }))}
      {...props}
    >
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <span>{children}</span>
    </li>
  )
);
IconListItem.displayName = "IconListItem";

// =============================================================================
// EXPORTS
// =============================================================================

export {
  List,
  listVariants,
  CheckListItem,
  BulletListItem,
  ArrowListItem,
  IconListItem,
  FeatureList,
  listItemVariants,
};
