import { ReactNode } from "react";

import { GlobalSiteNavbar } from "@/app/_components/global-site-navbar";
import { Card, SectionHeading } from "@/components/system";
import { cn } from "@/lib/utils";

export function UtilityRouteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground" data-layout-shell="utilityPageShell">
      <GlobalSiteNavbar />
      <main data-layout-shell="utilityPageMain">{children}</main>
    </div>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <SectionHeading
      align="center"
      className={cn("mx-auto max-w-3xl", className)}
      description={description}
      descriptionClassName="measure-copy text-body"
      eyebrow={eyebrow}
      headingTag="h1"
      title={title}
      titleClassName="text-title text-foreground text-shadow-none"
    />
  );
}

export function ContentPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <Card className={cn("mx-auto w-full md:p-10", className)}>{children}</Card>;
}
