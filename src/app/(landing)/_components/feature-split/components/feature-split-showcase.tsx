"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "motion/react";

import type { FeaturePointContent, FeatureShowcaseFrame, FeatureSplitSectionContent } from "../content";
import { PointOneStage } from "./point-one-stage";
import { ProgressiveSplitShell, type ProgressiveSplitItem } from "@/components/layout/shared";
import { SectionHeading } from "@/components/system";
import { ProgressiveSplitPlaceholderIllustration } from "@/components/custom/illustrations/applications-illustrations";

export interface FeatureSplitShowcaseProps {
  content: FeatureSplitSectionContent;
}

type FeatureSplitShellItem = FeaturePointContent & ProgressiveSplitItem<FeaturePointContent["id"]>;

function getNextFrame(frame: FeatureShowcaseFrame) {
  if (frame === "frame-1") {
    return "frame-2";
  }

  if (frame === "frame-2") {
    return "frame-3";
  }

  return "frame-1";
}

function FeatureSplitStageContent({
  content,
  inView,
  point,
  prefersReducedMotion,
}: {
  content: FeatureSplitSectionContent;
  inView: boolean;
  point: FeatureSplitShellItem;
  prefersReducedMotion: boolean;
}) {
  const [activeFrame, setActiveFrame] = useState<FeatureShowcaseFrame>(content.defaultFrame);

  useEffect(() => {
    if (point.stageKind !== "pointOne") {
      return;
    }

    if (!inView) {
      const frameId = window.setTimeout(() => {
        setActiveFrame(content.defaultFrame);
      }, 0);

      return () => {
        window.clearTimeout(frameId);
      };
    }

    const timeoutId = window.setTimeout(() => {
      setActiveFrame((currentFrame) => getNextFrame(currentFrame));
    }, activeFrame === "frame-1" ? content.timings.frameOneMs : activeFrame === "frame-2" ? content.timings.frameTwoMs : content.timings.frameThreeMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    activeFrame,
    content.defaultFrame,
    content.timings.frameOneMs,
    content.timings.frameThreeMs,
    content.timings.frameTwoMs,
    inView,
    point.stageKind,
  ]);

  if (point.stageKind === "pointOne") {
    return <PointOneStage frame={activeFrame} point={content.pointOne} prefersReducedMotion={prefersReducedMotion} />;
  }

  return <ProgressiveSplitPlaceholderIllustration className="feature-split__placeholder-stage" />;
}

export function FeatureSplitShowcase({ content }: FeatureSplitShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
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
        <FeatureSplitStageContent content={content} inView={inView} point={item} prefersReducedMotion={prefersReducedMotion} />
      )}
      rootProps={{ "data-feature-split-surface": "layout" }}
      stagePanelProps={{ "data-feature-split-panel": "stage" }}
    />
  );
}
