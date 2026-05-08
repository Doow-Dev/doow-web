"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { SitePageCardIcon } from "@/app/(site-pages)/_components/site-page-card-icon";
import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { subscriptionsPageContent } from "@/app/(site-pages)/subscriptions/content";
import type {
  SubscriptionsManualTrackingItem,
  SubscriptionsManualTrackingVisualId,
} from "@/app/(site-pages)/subscriptions/content/manual-tracking-content";
import { ProgressiveSplitShell, type ProgressiveSplitItem } from "@/components/layout/shared";
import { SectionHeading } from "@/components/system";
import type { SiteVideoEntry } from "@/lib/assets/site";

type SubscriptionsManualTrackingShellItem = SubscriptionsManualTrackingItem &
  ProgressiveSplitItem<SubscriptionsManualTrackingVisualId>;

function RenewalCalendar() {
  const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const days = Array.from({ length: 30 }, (_, index) => index + 1);

  return (
    <div className="subscriptions-manual__calendar">
      <div className="subscriptions-manual__calendar-top">
        <span className="subscriptions-manual__calendar-month">October</span>
        <span className="subscriptions-manual__calendar-badge">Renewals</span>
      </div>

      <div className="subscriptions-manual__calendar-weekdays">
        {weekLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="subscriptions-manual__calendar-grid">
        {days.map((day) => (
          <span
            className="subscriptions-manual__calendar-day"
            data-highlight={day === 18 ? "primary" : day === 22 ? "accent" : undefined}
            key={day}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

function getVideoAspectRatio(video: SiteVideoEntry) {
  return video.width && video.height ? `${video.width} / ${video.height}` : undefined;
}

function ManualTrackingVideo({ video }: { video: SiteVideoEntry }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const aspectRatio = getVideoAspectRatio(video);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const videoElement = video;

    function syncPlayback() {
      if (motionQuery.matches) {
        videoElement.pause();
        videoElement.currentTime = 0;
        return;
      }

      videoElement.muted = true;
      void videoElement.play().catch(() => undefined);
    }

    syncPlayback();
    motionQuery.addEventListener("change", syncPlayback);

    return () => {
      motionQuery.removeEventListener("change", syncPlayback);
    };
  }, [video.src]);

  return (
    <video
      aria-hidden="true"
      autoPlay
      className="subscriptions-manual__visual-video"
      height={video.height}
      loop
      muted
      playsInline
      preload="auto"
      ref={videoRef}
      style={{ aspectRatio }}
      width={video.width}
    >
      <source src={video.src} type={video.mimeType} />
    </video>
  );
}

function SubscriptionsManualVisual({ item }: { item: SubscriptionsManualTrackingShellItem }) {
  return (
    <div className="subscriptions-manual__visual-window">
      {item.visualVideo ? (
        <ManualTrackingVideo video={item.visualVideo} />
      ) : item.visualImage ? (
        <Image
          alt={item.visualImage.alt}
          className="subscriptions-manual__visual-image"
          height={item.visualImage.height}
          src={item.visualImage.src}
          unoptimized
          width={item.visualImage.width}
        />
      ) : (
        <>
          <RenewalCalendar />
          <div className="subscriptions-manual__visual-copy">
            <h3 className="subscriptions-manual__visual-title">{item.visualTitle}</h3>
            <p className="subscriptions-manual__visual-caption">{item.visualCaption}</p>
          </div>
        </>
      )}
    </div>
  );
}

export function SubscriptionsManualTrackingSection() {
  const section = subscriptionsPageContent.manualTracking;
  const items: SubscriptionsManualTrackingShellItem[] = section.items.map(
    (item) =>
      ({
        ...item,
        description: item.description,
        id: item.visualId,
        indicator: <SitePageCardIcon className="subscriptions-manual__item-icon-svg" />,
        title: item.title,
      }) satisfies SubscriptionsManualTrackingShellItem,
  );

  return (
    <section
      aria-labelledby="subscriptions-manual-tracking-heading"
      className="subscriptions-manual"
      id={section.id}
    >
      <SitePageSectionShell className="subscriptions-manual__shell" section={section.id}>
        <ProgressiveSplitShell<SubscriptionsManualTrackingVisualId, SubscriptionsManualTrackingShellItem>
          classNames={{
            contentColumn: "subscriptions-manual__copy",
            contentPanel: "subscriptions-manual__content-panel",
            item: "site-feature-card subscriptions-manual__item",
            itemButton: "subscriptions-manual__item-button",
            itemCopy: "subscriptions-manual__item-copy",
            itemDescription: "subscriptions-manual__item-description",
            itemIndicator: "site-feature-card__icon-wrap subscriptions-manual__item-icon",
            itemList: "subscriptions-manual__items",
            itemTitle: "subscriptions-manual__item-title",
            layout: "subscriptions-manual__layout",
            stageColumn: "subscriptions-manual__stage-column",
            stageMotion: "subscriptions-manual__visual-motion",
            stagePanel: "subscriptions-manual__stage-panel",
            stageSurface: "subscriptions-manual__visual",
          }}
          defaultItemId={section.defaultSelectedVisualId}
          header={
            <SectionHeading
              className="subscriptions-manual__heading"
              description={section.description}
              descriptionVariant="md"
              headingTag="h2"
              stackClassName="subscriptions-manual__heading-stack"
              title={<span id="subscriptions-manual-tracking-heading">{section.title}</span>}
            />
          }
          items={items}
          listAriaLabel="Subscription tracking views"
          renderStage={(item) => <SubscriptionsManualVisual item={item} />}
        />
      </SitePageSectionShell>
    </section>
  );
}
