"use client";

import type { KeyboardEvent, SVGProps } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";

import { ScrollThumbRail, useScrollThumb } from "@/components/layout/shared";
import { AiIcon } from "@/components/custom/icons/ai-icon";
import { Button } from "@/components/system";

import { siteFaqChrome } from "./constants";
import type { FaqCategory, FaqCategoryId, FaqSectionContent } from "./types";

export interface FaqToolProps {
  content: FaqSectionContent;
}

const DEFAULT_REVEAL_DELAY_MS = 420;
const MIN_ASSISTANT_TYPING_MS = 900;
const MAX_ASSISTANT_TYPING_MS = 1560;
const USER_SEND_SETTLE_MS = 320;
const ASSISTANT_REPLY_SETTLE_MS = 260;
const MAX_THREAD_TOP_SPACER_PX = 120;
const FAQ_VIEWPORT_TRIGGER_RATIO = 0.2;
const FAQ_VIEWPORT_BOTTOM_OFFSET_RATIO = 0.2;

function isElementInPlaybackRange(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const effectiveViewportBottom = viewportHeight * (1 - FAQ_VIEWPORT_BOTTOM_OFFSET_RATIO);
  const visibleHeight = Math.min(rect.bottom, effectiveViewportBottom) - Math.max(rect.top, 0);

  return visibleHeight >= Math.max(rect.height * FAQ_VIEWPORT_TRIGGER_RATIO, 1);
}

function getAssistantTypingDuration(messageText: string, baseDelayMs: number) {
  const textWeightedDelay = Math.round(messageText.length * 18);

  return Math.max(MIN_ASSISTANT_TYPING_MS, Math.min(MAX_ASSISTANT_TYPING_MS, baseDelayMs + textWeightedDelay));
}

function getNextIndex(currentIndex: number, total: number, direction: "next" | "previous") {
  if (direction === "next") {
    return (currentIndex + 1) % total;
  }

  return (currentIndex - 1 + total) % total;
}

function FaqAssistantLabelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.18 2.08c.21-.86 1.43-.86 1.64 0l.74 3.04c.07.31.31.55.62.62l3.04.74c.86.21.86 1.43 0 1.64l-3.04.74a.84.84 0 0 0-.62.62l-.74 3.04c-.21.86-1.43.86-1.64 0l-.74-3.04a.84.84 0 0 0-.62-.62l-3.04-.74c-.86-.21-.86-1.43 0-1.64l3.04-.74c.31-.07.55-.31.62-.62l.74-3.04Z"
        fill="currentColor"
      />
    </svg>
  );
}

function handleCategoryKeyDown(
  event: KeyboardEvent<HTMLButtonElement>,
  categories: readonly FaqCategory[],
  index: number,
  onSelect: (categoryId: FaqCategoryId) => void,
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
    nextIndex = getNextIndex(index, tabs.length, "next");
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    nextIndex = getNextIndex(index, tabs.length, "previous");
  }

  if (event.key === "Home") {
    nextIndex = 0;
  }

  if (event.key === "End") {
    nextIndex = tabs.length - 1;
  }

  tabs[nextIndex]?.focus();

  const nextCategory = categories[nextIndex];

  if (nextCategory) {
    onSelect(nextCategory.id);
  }
}

interface FaqCategoryTabsProps {
  categories: readonly FaqCategory[];
  className: string;
  panelId: string;
  selectedCategoryId: FaqCategoryId;
  onSelect: (categoryId: FaqCategoryId) => void;
}

