"use client";

import { useEffectEvent, useLayoutEffect, useRef, useState } from "react";

export interface ScrollThumbState {
  hidden: boolean;
  offsetPercentage: number;
  sizePercentage: number;
}

const initialScrollThumbState: ScrollThumbState = {
  hidden: true,
  offsetPercentage: 0,
  sizePercentage: 0,
};

export interface UseScrollThumbOptions {
  orientation: "horizontal" | "vertical";
  minSizePercentage?: number;
}

export function useScrollThumb<TViewport extends HTMLElement, TContent extends HTMLElement>({
  orientation,
  minSizePercentage = 12,
}: UseScrollThumbOptions) {
  const viewportRef = useRef<TViewport>(null);
  const contentRef = useRef<TContent>(null);
  const [thumbState, setThumbState] = useState<ScrollThumbState>(initialScrollThumbState);

  const syncThumbPosition = useEffectEvent(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const clientSize = orientation === "horizontal" ? viewport.clientWidth : viewport.clientHeight;
    const scrollOffset = orientation === "horizontal" ? viewport.scrollLeft : viewport.scrollTop;
    const scrollSize = orientation === "horizontal" ? viewport.scrollWidth : viewport.scrollHeight;

    if (scrollSize <= clientSize + 1) {
      setThumbState(initialScrollThumbState);
      return;
    }

    const visibleRatio = clientSize / scrollSize;
    const sizePercentage = Math.max(visibleRatio * 100, minSizePercentage);
    const maxOffset = 100 - sizePercentage;
    const scrollableSize = scrollSize - clientSize;
    const progress = scrollableSize > 0 ? scrollOffset / scrollableSize : 0;

    setThumbState({
      hidden: false,
      offsetPercentage: maxOffset * progress,
      sizePercentage,
    });
  });

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;

    if (!viewport || !content) {
      return;
    }

    syncThumbPosition();

    const onScroll = () => {
      syncThumbPosition();
    };

    const resizeObserver = new ResizeObserver(() => {
      syncThumbPosition();
    });

    viewport.addEventListener("scroll", onScroll, { passive: true });
    resizeObserver.observe(viewport);
    resizeObserver.observe(content);

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, [orientation]);

  return {
    contentRef,
    thumbState,
    viewportRef,
  };
}
