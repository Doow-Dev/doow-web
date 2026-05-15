import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/utils";

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

export interface NavLinkProps extends LinkProps, AnchorProps {
  active?: boolean;
  children: ReactNode;
  trailingIcon?: ReactNode;
  variant?: "default" | "header";
}

export function NavLink({
  active = false,
  children,
  className,
  trailingIcon,
  variant = "default",
  ...props
}: NavLinkProps) {
  return (
    <Link
      className={cn(
        "nav-link-base",
        variant === "default" && "nav-link-default",
        variant === "default" && (active ? "nav-link-default-active" : "nav-link-default-idle"),
        variant === "header" && "nav-link-header",
        className
      )}
      {...props}
    >
      {children}
      {trailingIcon ? <span aria-hidden="true" className="inline-flex items-center justify-center">{trailingIcon}</span> : null}
    </Link>
  );
}
