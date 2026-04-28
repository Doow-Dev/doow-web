"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { motion, useReducedMotion } from "motion/react";

import type {
  SubscriptionsOverviewCard,
  SubscriptionsOverviewContent,
  SubscriptionsOverviewVisual,
} from "@/app/(site-pages)/subscriptions/content/overview-content";
import { GoogleAppIcon } from "@/components/custom/icons/google-app-icon";
import { NotionAppIcon } from "@/components/custom/icons/notion-app-icon";
import { SlackAppIcon } from "@/components/custom/icons/slack-app-icon";

const cardRevealEase = [0.22, 1, 0.36, 1] as const;
const cardFadeDurationSeconds = 0.86;
const figureEaseDurationSeconds = 0.68;

const licenseAvatarImages = {
  activeOne: "/assets/illustrations/subscriptions-license-user-1.png",
  activeTwo: "/assets/illustrations/subscriptions-license-user-2.png",
  activeThree: "/assets/illustrations/subscriptions-license-user-3.png",
  activeFour: "/assets/illustrations/subscriptions-license-user-4.png",
} as const;

const licenseUsageAvatars = [
  { id: "avatar-1", src: licenseAvatarImages.activeOne, active: false },
  { id: "avatar-2", src: licenseAvatarImages.activeOne, active: true },
  { id: "avatar-3", src: licenseAvatarImages.activeTwo, active: false },
  { id: "avatar-4", src: licenseAvatarImages.activeTwo, active: true },
  { id: "avatar-5", src: licenseAvatarImages.activeOne, active: false },
  { id: "avatar-6", src: licenseAvatarImages.activeThree, active: true },
  { id: "avatar-7", src: licenseAvatarImages.activeOne, active: false },
  { id: "avatar-8", src: licenseAvatarImages.activeFour, active: true },
  { id: "avatar-9", src: licenseAvatarImages.activeOne, active: false },
  { id: "avatar-10", src: licenseAvatarImages.activeOne, active: true },
  { id: "avatar-11", src: licenseAvatarImages.activeThree, active: false },
  { id: "avatar-12", src: licenseAvatarImages.activeTwo, active: true },
  { id: "avatar-13", src: licenseAvatarImages.activeOne, active: false },
  { id: "avatar-14", src: licenseAvatarImages.activeThree, active: true },
  { id: "avatar-15", src: licenseAvatarImages.activeOne, active: false },
  { id: "avatar-16", src: licenseAvatarImages.activeFour, active: true },
  { id: "avatar-17", src: licenseAvatarImages.activeOne, active: false },
  { id: "avatar-18", src: licenseAvatarImages.activeTwo, active: true },
  { id: "avatar-19", src: licenseAvatarImages.activeFour, active: false },
  { id: "avatar-20", src: licenseAvatarImages.activeOne, active: true },
  { id: "avatar-21", src: licenseAvatarImages.activeThree, active: true },
  { id: "avatar-22", src: licenseAvatarImages.activeOne, active: false },
  { id: "avatar-23", src: licenseAvatarImages.activeTwo, active: false },
  { id: "avatar-24", src: licenseAvatarImages.activeFour, active: true },
  { id: "avatar-25", src: licenseAvatarImages.activeOne, active: false },
  { id: "avatar-26", src: licenseAvatarImages.activeTwo, active: true },
  { id: "avatar-27", src: licenseAvatarImages.activeThree, active: false },
] as const;

const usageMetrics = [
  { id: "api-calls", label: "API calls", value: "80000", limit: "100000", progress: "46.83%" },
  { id: "storage", label: "Storage", value: "600GB", limit: "1TB", progress: "46.83%" },
] as const;

const usageTrendLinePath = "M0.5 7.75L66.28 5.81L99.16 2.9L147 0.75";
const usageTrendAreaPath = "M65.55 5.22L0 6.93V20.75H146V0.75L98.33 2.65L65.55 5.22Z";

const overageUserImage = "/assets/illustrations/subscriptions-overage-user.png";

