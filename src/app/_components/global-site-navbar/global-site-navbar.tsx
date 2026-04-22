"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  BarChart3,
  Briefcase,
  Building2,
  ChevronDown,
  Menu,
  Rocket,
  type LucideIcon,
  UserRound,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  globalSiteNavContent,
  type GlobalSiteNavContent,
  type GlobalSiteNavIcon,
  type GlobalSiteNavLinkEntry,
  type GlobalSiteNavMenuItem,
} from "./content";
import { DoowLogo } from "@/components/custom/icons/doow_logo";
import { Button, Container } from "@/components/system";
import { cn } from "@/lib/utils";

const productMenuIcons: Record<GlobalSiteNavIcon, LucideIcon> = {
  ceos: Briefcase,
  cfos: BarChart3,
  managers: Users,
  employees: UserRound,
  startups: Rocket,
  enterprises: Building2,
};

function matchesPath(pathname: string, matchPaths?: readonly string[]) {
  if (!matchPaths) {
    return false;
  }

  return matchPaths.some((pattern) => pathname === pattern || pathname.startsWith(`${pattern}/`));
}

function ProductMenuCard({
  item,
  onNavigate,
}: {
  item: GlobalSiteNavMenuItem;
  onNavigate?: () => void;
}) {
  const Icon = productMenuIcons[item.icon];
  const isLive = item.availability === "live" && Boolean(item.href);
  const sharedCardContent = (
    <>
      <span aria-hidden="true" className="global-site-navbar__menu-card-icon">
        <Icon className="size-[18px]" strokeWidth={1.75} />
      </span>
      <span className="global-site-navbar__menu-card-copy">
        <span className="global-site-navbar__menu-card-title">{item.label}</span>
        <span className="global-site-navbar__menu-card-description">{item.description}</span>
      </span>
    </>
  );

  if (isLive && item.href) {
    return (
      <Link
        className="global-site-navbar__menu-card global-site-navbar__menu-card--interactive"
        data-availability={item.availability}
        data-global-site-navbar-menu-item={item.label}
        href={item.href}
        onClick={onNavigate}
      >
        {sharedCardContent}
      </Link>
    );
  }

  return (
    <div
      aria-disabled="true"
      className="global-site-navbar__menu-card global-site-navbar__menu-card--planned"
      data-availability={item.availability}
      data-global-site-navbar-menu-item={item.label}
    >
      {sharedCardContent}
    </div>
  );
}

