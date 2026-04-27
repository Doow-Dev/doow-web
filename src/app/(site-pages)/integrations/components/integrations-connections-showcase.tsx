"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import { motion, useReducedMotion } from "motion/react";

import type {
  IntegrationsConnectionsCard,
  IntegrationsConnectionsCardId,
  IntegrationsConnectionsContent,
} from "@/app/(site-pages)/integrations/content";
import { GoogleAppIcon } from "@/components/custom/icons/google-app-icon";
import { OktaAppIcon } from "@/components/custom/icons/okta-app-icon";
import { OneLoginAppIcon } from "@/components/custom/icons/onelogin-app-icon";
import { PlaidAppIcon } from "@/components/custom/icons/plaid-app-icon";
import { integrationLogoAssetManifest } from "@/lib/assets/integration-logos";
import { cn } from "@/lib/utils";

const cardEase = [0.22, 1, 0.36, 1] as const;
const drawEase = [0.16, 1, 0.3, 1] as const;

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
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasEntered, threshold]);

  return { hasEntered, ref };
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  mediaQuery.addEventListener("change", callback);

  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotionMedia() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

function BrowserToggle({ active, replayToken, reducedMotion }: MotionFigureProps) {
  return (
    <span aria-hidden="true" className="integrations-connections-toggle">
      <motion.span
        animate={active ? { opacity: 1 } : undefined}
        className="integrations-connections-toggle__track"
        initial={reducedMotion ? false : { opacity: 0.48 }}
        key={`toggle-track-${replayToken}`}
        transition={reducedMotion ? { duration: 0 } : { delay: 0.72, duration: 0.28, ease: drawEase }}
      />
      <motion.span
        animate={active ? { x: 17 } : undefined}
        className="integrations-connections-toggle__handle"
        initial={reducedMotion ? false : { x: 0 }}
        key={`toggle-handle-${replayToken}`}
        transition={reducedMotion ? { duration: 0 } : { delay: 0.76, duration: 0.44, ease: drawEase }}
      />
    </span>
  );
}

interface MotionFigureProps {
  active: boolean;
  reducedMotion: boolean;
  replayToken: number;
}

function BrowserExtensionFigure({
  active,
  content,
  reducedMotion,
  replayToken,
}: MotionFigureProps & {
  content: IntegrationsConnectionsContent;
}) {
  return (
    <div className="integrations-connections__browser-figure">
      <motion.div
        animate={active ? { opacity: 1, y: 0 } : undefined}
        className="integrations-connections-pill integrations-connections-pill--tracking"
        initial={reducedMotion ? false : { opacity: 0, y: 7 }}
        key={`tracking-pill-${replayToken}`}
        transition={reducedMotion ? { duration: 0 } : { delay: 0.1, duration: 0.46, ease: cardEase }}
      >
        {content.trackingPillLabel}
      </motion.div>

      <div className="integrations-connections__metric-row">
        {content.metrics.map((metric, index) => (
          <motion.div
            animate={active ? { opacity: 1, x: 0, y: 0 } : undefined}
            className="integrations-connections__metric-card"
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: index === 0 ? -10 : 10,
                    y: 8,
                  }
            }
            key={`${metric.label}-${replayToken}`}
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    delay: 0.26 + index * 0.1,
                    duration: 0.56,
                    ease: cardEase,
                  }
            }
          >
            <span className="integrations-connections__metric-label">{metric.label}</span>
            <span className="integrations-connections__metric-value">{metric.value}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={active ? { opacity: 1, y: 0 } : undefined}
        className="integrations-connections__tracking-control"
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        key={`tracking-control-${replayToken}`}
        transition={reducedMotion ? { duration: 0 } : { delay: 0.52, duration: 0.5, ease: cardEase }}
      >
        <span>{content.trackingLabel}</span>
        <BrowserToggle active={active} reducedMotion={reducedMotion} replayToken={replayToken} />
      </motion.div>
    </div>
  );
}

function ProviderNode({
  active,
  children,
  className,
  label,
  replayToken,
  reducedMotion,
}: MotionFigureProps & {
  children: ReactNode;
  className: string;
  label: string;
}) {
  return (
    <motion.span
      animate={active ? { opacity: 1, scale: 1, x: 0, y: 0 } : undefined}
      aria-label={`${label} logo`}
      className={cn("integrations-connections__provider-node", className)}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.84, x: "var(--node-start-x)", y: "var(--node-start-y)" }}
      key={`${label}-${replayToken}`}
      role="img"
      transition={reducedMotion ? { duration: 0 } : { delay: 0.46, duration: 0.62, ease: cardEase }}
    >
      {children}
    </motion.span>
  );
}