const overageRows = [
  { id: "storage", itemType: "Additional storage", qty: "10000", mappedUser: "All", totalValue: "$5000" },
  { id: "compute", itemType: "Compute", qty: "10000", mappedUser: "All", totalValue: "$125" },
  { id: "character", itemType: "Additional charater", qty: "10000", mappedUser: "stack", totalValue: "$1000" },
  { id: "total", itemType: "", qty: "10000", mappedUser: "", totalValue: "$6125", total: true },
] as const;

const calendarWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"] as const;
const calendarWeeks = [
  [
    { day: "29" },
    { day: "30" },
    { day: "1" },
    { day: "2" },
    { day: "3" },
    { day: "4" },
    { day: "5", event: "google", amount: "$1327.5" },
  ],
  [{ day: "6" }, { day: "7" }, { day: "8" }, { day: "9" }, { day: "10" }, { day: "11" }, { day: "12" }],
  [
    { day: "13" },
    { day: "14" },
    { day: "15" },
    { day: "16", event: "slack", amount: "$87.5" },
    { day: "17" },
    { day: "18" },
    { day: "19" },
  ],
  [{ day: "20" }, { day: "21" }, { day: "22" }, { day: "23" }, { day: "24" }, { day: "25" }, { day: "26" }],
  [
    { day: "27" },
    { day: "28" },
    { day: "29" },
    { day: "30" },
    { day: "31" },
    { day: "1", event: "notion" },
    { day: "2" },
  ],
] as const;

