"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import {
  BarChart3,
  Briefcase,
  Building2,
  ChevronDown,
  Menu,
  Rocket,
  ArrowRight,
  UserRound,
  Users,
  X,
  Replace
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { useEffect, useRef, useState } from "react";

import {
  globalSiteNavContent,
  type GlobalSiteNavContent,
  type GlobalSiteNavIcon,
  type GlobalSiteNavLinkEntry,
  type GlobalSiteNavMenuItem,
} from "./content";
import {
  ApplicationIcon,
  DoowAiIcon,
  ExpensesIcon,
  IntegrationsIcon,
  SubscriptionsIcon,
} from "@/components/custom/icons";
import { DoowLogo } from "@/components/custom/icons/doow_logo";
import { Button, Container } from "@/components/system";

type NavMenuIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const productMenuIcons: Record<GlobalSiteNavIcon, NavMenuIconComponent> = {
  applications: ApplicationIcon,
  ceos: Briefcase,
  cfos: BarChart3,
  doowAi: DoowAiIcon,
  expenses: ExpensesIcon,
  managers: Users,
  employees: UserRound,
  integrations: IntegrationsIcon,
  subscriptions: SubscriptionsIcon,
  startups: Rocket,
  enterprises: Building2,
  alternatives: Replace,
};

function matchesPath(pathname: string, matchPaths?: readonly string[]) {
  if (!matchPaths) {
    return false;
  }

  return matchPaths.some((pattern) => pathname === pattern || pathname.startsWith(`${pattern}/`));
}

function getMenuValue(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

export function ProductMenuCard({
  item,
  onNavigate,
}: {
  item: GlobalSiteNavMenuItem;
  onNavigate?: () => void;
}) {
  const Icon = productMenuIcons[item.icon];
  const isLive = item.availability === "live" && Boolean(item.href);
  const isPlanned = item.availability === "planned";
  const sharedCardContent = (
    <>
      <span aria-hidden="true" className="global-site-navbar__menu-card-icon">
        <Icon className="size-[18px]" strokeWidth={1.75} />
      </span>
      <span className="global-site-navbar__menu-card-copy">
        <span className="global-site-navbar__menu-card-heading">
          <span className="global-site-navbar__menu-card-title">{item.label}</span>
          {isLive ? (
            <span aria-hidden="true" className="global-site-navbar__menu-card-arrow">
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </span>
          ) : null}
        </span>
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
      aria-disabled={isPlanned ? "true" : undefined}
      className={`global-site-navbar__menu-card ${isPlanned ? "global-site-navbar__menu-card--planned" : "global-site-navbar__menu-card--static"}`}
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
    <li>
      <Link
        className="global-site-navbar__desktop-link"
        data-active={isActive ? "true" : "false"}
        href={entry.href}
      >
        {entry.label}
      </Link>
    </li>
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
  const menuEntries = renderableEntries.filter((entry) => entry.type === "menu");
  const loginIsActive = matchesPath(pathname, content.login.activeMatchPaths);
  const desktopMenuOpen = desktopMenuValue !== "";

  useEffect(() => {
    if (!desktopMenuOpen) {
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
  }, [desktopMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openDesktopMenu = (value: string) => {
    setDesktopMenuValue(value);
  };

  const closeDesktopMenu = () => {
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
                    closeDesktopMenu();
                  }
                }}
                onPointerLeave={closeDesktopMenu}
                ref={desktopMenuRegionRef}
              >
                <div className="global-site-navbar__desktop-nav">
                  <ul className="global-site-navbar__desktop-list">
                    {menuEntries.map((entry) => {
                      const menuValue = getMenuValue(entry.label);
                      const panelId = `global-site-navbar-menu-${menuValue}`;

                      return (
                        <li key={entry.label} className="global-site-navbar__desktop-menu-item">
                          <button
                            aria-controls={panelId}
                            aria-expanded={desktopMenuValue === menuValue}
                            aria-haspopup="true"
                            className="global-site-navbar__desktop-trigger"
                            data-global-site-navbar-menu-trigger={entry.label}
                            onClick={() => openDesktopMenu(menuValue)}
                            onFocus={() => openDesktopMenu(menuValue)}
                            onKeyDown={(event) => {
                              if (event.key === "Escape") {
                                closeDesktopMenu();
                                return;
                              }

                              if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
                                openDesktopMenu(menuValue);
                              }
                            }}
                            onMouseEnter={() => openDesktopMenu(menuValue)}
                            onPointerEnter={() => openDesktopMenu(menuValue)}
                            type="button"
                          >
                            {entry.label}
                            <ChevronDown aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                          </button>

                          <div
                            className="global-site-navbar__desktop-content"
                            data-global-site-navbar-menu-content={entry.label}
                            id={panelId}
                            onMouseEnter={() => openDesktopMenu(menuValue)}
                            onPointerEnter={() => openDesktopMenu(menuValue)}
                          >
                            <div className="global-site-navbar__product-grid" data-global-site-navbar-product-grid="true">
                              {entry.groups.map((group) => (
                                <div className="global-site-navbar__product-column" key={group.id}>
                                  {group.title ? <p className="global-site-navbar__product-column-title">{group.title}</p> : null}
                                  {group.items.map((item) => (
                                    <ProductMenuCard item={item} key={item.label} />
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        </li>
                      );
                    })}

                    {desktopPlainLinks.map((entry) => (
                      <DesktopNavigationLink entry={entry} key={entry.label} pathname={pathname} />
                    ))}
                  </ul>
                </div>
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
        <Dialog.Overlay
          className="global-site-navbar__mobile-overlay"
          data-global-site-navbar-mobile-overlay="true"
        />

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
                {menuEntries.length > 0 ? (
                  <Accordion.Root className="global-site-navbar__mobile-accordion" collapsible type="single">
                    {menuEntries.map((entry) => (
                      <Accordion.Item className="global-site-navbar__mobile-accordion-item" key={entry.label} value={entry.label}>
                        <Accordion.Header>
                          <Accordion.Trigger
                            className="global-site-navbar__mobile-accordion-trigger"
                            data-global-site-navbar-mobile-menu-trigger={entry.label}
                          >
                            <span>{entry.label}</span>
                            <ChevronDown aria-hidden="true" className="size-4" strokeWidth={1.75} />
                          </Accordion.Trigger>
                        </Accordion.Header>

                        <Accordion.Content
                          className="global-site-navbar__mobile-accordion-content"
                          data-global-site-navbar-mobile-menu-content={entry.label}
                        >
                          <div className="global-site-navbar__mobile-product-list">
                            {entry.groups.flatMap((group) =>
                              group.items.map((item) => (
                                <ProductMenuCard item={item} key={item.label} onNavigate={closeMobileMenu} />
                              )),
                            )}
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
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
