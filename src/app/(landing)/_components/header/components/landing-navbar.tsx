"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiMiniBars3, HiMiniChevronDown, HiMiniXMark } from "react-icons/hi2";

import type { LandingHeaderContent } from "../content";
import { ProductMenuCard } from "@/app/_components/global-site-navbar/global-site-navbar";
import { Button, Container, NavLink } from "@/components/system";

function HeaderMenuIcon({ open }: { open: boolean }) {
  return open ? <HiMiniXMark aria-hidden="true" className="size-5" /> : <HiMiniBars3 aria-hidden="true" className="size-5" />;
}

function getMenuValue(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

export interface LandingNavbarProps {
  content: LandingHeaderContent;
}

export function LandingNavbar({ content }: LandingNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [desktopMenuValue, setDesktopMenuValue] = useState("");
  const desktopMenuRegionRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const renderableEntries = content.primaryNavigation.filter((entry) => entry.type === "menu" || entry.availability === "live");
  const menuEntries = renderableEntries.filter((entry) => entry.type === "menu");
  const plainLinks = renderableEntries.filter((entry) => entry.type === "link");
  const desktopMenuOpen = desktopMenuValue !== "";
  const scrollBlend = useSpring(0, {
    stiffness: 240,
    damping: 30,
    mass: 0.65,
  });

  useMotionValueEvent(scrollY, "change", (latestScroll) => {
    const nextBlend = Math.max(0, Math.min((latestScroll - 4) / 36, 1));

    if (shouldReduceMotion) {
      scrollBlend.jump(nextBlend);
      return;
    }

    scrollBlend.set(nextBlend);
  });

  useEffect(() => {
    const nextBlend = Math.max(0, Math.min((scrollY.get() - 4) / 36, 1));

    if (shouldReduceMotion) {
      scrollBlend.jump(nextBlend);
      return;
    }

    scrollBlend.set(nextBlend);
  }, [scrollBlend, scrollY, shouldReduceMotion]);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 64rem)");

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    desktopMediaQuery.addEventListener("change", handleDesktopChange);

    return () => {
      desktopMediaQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openDesktopMenu = (value: string) => {
    setDesktopMenuValue(value);
  };

  const closeDesktopMenu = () => {
    setDesktopMenuValue("");
  };

  const baseLogoOpacity = useTransform(scrollBlend, [0, 0.82], [1, 0]);
  const scrollBlendOpacity = isMenuOpen ? 0 : scrollBlend;
  const scrolledLogoOpacity = isMenuOpen ? 1 : scrollBlend;

  return (
    <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <div className="landing-navbar-shell" data-open={isMenuOpen ? "true" : "false"}>
        <header className="landing-navbar">
          <div aria-hidden="true" className="landing-navbar__open-surface" />
          <motion.div aria-hidden="true" className="landing-navbar__blend-surface" style={{ opacity: scrollBlendOpacity }} />
          <motion.div aria-hidden="true" className="landing-navbar__blend-border" style={{ opacity: scrollBlendOpacity }} />
          <motion.div aria-hidden="true" className="landing-navbar__blend-shadow" style={{ opacity: scrollBlendOpacity }} />

          <Container className="landing-navbar__layout" data-layout-shell="landingNavbarShell" variant="landingWide">
            <div className="landing-navbar__brand-row">
              <Link aria-label="Doow home" className="landing-navbar__logo-link shrink-0" href="/" prefetch={false}>
                <motion.span
                  aria-hidden="true"
                  className="landing-navbar__logo-layer landing-navbar__logo-layer--base"
                  style={{ opacity: isMenuOpen ? 0 : baseLogoOpacity }}
                >
                  <Image
                    alt=""
                    className="landing-navbar__logo landing-navbar__logo--base"
                    height={22}
                    priority
                    src="/logos/doowFull.svg"
                    width={78}
                  />
                </motion.span>
                <motion.span
                  aria-hidden="true"
                  className="landing-navbar__logo-layer landing-navbar__logo-layer--scrolled"
                  style={{ opacity: scrolledLogoOpacity }}
                >
                  <Image
                    alt=""
                    className="landing-navbar__logo landing-navbar__logo--scrolled"
                    height={22}
                    priority
                    src="/logos/doow-logo-white-full.svg"
                    width={78}
                  />
                </motion.span>
              </Link>

              <div className="landing-navbar__actions landing-navbar__actions--mobile">
                <NavLink href={content.login.href} variant="header">
                  {content.login.label}
                </NavLink>

                <Dialog.Trigger asChild>
                  <button
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    className="landing-navbar__menu-trigger"
                    type="button"
                  >
                    <HeaderMenuIcon open={isMenuOpen} />
                  </button>
                </Dialog.Trigger>
              </div>
            </div>

            <nav
              aria-label="Primary navigation"
              className="landing-navbar__nav"
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  closeDesktopMenu();
                }
              }}
              onPointerLeave={closeDesktopMenu}
              ref={desktopMenuRegionRef}
            >
              <div className="landing-navbar__nav-menu">
                <ul className="landing-navbar__nav-list">
                  {menuEntries.map((entry) => {
                    const menuValue = getMenuValue(entry.label);
                    const panelId = `landing-navbar-menu-${menuValue}`;

                    return (
                      <li key={entry.label} className="landing-navbar__nav-menu-item">
                        <button
                          aria-controls={panelId}
                          aria-expanded={desktopMenuValue === menuValue}
                          aria-haspopup="true"
                          className="nav-link-base nav-link-header landing-navbar__nav-trigger"
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
                          <HiMiniChevronDown aria-hidden="true" className="size-4" />
                        </button>

                        <div
                          className="landing-navbar__desktop-content global-site-navbar__desktop-content"
                          id={panelId}
                          onMouseEnter={() => openDesktopMenu(menuValue)}
                          onPointerEnter={() => openDesktopMenu(menuValue)}
                        >
                          <div className="global-site-navbar__product-grid">
                            {entry.groups.map((group) => (
                              <div className="global-site-navbar__product-column" key={group.id}>
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

                  {plainLinks.map((item) => (
                    <li key={item.label}>
                      <NavLink href={item.href} variant="header">
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="landing-navbar__actions landing-navbar__actions--desktop">
              <NavLink href={content.login.href} variant="header">
                {content.login.label}
              </NavLink>

              <Button asChild size="base" variant="primary">
                <Link href={content.signUp.href}>{content.signUp.label}</Link>
              </Button>
            </div>
          </Container>
        </header>

        <Dialog.Portal>
          <Dialog.Overlay className="landing-navbar__dialog-overlay" />

          <Dialog.Content className="landing-navbar__dialog-content">
            <Dialog.Title className="sr-only">Primary navigation</Dialog.Title>
            <Dialog.Description className="sr-only">
              Use this dialog to access the primary navigation links and the sign up action.
            </Dialog.Description>

            <div className="landing-navbar__menu-panel">
              <nav aria-label="Mobile navigation" className="landing-navbar__menu-links">
                {menuEntries.length > 0 ? (
                  <Accordion.Root className="landing-navbar__mobile-accordion" collapsible type="single">
                    {menuEntries.map((entry) => (
                      <Accordion.Item className="landing-navbar__mobile-accordion-item" key={entry.label} value={entry.label}>
                        <Accordion.Header>
                          <Accordion.Trigger className="landing-navbar__menu-link landing-navbar__mobile-accordion-trigger">
                            <span>{entry.label}</span>
                            <HiMiniChevronDown aria-hidden="true" className="size-4" />
                          </Accordion.Trigger>
                        </Accordion.Header>

                        <Accordion.Content className="landing-navbar__mobile-accordion-content">
                          <div className="landing-navbar__mobile-dropdown-list">
                            {entry.groups.flatMap((group) =>
                              group.items.map((item) => (
                                <ProductMenuCard item={item} key={item.label} onNavigate={closeMenu} />
                              )),
                            )}
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>
                ) : null}

                {plainLinks.map((item) => (
                  <Link className="landing-navbar__menu-link landing-navbar__mobile-link" href={item.href} key={item.label} onClick={closeMenu}>
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Button asChild className="landing-navbar__menu-cta" size="sm" variant="primary">
                <Link href={content.signUp.href} onClick={closeMenu}>
                  {content.signUp.label}
                </Link>
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </Dialog.Root>
  );
}
