"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "motion/react";

import { ProgressiveSplitPlaceholderIllustration } from "@/components/custom/illustrations/applications-illustrations";
import { ProgressiveSplitShell, type ProgressiveSplitItem } from "@/components/layout/shared";
import { SectionHeading } from "@/components/system";
import type { SiteVideoEntry } from "@/lib/assets/site";

import type { FeaturePointContent, FeatureSplitSectionContent } from "../content";

export interface FeatureSplitShowcaseProps {
  content: FeatureSplitSectionContent;
}

type FeatureSplitShellItem = FeaturePointContent & ProgressiveSplitItem<FeaturePointContent["id"]>;

function getVideoAspectRatio(video: SiteVideoEntry) {
  return video.width && video.height ? `${video.width} / ${video.height}` : undefined;
}

function FeatureSplitStageVideo({
  inView,
  prefersReducedMotion,
  video,
}: {
  inView: boolean;
  prefersReducedMotion: boolean;
  video: SiteVideoEntry;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldLoad = inView;
  const aspectRatio = getVideoAspectRatio(video);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!shouldLoad || !videoElement) {
      return;
    }

    if (prefersReducedMotion) {
      videoElement.pause();
      videoElement.currentTime = 0;
      return;
    }

    if (!inView) {
      videoElement.pause();
      return;
    }

    videoElement.muted = true;
    void videoElement.play().catch(() => undefined);
  }, [inView, prefersReducedMotion, shouldLoad, video.src]);

  return (
    <div className="feature-split__visual-window">
      {shouldLoad ? (
        <video
          aria-hidden="true"
          autoPlay
          className="feature-split__visual-video"
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
      ) : (
        <span aria-hidden="true" className="feature-split__visual-video feature-split__visual-video--loading" style={{ aspectRatio }} />
      )}
    </div>
  );
}

function FeatureSplitStageContent({
  inView,
  point,
  prefersReducedMotion,
}: {
  inView: boolean;
  point: FeatureSplitShellItem;
  prefersReducedMotion: boolean;
}) {
  if (point.stageKind === "video" && point.visualVideo) {
    return <FeatureSplitStageVideo inView={inView} prefersReducedMotion={prefersReducedMotion} video={point.visualVideo} />;
  }

  return <ProgressiveSplitPlaceholderIllustration className="feature-split__placeholder-stage" />;
}

function useDesktopStageQuery() {
  const [matchesDesktopStage, setMatchesDesktopStage] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 64rem)");

    function updateMatchesDesktopStage() {
      setMatchesDesktopStage(mediaQuery.matches);
    }

    updateMatchesDesktopStage();
    mediaQuery.addEventListener("change", updateMatchesDesktopStage);

    return () => {
      mediaQuery.removeEventListener("change", updateMatchesDesktopStage);
    };
  }, []);

  return matchesDesktopStage;
}

export function FeatureSplitShowcase({ content }: FeatureSplitShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const showStage = useDesktopStageQuery();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const items = content.points.map(
    (point) =>
      ({
        ...point,
        announcementLabel: point.title,
        description: point.description,
        indicator: point.order,
        title: point.title,
      }) satisfies FeatureSplitShellItem,
  );

  useEffect(() => {
    const sectionNode = sectionRef.current;

    if (!sectionNode) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.45);
      },
      {
        threshold: [0.45],
      },
    );

    observer.observe(sectionNode);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ProgressiveSplitShell
      classNames={{
        contentColumn: "feature-split__content-column",
        contentPanel: "feature-split__content-panel",
        item: "feature-split__point-item",
        itemButton: "feature-split__point-trigger",
        itemCopy: "feature-split__point-copy",
        itemDescription: "feature-split__point-description text-body-sm-normal",
        itemIndicator: "feature-split__point-index",
        itemList: "feature-split__point-list",
        itemTitle: "feature-split__point-title",
        layout: "feature-split__layout",
        stageColumn: "feature-split__stage-column",
        stageMotion: "feature-split__stage-motion",
        stagePanel: "feature-split__stage-panel",
        stageSurface: "feature-split__stage-surface",
      }}
      contentPanelProps={{ "data-feature-split-panel": "content" }}
      defaultItemId={content.defaultPointId}
      getPanelProps={(item) => ({
        "data-feature-active-point-id": item.id,
        "data-feature-stage-kind": item.stageKind,
      })}
      header={
        <SectionHeading
          className="feature-split__heading"
          description={content.description}
          descriptionClassName="max-w-full"
          headingTag="h2"
          title={<span id="feature-split-heading">{content.title}</span>}
          titleClassName="max-w-full text-shadow-none"
        />
      }
      items={items}
      layoutRef={sectionRef}
      listAriaLabel="Browse feature highlights"
      renderStage={(item) => (
        <FeatureSplitStageContent inView={inView} point={item} prefersReducedMotion={prefersReducedMotion} />
      )}
      rootProps={{ "data-feature-split-surface": "layout" }}
      showStage={showStage}
      stagePanelProps={{ "data-feature-split-panel": "stage" }}
    />
  );
}