function FaqCategoryTabs({ categories, className, panelId, selectedCategoryId, onSelect }: FaqCategoryTabsProps) {
  return (
    <div aria-label={siteFaqChrome.categoryAriaLabel} className={className} role="tablist">
      {categories.map((category, index) => {
        const isSelected = category.id === selectedCategoryId;

        return (
          <button
            aria-controls={panelId}
            aria-selected={isSelected}
            className="faq-tool__category-button"
            data-state={isSelected ? "active" : "inactive"}
            key={category.id}
            onClick={() => onSelect(category.id)}
            onKeyDown={(event) => handleCategoryKeyDown(event, categories, index, onSelect)}
            role="tab"
            tabIndex={isSelected ? 0 : -1}
            type="button"
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

export function FaqTool({ content }: FaqToolProps) {
  const panelId = "faq-thread-panel";
  const defaultCategoryId = content.categories[0]?.id ?? "";
  const [selectedCategoryId, setSelectedCategoryId] = useState(content.initialSelectedCategoryId ?? defaultCategoryId);
  const selectedCategory = content.categories.find((category) => category.id === selectedCategoryId) ?? content.categories[0];
  const selectedMessages = useMemo(() => selectedCategory?.messages ?? [], [selectedCategory]);
  const resolvedSelectedCategoryId = selectedCategory?.id ?? "";
  const prefersReducedMotion = useReducedMotion() ?? false;
  const shouldUseSimulatedPlayback = content.interaction?.mode === "simulated" && !prefersReducedMotion;
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const shouldAnimateThread = shouldUseSimulatedPlayback && hasEnteredViewport;
  const revealDelayMs = content.interaction?.revealDelayMs ?? DEFAULT_REVEAL_DELAY_MS;
  const { contentRef, thumbState, viewportRef } = useScrollThumb<HTMLDivElement, HTMLOListElement>({
    minSizePercentage: 18,
    orientation: "vertical",
  });
  const toolRef = useRef<HTMLDivElement>(null);
  const animationSequenceRef = useRef(0);
  const [revealedCount, setRevealedCount] = useState(shouldUseSimulatedPlayback ? 0 : selectedMessages.length);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldUseSimulatedPlayback || hasEnteredViewport) {
      return;
    }

    const tool = toolRef.current;

    if (!tool || typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setHasEnteredViewport(true), 0);

      return () => {
        window.clearTimeout(timer);
      };
    }

    if (isElementInPlaybackRange(tool)) {
      const timer = window.setTimeout(() => setHasEnteredViewport(true), 0);

      return () => {
        window.clearTimeout(timer);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setHasEnteredViewport(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.2,
      },
    );

    observer.observe(tool);

    return () => {
      observer.disconnect();
    };
  }, [hasEnteredViewport, shouldUseSimulatedPlayback]);

  useEffect(() => {
    if (!shouldAnimateThread || selectedMessages.length === 0) {
      return;
    }

    let elapsedMs = 0;
    const timers: number[] = [];
    const sequenceId = animationSequenceRef.current + 1;

    animationSequenceRef.current = sequenceId;

    selectedMessages.forEach((message, index) => {
      if (message.speaker === "user") {
        timers.push(
          window.setTimeout(() => {
            if (animationSequenceRef.current !== sequenceId) {
              return;
            }

            setTypingMessageId(null);
            setRevealedCount(index + 1);
          }, elapsedMs),
        );

        elapsedMs += USER_SEND_SETTLE_MS;
        return;
      }

      timers.push(
        window.setTimeout(() => {
          if (animationSequenceRef.current !== sequenceId) {
            return;
          }

          setTypingMessageId(message.id);
        }, elapsedMs),
      );

      elapsedMs += getAssistantTypingDuration(message.text, revealDelayMs);

      timers.push(
        window.setTimeout(() => {
          if (animationSequenceRef.current !== sequenceId) {
            return;
          }

          setTypingMessageId(null);
          setRevealedCount(index + 1);
        }, elapsedMs),
      );

      elapsedMs += ASSISTANT_REPLY_SETTLE_MS;
    });

    return () => {
      animationSequenceRef.current += 1;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [revealDelayMs, resolvedSelectedCategoryId, selectedMessages, shouldAnimateThread]);

  useEffect(() => {
    if (!shouldAnimateThread) {
      return;
    }

    if (typeof window === "undefined" || window.matchMedia("(min-width: 64rem)").matches) {
      return;
    }

    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const scrollToLatest = window.setTimeout(() => {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: "smooth",
      });
    }, 60);

    return () => {
      window.clearTimeout(scrollToLatest);
    };
  }, [revealedCount, shouldAnimateThread, typingMessageId, viewportRef]);

  const visibleMessages = shouldUseSimulatedPlayback ? selectedMessages.slice(0, revealedCount) : selectedMessages;
  const typingMessage = useMemo(() => {
    if (!typingMessageId) {
      return null;
    }

    return selectedMessages.find((message) => message.id === typingMessageId && message.speaker === "assistant") ?? null;
  }, [selectedMessages, typingMessageId]);
  const visibleRenderableCount = visibleMessages.length + (typingMessage ? 1 : 0);
  const totalRenderableCount = selectedMessages.length;
  const threadProgress = totalRenderableCount > 0 ? visibleRenderableCount / totalRenderableCount : 1;
  const shouldUseLiveSpacer = shouldUseSimulatedPlayback && totalRenderableCount > 0;
  const threadTopSpacerHeight = shouldUseLiveSpacer
    ? Math.round((1 - Math.min(threadProgress, 1)) * MAX_THREAD_TOP_SPACER_PX)
    : 0;

  if (!selectedCategory) {
    return null;
  }

  const handleSelectCategory = (categoryId: FaqCategoryId) => {
    animationSequenceRef.current += 1;
    setTypingMessageId(null);
    setRevealedCount(0);
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="faq-tool" ref={toolRef}>
      <div className="faq-tool__mobile-nav">
        <div className="faq-tool__mobile-nav-strip scrollbar-hidden">
          <FaqCategoryTabs
            categories={content.categories}
            className="faq-tool__category-list faq-tool__category-list--mobile"
            onSelect={handleSelectCategory}
            panelId={panelId}
            selectedCategoryId={resolvedSelectedCategoryId}
          />
        </div>
      </div>

      <div className="faq-tool__surface">
        <div className="faq-tool__desktop-nav">
          <FaqCategoryTabs
            categories={content.categories}
            className="faq-tool__category-list faq-tool__category-list--desktop"
            onSelect={handleSelectCategory}
            panelId={panelId}
            selectedCategoryId={resolvedSelectedCategoryId}
          />
        </div>

        <div aria-label={`${selectedCategory.label} FAQ thread`} className="faq-tool__conversation" id={panelId} role="tabpanel">
          <div className="faq-tool__thread-label">{selectedCategory.label}</div>

          <div className="faq-tool__thread-shell">
            <div className="faq-tool__thread-scroll-region">
              <div
                aria-label={`${siteFaqChrome.threadAriaLabel}: ${selectedCategory.label}`}
                className="faq-tool__thread-viewport scrollbar-hidden"
                ref={viewportRef}
                role="region"
                tabIndex={0}
              >
                <ol className="faq-tool__thread-list" ref={contentRef}>
                  {threadTopSpacerHeight > 0 ? (
                    <li
                      aria-hidden="true"
                      className="faq-tool__message-spacer"
                      style={{ height: `${threadTopSpacerHeight}px` }}
                    />
                  ) : null}

                  {visibleMessages.map((message) => {
                    return (
                      <li
                        className="faq-tool__message-row"
                        data-animate={shouldAnimateThread ? "true" : "false"}
                        data-speaker={message.speaker}
                        key={message.id}
                      >
                        {message.speaker === "user" ? (
                          <>
                            <Image
                              alt=""
                              aria-hidden="true"
                              className="faq-tool__user-avatar"
                              height={siteFaqChrome.userAvatar.height}
                              src={siteFaqChrome.userAvatar.src}
                              width={siteFaqChrome.userAvatar.width}
                            />

                            <div className="faq-tool__message-stack">
                              <span className="faq-tool__message-role">{selectedCategory.roleLabel}</span>
                              <p className="faq-tool__bubble faq-tool__bubble--user" data-animate={shouldAnimateThread ? "true" : "false"}>
                                <span className="faq-tool__bubble-text">{message.text}</span>
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                          <div className="faq-tool__assistant-stack">
                            {message.assistantLabel ? (
                              <span className="faq-tool__assistant-label">
                                <FaqAssistantLabelIcon className="faq-tool__assistant-label-icon" />
                                <span>{message.assistantLabel}</span>
                              </span>
                            ) : null}
                              <p className="faq-tool__bubble faq-tool__bubble--assistant" data-animate={shouldAnimateThread ? "true" : "false"}>
                              <span className="faq-tool__bubble-text">{message.text}</span>
                            </p>
                          </div>
                            <AiIcon className="faq-tool__assistant-avatar" />
                          </>
                        )}
                      </li>
                    );
                  })}

                  {typingMessage ? (
                    <li
                      className="faq-tool__message-row faq-tool__message-row--typing"
                      data-animate={shouldAnimateThread ? "true" : "false"}
                      data-speaker="assistant"
                      key={`${typingMessage.id}-typing`}
                    >
                      <p
                        aria-label="Doow AI is typing"
                        className="faq-tool__bubble faq-tool__bubble--assistant faq-tool__bubble--typing"
                        data-animate={shouldAnimateThread ? "true" : "false"}
                      >
                        <span aria-hidden="true" className="faq-tool__typing-dots">
                          <span className="faq-tool__typing-dot" />
                          <span className="faq-tool__typing-dot" />
                          <span className="faq-tool__typing-dot" />
                        </span>
                      </p>
                      <AiIcon className="faq-tool__assistant-avatar" />
                    </li>
                  ) : null}
                </ol>
              </div>

              <div aria-hidden="true" className="faq-tool__rail-shell">
                <ScrollThumbRail
                  className="faq-tool__rail"
                  hidden={thumbState.hidden}
                  offsetPercentage={thumbState.offsetPercentage}
                  orientation="vertical"
                  sizePercentage={thumbState.sizePercentage}
                />
              </div>
            </div>

            <div className="faq-tool__sticky-cta">
              <span className="faq-tool__sticky-copy">{siteFaqChrome.stickyPrompt}</span>

              <Button asChild className="faq-tool__sticky-button" size="base" variant="secondary">
                <Link href={siteFaqChrome.stickyCtaHref}>{siteFaqChrome.stickyCtaLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