function SsoProvidersFigure({ active, reducedMotion, replayToken }: MotionFigureProps) {
  return (
    <div className="integrations-connections-window integrations-connections__sso-window">
      <div aria-hidden="true" className="integrations-connections-window__bar">
        <span />
        <span />
        <span />
      </div>

      <div className="integrations-connections__sso-stage">
        <motion.svg
          aria-hidden="true"
          className="integrations-connections__sso-ring"
          fill="none"
          key={`sso-ring-${replayToken}`}
          viewBox="0 0 112 112"
        >
          <motion.circle
            animate={active ? { pathLength: 1, opacity: 1 } : undefined}
            cx="56"
            cy="56"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            r="38"
            stroke="#DCE2DF"
            strokeDasharray="3 3"
            strokeLinecap="round"
            strokeWidth="1"
            transition={reducedMotion ? { duration: 0 } : { delay: 0.18, duration: 0.86, ease: drawEase }}
          />
          <motion.path
            animate={active ? { opacity: 1, pathLength: 1 } : undefined}
            d="M56 18C35 18 18 35 18 56"
            initial={reducedMotion ? false : { opacity: 0, pathLength: 0 }}
            stroke="#B8C6C0"
            strokeLinecap="round"
            strokeWidth="1.2"
            transition={reducedMotion ? { duration: 0 } : { delay: 0.3, duration: 0.68, ease: drawEase }}
          />
        </motion.svg>

        <ProviderNode
          active={active}
          className="integrations-connections__provider-node--google"
          label="Google"
          reducedMotion={reducedMotion}
          replayToken={replayToken}
        >
          <GoogleAppIcon className="integrations-connections__provider-icon integrations-connections__provider-icon--google" />
        </ProviderNode>

        <ProviderNode
          active={active}
          className="integrations-connections__provider-node--entra"
          label="Microsoft Entra"
          reducedMotion={reducedMotion}
          replayToken={replayToken}
        >
          <Image
            alt=""
            className="integrations-connections__provider-image"
            height={20}
            src={integrationLogoAssetManifest.microsoftEntraId.src}
            unoptimized
            width={20}
          />
        </ProviderNode>

        <ProviderNode
          active={active}
          className="integrations-connections__provider-node--okta"
          label="Okta"
          reducedMotion={reducedMotion}
          replayToken={replayToken}
        >
          <OktaAppIcon className="integrations-connections__provider-icon" />
        </ProviderNode>

        <ProviderNode
          active={active}
          className="integrations-connections__provider-node--onelogin"
          label="OneLogin"
          reducedMotion={reducedMotion}
          replayToken={replayToken}
        >
          <OneLoginAppIcon className="integrations-connections__provider-icon" />
        </ProviderNode>
      </div>
    </div>
  );
}

