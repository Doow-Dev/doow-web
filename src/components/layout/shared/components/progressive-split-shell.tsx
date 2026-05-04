"use client";

import type { ComponentPropsWithoutRef, KeyboardEvent, ReactNode, Ref } from "react";
import { useCallback, useEffect, useId, useRef, useState, useTransition } from "react";

import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

const SCROLL_STAGE_THRESHOLD_PX = 360;
const DESKTOP_STAGE_QUERY = "(min-width: 64rem)";
const scrollProgressTransition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] } as const;
const stageTransitionEase = [0.16, 1, 0.3, 1] as const;
const stageTransitionDistancePx = 56;

type StageTransitionDirection = -1 | 1;

type DataAttributes = {
  [key in `data-${string}`]?: string;
};

type DivProps = Omit<ComponentPropsWithoutRef<"div">, "ref"> & DataAttributes;
type ListProps = Omit<ComponentPropsWithoutRef<"ol">, "ref"> & DataAttributes;

export interface ProgressiveSplitItem<TId extends string = string> {
  announcementLabel?: string;
  description: ReactNode;
  id: TId;
  indicator: ReactNode;
  title: ReactNode;
}

export interface ProgressiveSplitShellClassNames {
  contentColumn?: string;
  contentPanel?: string;
  item?: string;
  itemButton?: string;
  itemCopy?: string;
  itemDescription?: string;
  itemIndicator?: string;
  itemList?: string;
  itemTitle?: string;
  layout?: string;
  progressFill?: string;
  progressTrack?: string;
  stageColumn?: string;
  stageMotion?: string;
  stagePanel?: string;
  stageSurface?: string;
}

export interface ProgressiveSplitShellProps<
  TId extends string,
  TItem extends ProgressiveSplitItem<TId> = ProgressiveSplitItem<TId>,
> {
  classNames?: ProgressiveSplitShellClassNames;
  contentColumnProps?: DivProps;
  contentPanelProps?: DivProps;
  defaultItemId: TId;
  getAnnouncementLabel?: (item: TItem) => string;
  getPanelProps?: (item: TItem) => DivProps | undefined;
  header?: ReactNode;
  items: readonly TItem[];
  itemListProps?: Omit<ListProps, "role">;
  layoutRef?: Ref<HTMLDivElement>;
  listAriaLabel: string;
  panelTitle?: ReactNode;
  renderStage: (item: TItem) => ReactNode;
  rootProps?: DivProps;
  showStage?: boolean;
  stageColumnProps?: DivProps;
  stagePanelProps?: DivProps;
  stageSurfaceProps?: DivProps;
}

function getNextIndex(currentIndex: number, total: number, direction: "next" | "previous") {
  if (direction === "next") {
    return (currentIndex + 1) % total;
  }

  return (currentIndex - 1 + total) % total;
}

function getAnnouncementText<TId extends string, TItem extends ProgressiveSplitItem<TId>>(
  item: TItem,
  getAnnouncementLabel?: (item: TItem) => string,
) {
  return getAnnouncementLabel?.(item) ?? item.announcementLabel ?? item.id;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function setRef<TValue>(ref: Ref<TValue> | undefined, value: TValue | null) {
  if (!ref) {
    return;
  }

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  ref.current = value;
}

function isElementFullyInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  return rect.top >= 0 && rect.bottom <= window.innerHeight && rect.left >= 0 && rect.right <= window.innerWidth;
}

function handleItemKeyDown<TId extends string, TItem extends ProgressiveSplitItem<TId>>(
  event: KeyboardEvent<HTMLButtonElement>,
  index: number,
  items: readonly TItem[],
  onSelect: (itemId: TId) => void,
) {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
    return;
  }

  event.preventDefault();

  const tablist = event.currentTarget.closest('[role="tablist"]');
  const tabs = tablist ? Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')) : [];

  if (!tabs.length) {
    return;
  }

  let nextIndex = index;

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    nextIndex = getNextIndex(index, items.length, "next");
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    nextIndex = getNextIndex(index, items.length, "previous");
  }

  if (event.key === "Home") {
    nextIndex = 0;
  }

  if (event.key === "End") {
    nextIndex = items.length - 1;
  }

  tabs[nextIndex]?.focus();

  const nextItem = items[nextIndex];

  if (nextItem) {
    onSelect(nextItem.id);
  }
}

