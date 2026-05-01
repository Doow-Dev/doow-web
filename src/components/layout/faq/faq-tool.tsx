"use client";

import type { KeyboardEvent, SVGProps } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ScrollThumbRail, useScrollThumb } from "@/components/layout/shared";
import { AiIcon } from "@/components/custom/icons/ai-icon";
import { Button } from "@/components/system";

import { siteFaqChrome } from "./constants";
import type { FaqCategory, FaqCategoryId, FaqSectionContent } from "./types";

export interface FaqToolProps {
  content: FaqSectionContent;
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
  const resolvedSelectedCategoryId = selectedCategory?.id ?? "";
  const { contentRef, thumbState, viewportRef } = useScrollThumb<HTMLDivElement, HTMLOListElement>({
    minSizePercentage: 18,
    orientation: "vertical",
  });

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTop = 0;
    viewport.scrollLeft = 0;
  }, [resolvedSelectedCategoryId, viewportRef]);

  if (!selectedCategory) {
    return null;
  }

  return (
    <div className="faq-tool">
      <div className="faq-tool__mobile-nav">
        <div className="faq-tool__mobile-nav-strip scrollbar-hidden">
          <FaqCategoryTabs
            categories={content.categories}
            className="faq-tool__category-list faq-tool__category-list--mobile"
            onSelect={setSelectedCategoryId}
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
            onSelect={setSelectedCategoryId}
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
                tabIndex={0}
              >
                <ol className="faq-tool__thread-list" ref={contentRef}>
                  {selectedCategory.messages.map((message) => (
                    <li className="faq-tool__message-row" data-speaker={message.speaker} key={message.id}>
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
                            <p className="faq-tool__bubble faq-tool__bubble--user">{message.text}</p>
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
                            <p className="faq-tool__bubble faq-tool__bubble--assistant">{message.text}</p>
                          </div>
                          <AiIcon className="faq-tool__assistant-avatar" />
                        </>
                      )}
                    </li>
                  ))}
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