function DesktopNavigationLink({ entry, pathname }: { entry: GlobalSiteNavLinkEntry; pathname: string }) {
  const isActive = matchesPath(pathname, entry.activeMatchPaths);

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild>
        <Link
          className="global-site-navbar__desktop-link"
          data-active={isActive ? "true" : "false"}
          href={entry.href}
        >
          {entry.label}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

export interface GlobalSiteNavbarProps {
  content?: GlobalSiteNavContent;
}

export function GlobalSiteNavbar({ content = globalSiteNavContent }: GlobalSiteNavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopMenuValue, setDesktopMenuValue] = useState("");
  const desktopMenuRegionRef = useRef<HTMLDivElement | null>(null);
  const renderableEntries = content.primaryNavigation.filter((entry) => entry.type === "menu" || entry.availability === "live");
  const desktopPlainLinks = renderableEntries.filter((entry) => entry.type === "link");
  const productEntry = renderableEntries.find((entry) => entry.type === "menu");
  const loginIsActive = matchesPath(pathname, content.login.activeMatchPaths);
  const desktopProductMenuOpen = desktopMenuValue === "product";

  useEffect(() => {
    if (!desktopProductMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node) || !desktopMenuRegionRef.current?.contains(event.target)) {
        setDesktopMenuValue("");
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [desktopProductMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openDesktopProductMenu = () => {
    setDesktopMenuValue("product");
  };

  const closeDesktopProductMenu = () => {
    setDesktopMenuValue("");
  };

  return (
    <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <header className="global-site-navbar-shell" data-global-site-navbar-shell="true">
        <Container
          className="global-site-navbar__frame"
          data-layout-shell="utilityHeaderShell"
          variant="utilityShell"
        >
          <div className="global-site-navbar__surface" data-global-site-navbar-surface="true">
            <div className="global-site-navbar__brand-row">
              <DoowLogo className="shrink-0" imageClassName="global-site-navbar__logo" width={77} height={22} />

              <div className="global-site-navbar__mobile-actions">
                <Button
                  asChild
                  className="global-site-navbar__action-button global-site-navbar__action-button--login"
                  data-active={loginIsActive ? "true" : "false"}
                  size="base"
                  variant="secondary"
                >
                  <Link href={content.login.href}>{content.login.label}</Link>
                </Button>

                <Dialog.Trigger asChild>
                  <button
                    aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    className="global-site-navbar__menu-trigger"
                    data-global-site-navbar-mobile-trigger="true"
                    type="button"
                  >
                    {isMobileMenuOpen ? <X className="size-5" strokeWidth={1.9} /> : <Menu className="size-5" strokeWidth={1.9} />}
                  </button>
                </Dialog.Trigger>
              </div>
            </div>

            <div className="global-site-navbar__desktop-layout">
              <div className="global-site-navbar__desktop-brand">
                <DoowLogo className="shrink-0" imageClassName="global-site-navbar__logo" width={77} height={22} />
              </div>

              <nav
                aria-label="Primary navigation"
                className="global-site-navbar__desktop-nav-wrapper"
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    closeDesktopProductMenu();
                  }
                }}
                onPointerLeave={closeDesktopProductMenu}
                ref={desktopMenuRegionRef}
              >
                <NavigationMenu.Root
                  className="global-site-navbar__desktop-nav"
                  delayDuration={90}
                  onValueChange={setDesktopMenuValue}
                  skipDelayDuration={120}
                  value={desktopMenuValue}
                >
                  <NavigationMenu.List className="global-site-navbar__desktop-list">
                    {productEntry && productEntry.type === "menu" ? (
                      <NavigationMenu.Item value="product">
                        <NavigationMenu.Trigger
                          className="global-site-navbar__desktop-trigger"
                          data-global-site-navbar-product-trigger="true"
                          onFocus={openDesktopProductMenu}
                          onKeyDown={(event) => {
                            if (event.key === "Escape") {
                              closeDesktopProductMenu();
                              return;
                            }

                            if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
                              openDesktopProductMenu();
                            }
                          }}
                          onPointerEnter={openDesktopProductMenu}
                        >
                          {productEntry.label}
                          <ChevronDown aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                        </NavigationMenu.Trigger>

                        <NavigationMenu.Content
                          className="global-site-navbar__desktop-content"
                          data-global-site-navbar-product-content="true"
                          onEscapeKeyDown={closeDesktopProductMenu}
                          onPointerEnter={openDesktopProductMenu}
                        >
                          <div className="global-site-navbar__product-grid" data-global-site-navbar-product-grid="true">
                            {productEntry.groups.map((group) => (
                              <div className="global-site-navbar__product-column" key={group.id}>
                                {group.title ? <p className="global-site-navbar__product-column-title">{group.title}</p> : null}
                                {group.items.map((item) => (
                                  <NavigationMenu.Link asChild key={item.label}>
                                    <ProductMenuCard item={item} />
                                  </NavigationMenu.Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </NavigationMenu.Content>
                      </NavigationMenu.Item>
                    ) : null}

                    {desktopPlainLinks.map((entry) => (
                      <DesktopNavigationLink entry={entry} key={entry.label} pathname={pathname} />
                    ))}
                  </NavigationMenu.List>
                </NavigationMenu.Root>
              </nav>

              <div className="global-site-navbar__desktop-actions">
                <Button
                  asChild
                  className="global-site-navbar__action-button global-site-navbar__action-button--login"
                  data-active={loginIsActive ? "true" : "false"}
                  size="base"
                  variant="secondary"
                >
                  <Link href={content.login.href}>{content.login.label}</Link>
                </Button>

                <Button asChild className="global-site-navbar__action-button" size="base" variant="primary">
                  <Link href={content.signUp.href}>{content.signUp.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <Dialog.Portal>
        <Dialog.Overlay className="global-site-navbar__mobile-overlay" />

        <Dialog.Content
          className="global-site-navbar__mobile-content"
          data-global-site-navbar-mobile-content="true"
        >
          <Dialog.Title className="sr-only">Primary navigation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Browse product destinations and shared site links for the Doow marketing site.
          </Dialog.Description>

          <Container className="global-site-navbar__mobile-container" variant="utilityShell">
            <div className="global-site-navbar__mobile-panel">
              <nav aria-label="Mobile navigation" className="global-site-navbar__mobile-nav">
                {productEntry && productEntry.type === "menu" ? (
                  <Accordion.Root className="global-site-navbar__mobile-accordion" collapsible type="single">
                    <Accordion.Item className="global-site-navbar__mobile-accordion-item" value="product">
                      <Accordion.Header>
                        <Accordion.Trigger
                          className="global-site-navbar__mobile-accordion-trigger"
                          data-global-site-navbar-mobile-product-trigger="true"
                        >
                          <span>Product</span>
                          <ChevronDown aria-hidden="true" className="size-4" strokeWidth={1.75} />
                        </Accordion.Trigger>
                      </Accordion.Header>

                      <Accordion.Content
                        className="global-site-navbar__mobile-accordion-content"
                        data-global-site-navbar-mobile-product-content="true"
                      >
                        <div className="global-site-navbar__mobile-product-list">
                          {productEntry.groups.flatMap((group) =>
                            group.items.map((item) => (
                              <ProductMenuCard item={item} key={item.label} onNavigate={closeMobileMenu} />
                            )),
                          )}
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion.Root>
                ) : null}

                {desktopPlainLinks.map((entry) => (
                  <Link
                    className="global-site-navbar__mobile-link"
                    data-active={matchesPath(pathname, entry.activeMatchPaths) ? "true" : "false"}
                    href={entry.href}
                    key={entry.label}
                    onClick={closeMobileMenu}
                  >
                    {entry.label}
                  </Link>
                ))}
              </nav>

              <div className="global-site-navbar__mobile-footer">
                <Button
                  asChild
                  className={cn(
                    "global-site-navbar__action-button global-site-navbar__action-button--stacked",
                    loginIsActive && "global-site-navbar__action-button--stacked-active",
                  )}
                  data-active={loginIsActive ? "true" : "false"}
                  size="base"
                  variant="secondary"
                >
                  <Link href={content.login.href} onClick={closeMobileMenu}>
                    {content.login.label}
                  </Link>
                </Button>

                <Button
                  asChild
                  className="global-site-navbar__action-button global-site-navbar__action-button--stacked"
                  size="base"
                  variant="primary"
                >
                  <Link href={content.signUp.href} onClick={closeMobileMenu}>
                    {content.signUp.label}
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
