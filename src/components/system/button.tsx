import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "button-base",
  {
    variants: {
      variant: {
        primary: "button-primary",
        neutral: "button-neutral",
        secondary: "button-neutral",
        danger: "button-danger",
        transparent: "button-transparent",
        ghost: "button-transparent",
        link: "button-link",
      },
      size: {
        base: "button-size-base",
        sm: "button-size-sm",
        md: "button-size-md",
        lg: "button-size-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leadingAdornment?: React.ReactNode;
  trailingAdornment?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, leadingAdornment, trailingAdornment, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {leadingAdornment ? <span className="inline-flex shrink-0 items-center justify-center">{leadingAdornment}</span> : null}
        <Slottable>{children}</Slottable>
        {trailingAdornment ? <span className="inline-flex shrink-0 items-center justify-center">{trailingAdornment}</span> : null}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
