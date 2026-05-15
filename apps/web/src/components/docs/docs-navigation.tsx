"use client";

import { useMemo, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@doow/ui/ui/accordion";
import { ChevronRight } from "lucide-react";

import type { DocsNavItem, DocsSidebarGroup, DocsSidebarLink } from "@/lib/docs/types";

export function DocsTopNav({ items }: { items: readonly DocsNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary documentation navigation" className="docs-topnav">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link aria-current={isActive ? "page" : undefined} href={item.href} key={item.href}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DocsSidebarNav({ groups }: { groups: readonly DocsSidebarGroup[] }) {
  const pathname = usePathname();
  const activeGroupId = useMemo(() => {
    let activeGroup: { id: string; hrefLength: number } | undefined;

    for (const group of groups) {
      for (const item of flattenSidebarLinks(group.items)) {
        if (!item.href) continue;

        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        if (isActive && item.href.length > (activeGroup?.hrefLength ?? 0)) {
          activeGroup = {
            id: group.id ?? group.section,
            hrefLength: item.href.length,
          };
        }
      }
    }

    return activeGroup?.id;
  }, [groups, pathname]);
  const defaultOpenSections = activeGroupId ? [activeGroupId] : [];

  function renderSidebarLink(item: DocsSidebarLink, depth = 0): ReactNode {
    const hasChildren = Boolean(item.items?.length);
    const key = item.href ?? `${item.label}-${depth}`;
    const isActive = item.href ? pathname === item.href : false;

    return (
      <div className="docs-sidebar__branch" data-depth={depth} key={key}>
        {item.href ? (
          <Link
            aria-current={isActive ? "page" : undefined}
            className="docs-sidebar__item"
            data-depth={depth}
            data-has-children={hasChildren || undefined}
            href={item.href}
          >
            <span className="docs-sidebar__item-label">{item.label}</span>
            {item.badge ? <span className="docs-sidebar__badge" data-badge={item.badge}>{item.badge}</span> : null}
          </Link>
        ) : (
          <span className="docs-sidebar__section-label" data-depth={depth}>{item.label}</span>
        )}
        {hasChildren ? (
          <div className="docs-sidebar__children" data-depth={depth + 1}>
            {item.items?.map((child) => renderSidebarLink(child, depth + 1))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <nav aria-label="Documentation sections" className="docs-sidebar-nav">
      <Accordion
        className="docs-sidebar-nav__accordion"
        defaultValue={defaultOpenSections}
        key={activeGroupId ?? "docs-home"}
        type="multiple"
      >
        {groups.map((group) => {
          const groupId = group.id ?? group.section;

          return (
            <AccordionItem className="docs-sidebar-group" data-section={group.section} key={groupId} value={groupId}>
              <AccordionTrigger className="docs-sidebar-group__trigger">
                <span>{group.label}</span>
                <ChevronRight aria-hidden="true" className="docs-sidebar-group__chevron" size={14} strokeWidth={2} />
              </AccordionTrigger>
              <AccordionContent className="docs-sidebar-group__content">
                <div className="docs-sidebar-group__items">
                  {group.items.map((item) => renderSidebarLink(item))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </nav>
  );
}

function flattenSidebarLinks(items: readonly DocsSidebarLink[]): DocsSidebarLink[] {
  return items.flatMap((item) => [item, ...flattenSidebarLinks(item.items ?? [])]);
}
