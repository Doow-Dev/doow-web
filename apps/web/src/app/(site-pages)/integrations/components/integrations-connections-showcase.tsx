"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import { motion } from "motion/react";

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
const revealDurationSeconds = 1.08;
const figureDurationSeconds = 0.92;

function useLatchedInView<TElement extends Element>(threshold: number) {
  const ref = useRef<TElement>(null);
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

function parseMetricValue(value: string) {
  const isCurrency = value.trim().startsWith("$");
  const numericValue = Number.parseFloat(value.replace(/[^0-9.]/g, ""));

  return {
    isCurrency,
    value: Number.isFinite(numericValue) ? numericValue : 0,
  };
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: "currency",
});

const integerFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatMetricValue(value: number, isCurrency: boolean) {
  return isCurrency ? currencyFormatter.format(value) : integerFormatter.format(Math.round(value));
}

function MetricCountUpValue({
  active,
  reducedMotion,
  replayToken,
  value,
}: {
  active: boolean;
  reducedMotion: boolean;
  replayToken: number;
  value: string;
}) {
  const parsedMetric = parseMetricValue(value);
  const [displayValue, setDisplayValue] = useState(() => (reducedMotion ? parsedMetric.value : 0));

  useEffect(() => {
    if (!active || reducedMotion) {
      return;
    }

    const durationMs = parsedMetric.isCurrency ? 2400 : 2100;
    const startTime = performance.now();
    let isCancelled = false;
    let frameId = 0;

    const tick = (timestamp: number) => {
      if (isCancelled) {
        return;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setDisplayValue(parsedMetric.value * easedProgress);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [active, parsedMetric.isCurrency, parsedMetric.value, reducedMotion, replayToken]);

  const resolvedValue = reducedMotion ? parsedMetric.value : displayValue;

  return (
    <>
      <span aria-hidden="true">{formatMetricValue(resolvedValue, parsedMetric.isCurrency)}</span>
      <span className="sr-only">{value}</span>
    </>
  );
}

function BrowserToggle({ active, replayToken, reducedMotion }: MotionFigureProps) {
  return (
    <span aria-hidden="true" className="integrations-connections-toggle">
      <motion.span
        animate={active ? { backgroundColor: "#10b981", opacity: 1 } : undefined}
        className="integrations-connections-toggle__track"
        initial={reducedMotion ? false : { backgroundColor: "#e6e7e7", opacity: 1 }}
        key={`toggle-track-${replayToken}`}
        transition={reducedMotion ? { duration: 0 } : { delay: 1.05, duration: 0.56, ease: drawEase }}
      />
      <motion.span
        animate={active ? { x: 17 } : undefined}
        className="integrations-connections-toggle__handle"
        initial={reducedMotion ? false : { x: 0 }}
        key={`toggle-handle-${replayToken}`}
        transition={reducedMotion ? { duration: 0 } : { delay: 1.08, duration: 0.72, ease: drawEase }}
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
        transition={reducedMotion ? { duration: 0 } : { delay: 0.12, duration: figureDurationSeconds, ease: cardEase }}
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
                    duration: 0.82,
                    ease: cardEase,
                  }
            }
          >
            <span className="integrations-connections__metric-label">{metric.label}</span>
            <span className="integrations-connections__metric-value">
              <MetricCountUpValue
                active={active}
                reducedMotion={reducedMotion}
                replayToken={replayToken}
                value={metric.value}
              />
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={active ? { opacity: 1, y: 0 } : undefined}
        className="integrations-connections__tracking-control"
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        key={`tracking-control-${replayToken}`}
        transition={reducedMotion ? { duration: 0 } : { delay: 0.62, duration: figureDurationSeconds, ease: cardEase }}
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
      transition={reducedMotion ? { duration: 0 } : { delay: 0.58, duration: 0.9, ease: cardEase }}
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
            transition={reducedMotion ? { duration: 0 } : { delay: 0.22, duration: 1.1, ease: drawEase }}
          />
          <motion.path
            animate={active ? { opacity: 1, pathLength: 1 } : undefined}
            d="M18 56a38 38 0 1 1 76 0a38 38 0 1 1 -76 0"
            initial={reducedMotion ? false : { opacity: 0, pathLength: 0 }}
            stroke="#10B981"
            strokeLinecap="round"
            strokeWidth="1.35"
            transition={reducedMotion ? { duration: 0 } : { delay: 0.46, duration: 2.8, ease: "easeInOut" }}
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
      viewBox="0 0 371 135"
    >
      <motion.path
        animate={active ? { opacity: 1, pathLength: 1 } : undefined}
        d="M185.5 0V20C185.5 23.3 182.8 26 179.5 26H58V77"
        initial={reducedMotion ? false : { opacity: 0, pathLength: 0 }}
        stroke="#D7DDDA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        transition={reducedMotion ? { duration: 0 } : { delay: 0.98, duration: 1.7, ease: drawEase }}
      />
      <motion.path
        animate={active ? { opacity: 1, pathLength: 1 } : undefined}
        d="M185.5 0V20C185.5 23.3 188.2 26 191.5 26H313V77"
        initial={reducedMotion ? false : { opacity: 0, pathLength: 0 }}
        stroke="#D7DDDA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        transition={reducedMotion ? { duration: 0 } : { delay: 1.04, duration: 1.7, ease: drawEase }}
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
        transition={reducedMotion ? { duration: 0 } : { delay: 0.12, duration: 0.78, ease: cardEase }}
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
          transition={reducedMotion ? { duration: 0 } : { delay: 2.72, duration: 0.86, ease: cardEase }}
        >
          <PlaidAppIcon className="integrations-connections__bank-icon" />
        </motion.div>

        <motion.div
          animate={active ? { opacity: 1, x: 0, y: 0 } : undefined}
          className="integrations-connections__bank-source integrations-connections__bank-source--yapily"
          initial={reducedMotion ? false : { opacity: 0, x: 8, y: 8 }}
          key={`yapily-${replayToken}`}
          transition={reducedMotion ? { duration: 0 } : { delay: 2.82, duration: 0.86, ease: cardEase }}
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
          transition={reducedMotion ? { duration: 0 } : { delay: 3.56, duration: 0.84, ease: cardEase }}
        >
          <span>{content.toDoowLabel}</span>
          <div className="integrations-connections__to-doow-logo">
            <Image
              alt=""
              className="integrations-connections__to-doow-image"
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
  card,
  content,
  index,
  reducedMotion,
}: {
  card: IntegrationsConnectionsCard;
  content: IntegrationsConnectionsContent;
  index: number;
  reducedMotion: boolean;
}) {
  const [replayToken, setReplayToken] = useState(0);
  const isHoveringRef = useRef(false);
  const { hasEntered, ref } = useLatchedInView<HTMLLIElement>(0.22);
  const active = reducedMotion || hasEntered;

  function replayCard() {
    if (!active || reducedMotion || isHoveringRef.current) {
      return;
    }

    isHoveringRef.current = true;
    setReplayToken((value) => value + 1);
  }

  function resetReplayHover() {
    isHoveringRef.current = false;
  }

  return (
    <motion.li
      animate={active ? { opacity: 1, y: 0 } : undefined}
      className="integrations-connections-card"
      data-connections-card={card.id}
      data-replay-token={replayToken}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      onHoverEnd={resetReplayHover}
      onHoverStart={replayCard}
      ref={ref}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              delay: index * 0.12,
              duration: revealDurationSeconds,
              ease: cardEase,
            }
      }
    >
      <h3 className="integrations-connections-card__title">{card.title}</h3>
      <div aria-hidden="true" className="integrations-connections-card__visual">
        <ConnectionsFigure
          active={active}
          cardId={card.id}
          content={content}
          reducedMotion={reducedMotion}
          replayToken={replayToken}
        />
      </div>
      <p className="sr-only">{card.accessibilitySummary}</p>
    </motion.li>
  );
}

export interface IntegrationsConnectionsShowcaseProps {
  content: IntegrationsConnectionsContent;
}

export function IntegrationsConnectionsShowcase({ content }: IntegrationsConnectionsShowcaseProps) {
  const mediaReducedPreference = usePrefersReducedMotionMedia();
  const reducedMotion = mediaReducedPreference;

  return (
    <div className="integrations-connections__showcase" data-connections-active="true">
      <ul className="integrations-connections__cards">
        {content.cards.map((card, index) => (
          <ConnectionsCard
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
