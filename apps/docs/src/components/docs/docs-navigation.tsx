"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { DocsNavItem, DocsSidebarGroup } from "@/lib/docs/types";

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

  return (
    <nav aria-label="Documentation sections" className="docs-sidebar-nav">
      {groups.map((group) => (
        <section className="docs-sidebar-group" key={group.section}>
          <p>{group.label}</p>
          <div>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className="docs-sidebar__item"
                  href={item.href}
                  key={item.href}
                >
                  <span className="docs-sidebar__item-label">{item.label}</span>
                  {item.badge ? <span className="docs-sidebar__badge" data-badge={item.badge}>{item.badge}</span> : null}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </nav>
  );
}
