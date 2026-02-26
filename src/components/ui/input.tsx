import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border bg-card text-foreground transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
        error: "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20 focus:outline-none",
      },
      inputSize: {
        default: "h-11 px-4 py-2.5 text-sm",
        sm: "h-9 px-3 py-2 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, label, helperText, errorText, ...props }, ref) => {
    const hasError = !!errorText || variant === "error";
    
    if (label || helperText || errorText) {
      return (
        <div className="space-y-1.5">
          {label && (
            <label className="text-sm font-medium text-foreground">
              {label}
            </label>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ 
                variant: hasError ? "error" : variant, 
                inputSize,
              }),
              className
            )}
            ref={ref}
            {...props}
          />
          {helperText && !errorText && (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          )}
          {errorText && (
            <p className="text-xs text-destructive">{errorText}</p>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          inputVariants({ 
            variant: hasError ? "error" : variant, 
            inputSize,
          }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
