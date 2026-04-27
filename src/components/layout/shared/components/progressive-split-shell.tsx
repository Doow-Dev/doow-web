"use client";

import type { ComponentPropsWithoutRef, KeyboardEvent, ReactNode, Ref } from "react";
import { useId, useState, useTransition } from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const stageTransitionEase = [0.22, 1, 0.36, 1] as const;

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
  stageColumnProps,
  stagePanelProps,
  stageSurfaceProps,
}: ProgressiveSplitShellProps<TId, TItem>) {
  const [selectedItemId, setSelectedItemId] = useState(defaultItemId);
  const [isPending, startTransition] = useTransition();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const panelBaseId = useId();
  const panelId = `${panelBaseId}-panel`;
  const selectedItem = items.find((item) => item.id === selectedItemId) ?? items[0];

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

  function handleSelect(itemId: TId) {
    if (itemId === selectedItem.id) {
      return;
    }

    startTransition(() => {
      setSelectedItemId(itemId);
    });
  }

  return (
    <div
      {...rootDomProps}
      className={cn("progressive-split__layout", classNames?.layout, rootPropsClassName)}
      ref={layoutRef}
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
            role="tablist"
          >
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
                      aria-controls={panelId}
                      aria-selected={isSelected}
                      className={cn("progressive-split__item-button", classNames?.itemButton)}
                      id={tabId}
                      onClick={() => handleSelect(item.id)}
                      onKeyDown={(event) => handleItemKeyDown(event, index, items, handleSelect)}
                      role="tab"
                      tabIndex={isSelected ? 0 : -1}
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
            role="tabpanel"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                animate={{
                  filter: "blur(0px)",
                  opacity: 1,
                  x: 0,
                }}
                className={cn("progressive-split__stage-motion", classNames?.stageMotion)}
                exit={{
                  filter: prefersReducedMotion ? "blur(0px)" : "blur(5px)",
                  opacity: 0,
                  x: prefersReducedMotion ? 0 : -18,
                }}
                initial={{
                  filter: prefersReducedMotion ? "blur(0px)" : "blur(7px)",
                  opacity: 0,
                  x: prefersReducedMotion ? 0 : 24,
                }}
                key={selectedItem.id}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: stageTransitionEase }}
              >
                {renderStage(selectedItem)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only" role="status">
        {getAnnouncementText(selectedItem, getAnnouncementLabel)}
      </p>
    </div>
  );
}
