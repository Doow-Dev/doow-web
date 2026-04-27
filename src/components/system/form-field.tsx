import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface FormFieldProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ className, id, label, hint, error, children, ...props }: FormFieldProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <label className="text-label block" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint ? <p className="text-support" id={`${id}-hint`}>{hint}</p> : null}
      {error ? <p className="text-sm font-medium text-destructive" id={`${id}-error`}>{error}</p> : null}
    </div>
  );
}
