"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import type {
  FeaturePointContent,
  FeaturePointId,
  FeatureShowcaseFrame,
  FeatureSplitSectionContent,
} from "../content";
import { PointOneStage } from "./point-one-stage";
import { SectionHeading } from "@/components/system";
import { cn } from "@/lib/utils";

export interface FeatureSplitShowcaseProps {
  content: FeatureSplitSectionContent;
}

export interface FeatureSplitShowcaseController {
  activePointId: FeaturePointId;
  activeFrame: FeatureShowcaseFrame;
  inView: boolean;
  prefersReducedMotion: boolean;
  onPointSelect: (pointId: FeaturePointId) => void;
  onReplay: () => void;
}

const featureSplitEase = [0.22, 1, 0.36, 1] as const;

function FeaturePointItem({
  isActive,
  point,
  onSelect,
}: {
  isActive: boolean;
  point: FeaturePointContent;
  onSelect: (pointId: FeaturePointId) => void;
}) {
  return (
    <li className="feature-split__point-item" data-active={isActive ? "true" : "false"}>
      <span aria-hidden="true" className="feature-split__point-index">
        {point.order}
      </span>

      <div className="feature-split__point-copy">
        {point.enabled ? (
          <button
            aria-label={`Replay animation for ${point.title}`}
            className={cn("feature-split__point-trigger", isActive && "feature-split__point-trigger--active")}
            onClick={() => onSelect(point.id)}
            type="button"
          >
            <span className="feature-split__point-title">{point.title}</span>
            <span className="feature-split__point-description text-body-sm-normal">{point.description}</span>
          </button>
        ) : (
          <div className="feature-split__point-static">
            <span className="feature-split__point-title">{point.title}</span>
            <span className="feature-split__point-description text-body-sm-normal">{point.description}</span>
          </div>
        )}
      </div>
    </li>
  );
}

export function FeatureSplitShowcase({ content }: FeatureSplitShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const [activePointId, setActivePointId] = useState<FeaturePointId>(content.defaultPointId);
  const [activeFrame, setActiveFrame] = useState<FeatureShowcaseFrame>(content.defaultFrame);

  useEffect(() => {
    const sectionNode = sectionRef.current;

    if (!sectionNode) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextInView = entry.isIntersecting && entry.intersectionRatio >= 0.45;

        setInView(nextInView);

        if (!nextInView) {
          setActiveFrame(content.defaultFrame);
          return;
        }

        setActiveFrame(content.defaultFrame);
      },
      {
        threshold: [0.45],
      }
    );

    observer.observe(sectionNode);

    return () => {
      observer.disconnect();
    };
  }, [content.defaultFrame]);

  useEffect(() => {
    if (!inView) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveFrame((currentFrame) => {
        if (currentFrame === "frame-1") {
          return "frame-2";
        }

        if (currentFrame === "frame-2") {
          return "frame-3";
        }

        return "frame-1";
      });
    }, activeFrame === "frame-1" ? content.timings.frameOneMs : activeFrame === "frame-2" ? content.timings.frameTwoMs : content.timings.frameThreeMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeFrame, content.defaultFrame, content.timings.frameOneMs, content.timings.frameThreeMs, content.timings.frameTwoMs, inView]);

  const controller: FeatureSplitShowcaseController = {
    activePointId,
    activeFrame,
    inView,
    prefersReducedMotion,
    onPointSelect: (pointId) => {
      setActivePointId(pointId);
      setActiveFrame(content.defaultFrame);
    },
    onReplay: () => {
      setActiveFrame(content.defaultFrame);
    },
  };

  return (
    <div className="feature-split__layout" data-feature-split-surface="layout" ref={sectionRef}>
      <div className="feature-split__content-panel surface-subtle" data-feature-split-panel="content">
        <div className="feature-split__content-column">
          <SectionHeading
            className="feature-split__heading"
            description={content.description}
            descriptionClassName="max-w-full"
            headingTag="h2"
            title={<span id="feature-split-heading">{content.title}</span>}
            titleClassName="max-w-full text-shadow-none"
          />

          <ol className="feature-split__point-list">
            {content.points.map((point) => (
              <FeaturePointItem
                isActive={controller.activePointId === point.id}
                key={point.id}
                onSelect={controller.onPointSelect}
                point={point}
              />
            ))}
          </ol>
        </div>
      </div>

      <div className="feature-split__stage-panel" data-feature-split-panel="stage">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="feature-split__stage-column"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.42, ease: featureSplitEase }}
        >
          <PointOneStage
            frame={controller.activeFrame}
            point={content.pointOne}
            prefersReducedMotion={controller.prefersReducedMotion}
          />
        </motion.div>
      </div>
    </div>
  );
}