function useLatchedInView(threshold: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (hasEntered || typeof window === "undefined") {
      return;
    }

    if (typeof window.IntersectionObserver === "undefined") {
      const frameId = window.requestAnimationFrame(() => {
        setHasEntered(true);
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: [threshold],
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasEntered, threshold]);

  return { hasEntered, ref };
}

function TeamsFigure({
  active,
  title,
  prefersReducedMotion,
}: {
  active: boolean;
  title: string;
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="subscriptions-overview__figure-stage subscriptions-overview__figure-stage--teams">
      <h3 className="subscriptions-overview__card-title subscriptions-overview__card-title--inside">{title}</h3>

      <motion.div
        animate={active ? { opacity: 1, y: 0 } : undefined}
        className="subscriptions-overview__license-grid-surface"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2, duration: figureEaseDurationSeconds, ease: cardRevealEase }}
      >
        {licenseUsageAvatars.map((avatar, avatarIndex) => (
          <motion.div
            animate={active ? { opacity: avatar.active ? 1 : 0.15, scale: 1, y: 0 } : undefined}
            className="subscriptions-overview__license-avatar"
            data-active={avatar.active ? "true" : undefined}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: 8 }}
            key={avatar.id}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { delay: 0.24 + avatarIndex * 0.018, duration: 0.48, ease: cardRevealEase }
            }
          >
            <Image
              alt=""
              className="subscriptions-overview__license-avatar-image"
              height={44}
              src={avatar.src}
              width={44}
            />
            {avatar.active ? <span className="subscriptions-overview__license-avatar-dot" /> : null}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function StatusFigure({
  active,
  title,
  prefersReducedMotion,
}: {
  active: boolean;
  title: string;
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="subscriptions-overview__figure-stage subscriptions-overview__figure-stage--status">
      <h3 className="subscriptions-overview__card-title subscriptions-overview__card-title--inside">{title}</h3>

      <motion.div
        animate={active ? { opacity: 1, y: 0 } : undefined}
        className="subscriptions-overview__usage-layout"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.18, duration: figureEaseDurationSeconds, ease: cardRevealEase }}
      >
        <div className="subscriptions-overview__usage-metrics">
          {usageMetrics.map((metric, metricIndex) => (
            <motion.div
              animate={active ? { opacity: 1, y: 0 } : undefined}
              className="subscriptions-overview__usage-card"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              key={metric.id}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { delay: 0.28 + metricIndex * 0.08, duration: 0.5, ease: cardRevealEase }
              }
            >
              <span className="subscriptions-overview__usage-label">{metric.label}</span>
              <span className="subscriptions-overview__usage-progress" aria-hidden="true">
                <motion.span
                  animate={active ? { width: metric.progress } : undefined}
                  initial={prefersReducedMotion ? false : { width: "0%" }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { delay: 0.42 + metricIndex * 0.08, duration: 0.7, ease: cardRevealEase }
                  }
                />
              </span>
              <span className="subscriptions-overview__usage-value">
                <strong>{metric.value}/</strong>
                <span>{metric.limit}</span>
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={active ? { opacity: 1, y: 0 } : undefined}
          className="subscriptions-overview__usage-card subscriptions-overview__usage-card--chart"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.44, duration: 0.5, ease: cardRevealEase }}
        >
          <span className="subscriptions-overview__usage-label">Usage</span>
          <span className="subscriptions-overview__usage-chart">
            <motion.svg
              aria-hidden="true"
              className="subscriptions-overview__usage-chart-graphic"
              fill="none"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={active ? { opacity: 1 } : undefined}
              preserveAspectRatio="none"
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5, duration: 0.42, ease: cardRevealEase }}
              viewBox="0 0 147.034 20.7492"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                animate={active ? { opacity: 1 } : undefined}
                d={usageTrendAreaPath}
                fill="url(#subscriptions-overview-usage-fill)"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.54, duration: 0.46, ease: cardRevealEase }}
              />
              <motion.path
                animate={active ? { pathLength: 1 } : undefined}
                d={usageTrendLinePath}
                initial={prefersReducedMotion ? false : { pathLength: 0 }}
                stroke="rgba(20, 20, 20, 0.48)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.58, duration: 0.82, ease: cardRevealEase }}
              />
              <defs>
                <linearGradient
                  id="subscriptions-overview-usage-fill"
                  x1="73.0017"
                  x2="73.0017"
                  y1="20.7492"
                  y2="0.749241"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#efefef" />
                  <stop offset="1" stopColor="#d7d7d7" />
                </linearGradient>
              </defs>
            </motion.svg>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ContractFigure({
  active,
  title,
  prefersReducedMotion,
}: {
  active: boolean;
  title: string;
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="subscriptions-overview__figure-stage subscriptions-overview__figure-stage--contract">
      <h3 className="subscriptions-overview__card-title subscriptions-overview__card-title--inside">{title}</h3>

      <motion.div
        animate={active ? { opacity: 1, y: 0 } : undefined}
        className="subscriptions-overview__overage-window"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.18, duration: figureEaseDurationSeconds, ease: cardRevealEase }}
      >
        <div aria-hidden="true" className="subscriptions-overview__overage-chrome">
          <span />
          <span />
          <span />
        </div>

        <div className="subscriptions-overview__overage-table">
          <div className="subscriptions-overview__overage-row subscriptions-overview__overage-row--header">
            <span>Item type</span>
            <span>Qty</span>
            <span>Mapped user</span>
            <span>Total Value</span>
          </div>

          {overageRows.map((row, rowIndex) => (
            <motion.div
              animate={active ? { opacity: 1, x: 0 } : undefined}
              className="subscriptions-overview__overage-row"
              data-total={row.total ? "true" : undefined}
              initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
              key={row.id}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { delay: 0.3 + rowIndex * 0.07, duration: 0.5, ease: cardRevealEase }
              }
            >
              <span>{row.itemType}</span>
              <span>{row.qty}</span>
              <span>
                {row.mappedUser === "stack" ? (
                  <span className="subscriptions-overview__overage-users" aria-label="Mapped users plus five more">
                    <span className="subscriptions-overview__overage-avatar">
                      <Image alt="" height={20} src={overageUserImage} width={20} />
                    </span>
                    <span className="subscriptions-overview__overage-initials subscriptions-overview__overage-initials--green">
                      BD
                    </span>
                    <span className="subscriptions-overview__overage-initials subscriptions-overview__overage-initials--purple">
                      IJ
                    </span>
                    <span className="subscriptions-overview__overage-more">+5</span>
                  </span>
                ) : (
                  row.mappedUser
                )}
              </span>
              <span>{row.totalValue}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function CalendarFigure({
  active,
  title,
  prefersReducedMotion,
}: {
  active: boolean;
  title: string;
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="subscriptions-overview__figure-stage subscriptions-overview__figure-stage--calendar">
      <h3 className="subscriptions-overview__card-title subscriptions-overview__card-title--inside">{title}</h3>

      <motion.div
        animate={active ? { opacity: 1, y: 0 } : undefined}
        className="subscriptions-overview__renewal-calendar"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.18, duration: figureEaseDurationSeconds, ease: cardRevealEase }}
      >
        <div aria-hidden="true" className="subscriptions-overview__renewal-calendar-chrome">
          <span />
          <span />
          <span />
        </div>

        <div className="subscriptions-overview__renewal-calendar-grid">
          {calendarWeekdays.map((day) => (
            <span className="subscriptions-overview__renewal-calendar-heading" key={day}>
              {day}
            </span>
          ))}
          {calendarWeeks.flat().map((cell, cellIndex) => (
            <motion.span
              animate={active ? { opacity: 1, scale: 1 } : undefined}
              className="subscriptions-overview__renewal-calendar-day"
              data-event={cell.event ? "true" : undefined}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              key={`${cell.day}-${cellIndex}`}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.26 + cellIndex * 0.012, duration: 0.32, ease: cardRevealEase }}
            >
              {cell.amount ? <strong>{cell.amount}</strong> : <span>{cell.day}</span>}
              {cell.event === "google" ? <GoogleAppIcon className="subscriptions-overview__renewal-calendar-logo" /> : null}
              {cell.event === "slack" ? <SlackAppIcon className="subscriptions-overview__renewal-calendar-logo" /> : null}
              {cell.event === "notion" ? <NotionAppIcon className="subscriptions-overview__renewal-calendar-logo" /> : null}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function OverviewFigure({
  active,
  prefersReducedMotion,
  title,
  visual,
}: {
  active: boolean;
  prefersReducedMotion: boolean;
  title: string;
  visual: SubscriptionsOverviewVisual;
}) {
  if (visual === "teams") {
    return <TeamsFigure active={active} prefersReducedMotion={prefersReducedMotion} title={title} />;
  }

  if (visual === "status") {
    return <StatusFigure active={active} prefersReducedMotion={prefersReducedMotion} title={title} />;
  }

  if (visual === "table") {
    return <ContractFigure active={active} prefersReducedMotion={prefersReducedMotion} title={title} />;
  }

  return <CalendarFigure active={active} prefersReducedMotion={prefersReducedMotion} title={title} />;
}

function OverviewCard({
  active,
  card,
  index,
  prefersReducedMotion,
}: {
  active: boolean;
  card: SubscriptionsOverviewCard;
  index: number;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.li
      animate={active ? { filter: "blur(0px)", opacity: 1, scale: 1, y: 0 } : undefined}
      className="subscriptions-overview__card"
      data-visual={card.visual}
      initial={prefersReducedMotion ? false : { filter: "blur(10px)", opacity: 0, scale: 0.992, y: 24 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { delay: index * 0.11, duration: cardFadeDurationSeconds, ease: cardRevealEase }
      }
    >
      <div className="subscriptions-overview__card-body">
        <div aria-hidden={card.visual === "teams" ? undefined : true} className="subscriptions-overview__card-figure">
          <OverviewFigure active={active} prefersReducedMotion={prefersReducedMotion} title={card.title} visual={card.visual} />
        </div>

        {card.visual === "teams" || card.visual === "status" || card.visual === "table" || card.visual === "calendar" ? (
          <p className="sr-only">{card.description}</p>
        ) : (
          <div className="subscriptions-overview__card-copy">
            <h3 className="subscriptions-overview__card-title">{card.title}</h3>
            <p className="subscriptions-overview__card-description">{card.description}</p>
          </div>
        )}
      </div>
    </motion.li>
  );
}

export interface SubscriptionsOverviewShowcaseProps {
  cards: SubscriptionsOverviewContent["cards"];
}

export function SubscriptionsOverviewShowcase({ cards }: SubscriptionsOverviewShowcaseProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { hasEntered, ref } = useLatchedInView(0);
  const isActive = prefersReducedMotion || hasEntered;

  return (
    <div className="subscriptions-overview__showcase" ref={ref}>
      <ul className="subscriptions-overview__grid">
        {cards.map((card, index) => (
          <OverviewCard
            active={isActive}
            card={card}
            index={index}
            key={card.title}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </ul>
    </div>
  );
}