function BankingConnectorLines({ active, reducedMotion, replayToken }: MotionFigureProps) {
  return (
    <motion.svg
      aria-hidden="true"
      className="integrations-connections__banking-lines"
      fill="none"
      key={`banking-lines-${replayToken}`}
      viewBox="0 0 200 95"
    >
      <motion.path
        animate={active ? { opacity: 1, pathLength: 1 } : undefined}
        d="M100 0V20C100 23.3 97.3 26 94 26H40V50"
        initial={reducedMotion ? false : { opacity: 0, pathLength: 0 }}
        stroke="#D7DDDA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        transition={reducedMotion ? { duration: 0 } : { delay: 0.18, duration: 0.78, ease: drawEase }}
      />
      <motion.path
        animate={active ? { opacity: 1, pathLength: 1 } : undefined}
        d="M100 0V20C100 23.3 102.7 26 106 26H160V50"
        initial={reducedMotion ? false : { opacity: 0, pathLength: 0 }}
        stroke="#D7DDDA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        transition={reducedMotion ? { duration: 0 } : { delay: 0.24, duration: 0.78, ease: drawEase }}
      />
      <motion.path
        animate={active ? { opacity: 1, pathLength: 1 } : undefined}
        d="M40 50C40 78 78 77 100 83C122 77 160 78 160 50"
        initial={reducedMotion ? false : { opacity: 0, pathLength: 0 }}
        stroke="#D7DDDA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        transition={reducedMotion ? { duration: 0 } : { delay: 0.56, duration: 0.72, ease: drawEase }}
      />
      <motion.circle
        animate={active ? { cx: [40, 78, 100], cy: [50, 76, 83], opacity: [0, 1, 1, 0] } : undefined}
        className="integrations-connections__banking-packet"
        cx="100"
        cy="83"
        initial={reducedMotion ? false : { cx: 40, cy: 50, opacity: 0 }}
        r="2.5"
        transition={reducedMotion ? { duration: 0 } : { delay: 0.74, duration: 1.16, ease: "easeInOut" }}
      />
      <motion.circle
        animate={active ? { cx: [160, 122, 100], cy: [50, 76, 83], opacity: [0, 1, 1, 0] } : undefined}
        className="integrations-connections__banking-packet"
        cx="100"
        cy="83"
        initial={reducedMotion ? false : { cx: 160, cy: 50, opacity: 0 }}
        r="2.5"
        transition={reducedMotion ? { duration: 0 } : { delay: 0.84, duration: 1.16, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function BankingProvidersFigure({
  active,
  content,
  reducedMotion,
  replayToken,
}: MotionFigureProps & {
  content: IntegrationsConnectionsContent;
}) {
  return (
    <div className="integrations-connections__banking-figure">
      <motion.div
        animate={active ? { opacity: 1, y: 0 } : undefined}
        className="integrations-connections-pill integrations-connections-pill--banking"
        initial={reducedMotion ? false : { opacity: 0, y: 6 }}
        key={`banking-pill-${replayToken}`}
        transition={reducedMotion ? { duration: 0 } : { delay: 0.08, duration: 0.44, ease: cardEase }}
      >
        {content.bankingPillLabel}
      </motion.div>

      <div className="integrations-connections__banking-stage">
        <BankingConnectorLines active={active} reducedMotion={reducedMotion} replayToken={replayToken} />

        <motion.div
          animate={active ? { opacity: 1, x: 0, y: 0 } : undefined}
          className="integrations-connections__bank-source integrations-connections__bank-source--plaid"
          initial={reducedMotion ? false : { opacity: 0, x: -8, y: 8 }}
          key={`plaid-${replayToken}`}
          transition={reducedMotion ? { duration: 0 } : { delay: 0.38, duration: 0.54, ease: cardEase }}
        >
          <PlaidAppIcon className="integrations-connections__bank-icon" />
        </motion.div>

        <motion.div
          animate={active ? { opacity: 1, x: 0, y: 0 } : undefined}
          className="integrations-connections__bank-source integrations-connections__bank-source--yapily"
          initial={reducedMotion ? false : { opacity: 0, x: 8, y: 8 }}
          key={`yapily-${replayToken}`}
          transition={reducedMotion ? { duration: 0 } : { delay: 0.44, duration: 0.54, ease: cardEase }}
        >
          <Image
            alt=""
            className="integrations-connections__bank-image"
            height={34}
            src={integrationLogoAssetManifest.yapily.src}
            unoptimized
            width={34}
          />
        </motion.div>

        <motion.div
          animate={active ? { opacity: 1, y: 0 } : undefined}
          className="integrations-connections__to-doow"
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          key={`to-doow-${replayToken}`}
          transition={reducedMotion ? { duration: 0 } : { delay: 0.82, duration: 0.48, ease: cardEase }}
        >
          <span>{content.toDoowLabel}</span>
          <div className="integrations-connections__to-doow-logo">
            <Image
              alt=""
              className=""
              height={15}
              src="/favicon.ico"
              unoptimized
              width={15}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ConnectionsFigure({
  active,
  cardId,
  content,
  reducedMotion,
  replayToken,
}: MotionFigureProps & {
  cardId: IntegrationsConnectionsCardId;
  content: IntegrationsConnectionsContent;
}) {
  if (cardId === "browser-extension") {
    return (
      <BrowserExtensionFigure
        active={active}
        content={content}
        reducedMotion={reducedMotion}
        replayToken={replayToken}
      />
    );
  }

  if (cardId === "sso-providers") {
    return <SsoProvidersFigure active={active} reducedMotion={reducedMotion} replayToken={replayToken} />;
  }

  return (
    <BankingProvidersFigure
      active={active}
      content={content}
      reducedMotion={reducedMotion}
      replayToken={replayToken}
    />
  );
}

function ConnectionsCard({
  active,
  card,
  content,
  index,
  reducedMotion,
}: {
  active: boolean;
  card: IntegrationsConnectionsCard;
  content: IntegrationsConnectionsContent;
  index: number;
  reducedMotion: boolean;
}) {
  const [replayToken, setReplayToken] = useState(0);

  function replayCard() {
    if (!active || reducedMotion) {
      return;
    }

    setReplayToken((value) => value + 1);
  }

  return (
    <motion.li
      animate={active ? { opacity: 1, y: 0 } : undefined}
      className="integrations-connections-card"
      data-connections-card={card.id}
      data-replay-token={replayToken}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      onHoverStart={replayCard}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              delay: index * 0.12,
              duration: 0.82,
              ease: cardEase,
            }
      }
    >
      <div aria-hidden="true" className="integrations-connections-card__visual">
        <ConnectionsFigure
          active={active}
          cardId={card.id}
          content={content}
          reducedMotion={reducedMotion}
          replayToken={replayToken}
        />
      </div>
      <h3 className="integrations-connections-card__title">{card.title}</h3>
      <p className="sr-only">{card.accessibilitySummary}</p>
    </motion.li>
  );
}

export interface IntegrationsConnectionsShowcaseProps {
  content: IntegrationsConnectionsContent;
}

export function IntegrationsConnectionsShowcase({ content }: IntegrationsConnectionsShowcaseProps) {
  const motionReducedPreference = useReducedMotion() ?? false;
  const mediaReducedPreference = usePrefersReducedMotionMedia();
  const reducedMotion = mediaReducedPreference || (mediaReducedPreference && motionReducedPreference);
  const { hasEntered, ref } = useLatchedInView(0.05);
  const active = reducedMotion || hasEntered;

  return (
    <div className="integrations-connections__showcase" data-connections-active={active ? "true" : "false"} ref={ref}>
      <ul className="integrations-connections__cards">
        {content.cards.map((card, index) => (
          <ConnectionsCard
            active={active}
            card={card}
            content={content}
            index={index}
            key={card.id}
            reducedMotion={reducedMotion}
          />
        ))}
      </ul>
    </div>
  );
}
