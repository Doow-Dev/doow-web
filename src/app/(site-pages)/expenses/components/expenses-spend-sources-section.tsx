"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import Image from "next/image";

import { bankingAndAccountingIntegrationCard } from "@/app/(landing)/_components/integrations/content";
import { IntegrationOrbitCard } from "@/app/(landing)/_components/integrations/components/integration-orbit-card";
import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { expensesPageContent } from "@/app/(site-pages)/expenses/content";
import type { ExpensesSpendSourceVisualId } from "@/app/(site-pages)/expenses/content/spend-sources-content";
import { Card, SectionHeading } from "@/components/system";
import { cn } from "@/lib/utils";

function getNextIndex(currentIndex: number, total: number, direction: "next" | "previous") {
  if (direction === "next") {
    return (currentIndex + 1) % total;
  }

  return (currentIndex - 1 + total) % total;
}

function handleSpendSourceKeyDown(
  event: KeyboardEvent<HTMLButtonElement>,
  count: number,
  index: number,
  onSelect: (visualId: ExpensesSpendSourceVisualId) => void,
  visualIds: readonly ExpensesSpendSourceVisualId[],
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
    nextIndex = getNextIndex(index, count, "next");
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    nextIndex = getNextIndex(index, count, "previous");
  }

  if (event.key === "Home") {
    nextIndex = 0;
  }

  if (event.key === "End") {
    nextIndex = count - 1;
  }

  tabs[nextIndex]?.focus();

  const nextVisualId = visualIds[nextIndex];

  if (nextVisualId) {
    onSelect(nextVisualId);
  }
}

export function ExpensesSpendSourcesSection() {
  const section = expensesPageContent.spendSources;
  const [selectedVisualId, setSelectedVisualId] = useState<ExpensesSpendSourceVisualId>(section.defaultSelectedVisualId);
  const visualIds = section.items.map((item) => item.visualId);
  const activeOrbitViewId = selectedVisualId === "banking" ? "banking" : selectedVisualId === "accounting" ? "accounting" : null;
  const visualPanelId = "expenses-spend-sources-visual-panel";

  return (
    <section aria-labelledby="expenses-spend-sources-heading" className="expenses-spend" id={section.id}>
      <SitePageSectionShell className="expenses-spend__shell" section={section.id}>
        <div className="expenses-spend__layout">
          <div className="expenses-spend__copy">
            <SectionHeading
              className="expenses-spend__heading"
              description={section.description}
              descriptionVariant="md"
              headingTag="h2"
              stackClassName="expenses-spend__heading-stack"
              title={<span id="expenses-spend-sources-heading">{section.title}</span>}
            />

            <div aria-label="Expense source views" className="expenses-spend__cards" role="tablist">
              {section.items.map((item, index) => {
                const iconSrc =
                  item.icon === "cards"
                    ? "/assets/expenses-card-icon.svg"
                    : item.icon === "transfers"
                      ? "/assets/expenses-bank-transfer-icon.svg"
                      : "/assets/expenses-accounting-icon.svg";
                const iconWidth = item.icon === "ledger" ? 24 : 22;

                return (
                  <button
                    aria-controls={visualPanelId}
                    aria-selected={selectedVisualId === item.visualId}
                    className="expenses-spend__card"
                    data-state={selectedVisualId === item.visualId ? "active" : "inactive"}
                    key={item.title}
                    onClick={() => setSelectedVisualId(item.visualId)}
                    onKeyDown={(event) =>
                      handleSpendSourceKeyDown(event, section.items.length, index, setSelectedVisualId, visualIds)
                    }
                    role="tab"
                    tabIndex={selectedVisualId === item.visualId ? 0 : -1}
                    type="button"
                  >
                    <span aria-hidden="true" className="expenses-spend__card-icon">
                      <Image
                        alt=""
                        className="expenses-spend__card-icon-svg expenses-spend__card-icon-svg--asset"
                        height={22}
                        src={iconSrc}
                        width={iconWidth}
                      />
                    </span>
                    <div className="expenses-spend__card-copy">
                      <h3 className="expenses-spend__card-title">{item.title}</h3>
                      <p className="expenses-spend__card-description">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Card
            aria-labelledby="expenses-spend-sources-heading"
            className="expenses-spend__visual"
            id={visualPanelId}
            padding="lg"
            role="tabpanel"
          >
            <div
              className={cn(
                "expenses-spend__visual-window",
                selectedVisualId !== "cards" && "expenses-spend__visual-window--orbit",
              )}
            >
              {selectedVisualId === "cards" ? (
                <div className="expenses-spend__feature-card">
                  <Image
                    alt=""
                    className="expenses-spend__feature-card-logo"
                    height={22}
                    src="/assets/expenses-visual-logo.svg"
                    width={72}
                  />

                  <div className="expenses-spend__feature-card-copy">
                    <p className="expenses-spend__feature-card-number">**** **** **** 3090</p>

                    <div className="expenses-spend__feature-card-meta">
                      <div className="expenses-spend__feature-card-meta-block">
                        <span className="expenses-spend__feature-card-meta-label">VALID THRU</span>
                        <span className="expenses-spend__feature-card-meta-value">**/**</span>
                      </div>
                      <div className="expenses-spend__feature-card-meta-block">
                        <span className="expenses-spend__feature-card-meta-label">CVC</span>
                        <span className="expenses-spend__feature-card-meta-value">***</span>
                      </div>
                    </div>

                    <p className="expenses-spend__feature-card-name">John Doe</p>
                  </div>

                  <div aria-hidden="true" className="expenses-spend__feature-card-pattern">
                    <Image
                      alt=""
                      className="expenses-spend__feature-card-pattern-image"
                      height={310}
                      src="/assets/expenses-visual-pattern-frame.png"
                      width={208}
                    />
                  </div>
                </div>
              ) : activeOrbitViewId ? (
                <IntegrationOrbitCard
                  card={bankingAndAccountingIntegrationCard}
                  className="expenses-spend__orbit-visual-card"
                  hideTabs
                  maxVisibleOrbitApps={4}
                  viewId={activeOrbitViewId}
                />
              ) : null}
            </div>
          </Card>
        </div>
      </SitePageSectionShell>
    </section>
  );
}