export function ProgressiveSplitShell<
  TId extends string,
  TItem extends ProgressiveSplitItem<TId> = ProgressiveSplitItem<TId>,
>({
  classNames,
  contentColumnProps,
  contentPanelProps,
  defaultItemId,
  getAnnouncementLabel,
  getPanelProps,
  header,
  items,
  itemListProps,
  layoutRef,
  listAriaLabel,
  panelTitle,
  renderStage,
  rootProps,
  showStage = true,
  stageColumnProps,
  stagePanelProps,
  stageSurfaceProps,
}: ProgressiveSplitShellProps<TId, TItem>) {
  const defaultItemIndex = Math.max(
    0,
    items.findIndex((item) => item.id === defaultItemId),
  );
  const [selectedItemIndex, setSelectedItemIndex] = useState(defaultItemIndex);
  const [stageTransitionDirection, setStageTransitionDirection] = useState<StageTransitionDirection>(1);
  const [isPending, startTransition] = useTransition();
  const [isDesktopStage, setIsDesktopStage] = useState(false);
  const [isStageFullyInView, setIsStageFullyInView] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const panelBaseId = useId();
  const panelId = `${panelBaseId}-panel`;
  const layoutNodeRef = useRef<HTMLDivElement | null>(null);
  const stageSurfaceNodeRef = useRef<HTMLDivElement | null>(null);
  const selectedItemIndexRef = useRef(selectedItemIndex);
  const pendingScrollDeltaRef = useRef(0);
  const progressAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const progressValue = useMotionValue(defaultItemIndex);
  const progressFillScaleY = useTransform(progressValue, [0, Math.max(items.length - 1, 1)], [0, 1]);
  const selectedItem = items[selectedItemIndex] ?? items[0];

  const setComposedLayoutRef = useCallback(
    (node: HTMLDivElement | null) => {
      layoutNodeRef.current = node;
      setRef(layoutRef, node);
    },
    [layoutRef],
  );

  const setStageSurfaceRef = useCallback((node: HTMLDivElement | null) => {
    stageSurfaceNodeRef.current = node;
  }, []);

  function animateProgressTo(index: number, instant = false) {
    progressAnimationRef.current?.stop();
    pendingScrollDeltaRef.current = 0;

    if (instant || prefersReducedMotion) {
      progressValue.jump(index);
      return;
    }

    progressAnimationRef.current = animate(progressValue, index, scrollProgressTransition);
  }

  function selectItemIndex(index: number, instantProgress = false) {
    const nextIndex = clamp(index, 0, items.length - 1);

    if (nextIndex === selectedItemIndexRef.current) {
      animateProgressTo(nextIndex, instantProgress);
      return;
    }

    setStageTransitionDirection(nextIndex > selectedItemIndexRef.current ? 1 : -1);
    selectedItemIndexRef.current = nextIndex;
    animateProgressTo(nextIndex, instantProgress);
    startTransition(() => {
      setSelectedItemIndex(nextIndex);
    });
  }

  function handleSelect(itemId: TId) {
    const nextIndex = items.findIndex((item) => item.id === itemId);

    if (nextIndex === -1) {
      return;
    }

    selectItemIndex(nextIndex, true);
  }

  useEffect(() => {
    selectedItemIndexRef.current = selectedItemIndex;
  }, [selectedItemIndex]);

  useEffect(() => {
    const nextDefaultIndex = Math.max(
      0,
      items.findIndex((item) => item.id === defaultItemId),
    );

    if (items[selectedItemIndex]) {
      return;
    }

    selectedItemIndexRef.current = nextDefaultIndex;
    progressValue.jump(nextDefaultIndex);
  }, [defaultItemId, items, progressValue, selectedItemIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_STAGE_QUERY);

    function updateDesktopStage() {
      setIsDesktopStage(mediaQuery.matches);
    }

    updateDesktopStage();
    mediaQuery.addEventListener("change", updateDesktopStage);

    return () => {
      mediaQuery.removeEventListener("change", updateDesktopStage);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number | null = null;

    function updateStageVisibility() {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(() => {
        const stageSurfaceNode = stageSurfaceNodeRef.current;
        setIsStageFullyInView(Boolean(stageSurfaceNode && isElementFullyInViewport(stageSurfaceNode)));
        animationFrameId = null;
      });
    }

    updateStageVisibility();
    window.addEventListener("scroll", updateStageVisibility, { passive: true });
    window.addEventListener("resize", updateStageVisibility);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", updateStageVisibility);
      window.removeEventListener("resize", updateStageVisibility);
    };
  }, []);

  useEffect(() => {
    if (!showStage || prefersReducedMotion || !isDesktopStage || !isStageFullyInView || items.length <= 1) {
      pendingScrollDeltaRef.current = 0;
      animateProgressTo(selectedItemIndexRef.current);
      return;
    }

    function handleWheel(event: WheelEvent) {
      if (event.defaultPrevented || event.deltaY === 0) {
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = selectedItemIndexRef.current;
      const isAtReleaseBoundary = (direction > 0 && currentIndex >= items.length - 1) || (direction < 0 && currentIndex <= 0);

      if (isAtReleaseBoundary) {
        pendingScrollDeltaRef.current = 0;
        animateProgressTo(currentIndex);
        return;
      }

      event.preventDefault();
      progressAnimationRef.current?.stop();

      const currentDelta = pendingScrollDeltaRef.current;
      const nextDelta =
        Math.sign(currentDelta) !== 0 && Math.sign(currentDelta) !== direction ? event.deltaY : currentDelta + event.deltaY;
      const clampedDelta = clamp(nextDelta, -SCROLL_STAGE_THRESHOLD_PX, SCROLL_STAGE_THRESHOLD_PX);
      const pendingProgress = clamp(clampedDelta / SCROLL_STAGE_THRESHOLD_PX, -1, 1);

      pendingScrollDeltaRef.current = clampedDelta;
      progressValue.set(clamp(currentIndex + pendingProgress, 0, items.length - 1));

      if (Math.abs(clampedDelta) < SCROLL_STAGE_THRESHOLD_PX) {
        return;
      }

      selectItemIndex(currentIndex + direction);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isDesktopStage, isStageFullyInView, items.length, prefersReducedMotion, progressValue, showStage]);

  useEffect(() => {
    return () => {
      progressAnimationRef.current?.stop();
    };
  }, []);

  if (!selectedItem) {
    return null;
  }

  const { className: rootPropsClassName, ...rootDomProps } = rootProps ?? {};
  const { className: contentPanelPropsClassName, ...contentPanelDomProps } = contentPanelProps ?? {};
  const { className: contentColumnPropsClassName, ...contentColumnDomProps } = contentColumnProps ?? {};
  const { className: stagePanelPropsClassName, ...stagePanelDomProps } = stagePanelProps ?? {};
  const { className: stageColumnPropsClassName, ...stageColumnDomProps } = stageColumnProps ?? {};
  const { className: stageSurfacePropsClassName, ...stageSurfaceDomProps } = stageSurfaceProps ?? {};
  const { className: itemListPropsClassName, ...itemListDomProps } = itemListProps ?? {};
  const resolvedPanelProps = getPanelProps?.(selectedItem) ?? {};
  const { className: resolvedPanelPropsClassName, ...resolvedPanelDomProps } = resolvedPanelProps;

  return (
    <div
      {...rootDomProps}
      className={cn("progressive-split__layout", classNames?.layout, rootPropsClassName)}
      ref={setComposedLayoutRef}
    >
      <div
        {...contentPanelDomProps}
        className={cn("progressive-split__content-panel", classNames?.contentPanel, contentPanelPropsClassName)}
      >
        <div
          {...contentColumnDomProps}
          className={cn("progressive-split__content-column", classNames?.contentColumn, contentColumnPropsClassName)}
        >
          {header}
          {panelTitle}

          <ol
            {...itemListDomProps}
            aria-label={listAriaLabel}
            className={cn("progressive-split__item-list", classNames?.itemList, itemListPropsClassName)}
            role={showStage ? "tablist" : undefined}
          >
            <span aria-hidden="true" className={cn("progressive-split__progress-track", classNames?.progressTrack)}>
              <motion.span
                className={cn("progressive-split__progress-fill", classNames?.progressFill)}
                data-progressive-split-progress-fill="true"
                style={{ scaleY: progressFillScaleY }}
              />
            </span>

            {items.map((item, index) => {
              const isSelected = item.id === selectedItem.id;
              const tabId = `${panelBaseId}-${item.id}-tab`;

              return (
                <li className={cn("progressive-split__item", classNames?.item)} data-active={isSelected ? "true" : "false"} key={item.id}>
                  <span aria-hidden="true" className={cn("progressive-split__item-indicator", classNames?.itemIndicator)}>
                    {item.indicator}
                  </span>

                  <div className={cn("progressive-split__item-copy", classNames?.itemCopy)}>
                    <button
                      aria-controls={showStage ? panelId : undefined}
                      aria-selected={showStage ? isSelected : undefined}
                      className={cn("progressive-split__item-button", classNames?.itemButton)}
                      id={showStage ? tabId : undefined}
                      onClick={() => handleSelect(item.id)}
                      onKeyDown={showStage ? (event) => handleItemKeyDown(event, index, items, handleSelect) : undefined}
                      role={showStage ? "tab" : undefined}
                      tabIndex={showStage ? (isSelected ? 0 : -1) : undefined}
                      type="button"
                    >
                      <span className={cn("progressive-split__item-title", classNames?.itemTitle)}>{item.title}</span>
                      <span className={cn("progressive-split__item-description", classNames?.itemDescription)}>
                        {item.description}
                      </span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {showStage ? (
        <div
          {...stagePanelDomProps}
          className={cn("progressive-split__stage-panel", classNames?.stagePanel, stagePanelPropsClassName)}
        >
          <div
            {...stageColumnDomProps}
            className={cn("progressive-split__stage-column", classNames?.stageColumn, stageColumnPropsClassName)}
          >
            <div
              {...stageSurfaceDomProps}
              {...resolvedPanelDomProps}
              aria-busy={isPending}
              aria-labelledby={`${panelBaseId}-${selectedItem.id}-tab`}
              className={cn(
                "progressive-split__stage-surface",
                classNames?.stageSurface,
                stageSurfacePropsClassName,
                resolvedPanelPropsClassName,
              )}
              data-selected-item-id={selectedItem.id}
              id={panelId}
              ref={setStageSurfaceRef}
              role="tabpanel"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  className={cn("progressive-split__stage-motion", classNames?.stageMotion)}
                  exit={{
                    filter: prefersReducedMotion ? "blur(0px)" : "blur(3px)",
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : stageTransitionDirection > 0 ? -28 : 28,
                  }}
                  initial={{
                    filter: prefersReducedMotion ? "blur(0px)" : "blur(4px)",
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : stageTransitionDirection > 0 ? stageTransitionDistancePx : -stageTransitionDistancePx,
                  }}
                  key={selectedItem.id}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.68, ease: stageTransitionEase }}
                >
                  {renderStage(selectedItem)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only" role="status">
        {getAnnouncementText(selectedItem, getAnnouncementLabel)}
      </p>
    </div>
  );
}
