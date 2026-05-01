"use client";

import Image from "next/image";

import { IntegrationOrbitCard } from "@/app/(landing)/_components/integrations/components/integration-orbit-card";
import { bankingAndAccountingIntegrationCard } from "@/app/(landing)/_components/integrations/content";
import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { expensesPageContent } from "@/app/(site-pages)/expenses/content";
import type {
  ExpensesSpendSourceItem,
  ExpensesSpendSourceVisualId,
} from "@/app/(site-pages)/expenses/content/spend-sources-content";
import { ProgressiveSplitShell, type ProgressiveSplitItem } from "@/components/layout/shared";
import { SectionHeading } from "@/components/system";
import { cn } from "@/lib/utils";

type ExpensesSpendSourceShellItem = ExpensesSpendSourceItem & ProgressiveSplitItem<ExpensesSpendSourceVisualId>;

function ExpensesSpendSourceIcon({ item }: { item: ExpensesSpendSourceItem }) {
  const iconSrc =
    item.icon === "cards"
      ? "/assets/expenses-card-icon.svg"
      : item.icon === "transfers"
        ? "/assets/expenses-bank-transfer-icon.svg"
        : "/assets/expenses-accounting-icon.svg";
  const iconWidth = item.icon === "ledger" ? 24 : 22;

  return (
    <Image
      alt=""
      className="expenses-spend__card-icon-svg expenses-spend__card-icon-svg--asset"
      height={22}
      src={iconSrc}
      width={iconWidth}
    />
  );
}

function ExpensesSpendVisual({ item }: { item: ExpensesSpendSourceShellItem }) {
  const activeOrbitViewId = item.visualId === "banking" ? "banking" : item.visualId === "accounting" ? "accounting" : null;

  return (
    <div
      className={cn(
        "expenses-spend__visual-window",
        item.visualId !== "cards" && "expenses-spend__visual-window--orbit",
      )}
    >
      {item.visualId === "cards" ? (
        <div className="expenses-spend__feature-card">
          <Image alt="" className="expenses-spend__feature-card-logo" height={22} src="/assets/expenses-visual-logo.svg" width={72} />

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
  );
}

export function ExpensesSpendSourcesSection() {
  const section = expensesPageContent.spendSources;
  const items: ExpensesSpendSourceShellItem[] = section.items.map(
    (item) =>
      ({
        ...item,
        description: item.description,
        id: item.visualId,
        indicator: <ExpensesSpendSourceIcon item={item} />,
        title: item.title,
      }) satisfies ExpensesSpendSourceShellItem,
  );

  return (
    <section aria-labelledby="expenses-spend-sources-heading" className="expenses-spend" id={section.id}>
      <SitePageSectionShell className="expenses-spend__shell" section={section.id}>
        <ProgressiveSplitShell<ExpensesSpendSourceVisualId, ExpensesSpendSourceShellItem>
          classNames={{
            contentColumn: "expenses-spend__copy",
            contentPanel: "expenses-spend__content-panel",
            item: "expenses-spend__card",
            itemButton: "expenses-spend__card-button",
            itemCopy: "expenses-spend__card-copy",
            itemDescription: "expenses-spend__card-description",
            itemIndicator: "expenses-spend__card-icon",
            itemList: "expenses-spend__cards",
            itemTitle: "expenses-spend__card-title",
            layout: "expenses-spend__layout",
            stageColumn: "expenses-spend__stage-column",
            stageMotion: "expenses-spend__visual-motion",
            stagePanel: "expenses-spend__stage-panel",
            stageSurface: "expenses-spend__visual",
          }}
          defaultItemId={section.defaultSelectedVisualId}
          header={
            <SectionHeading
              className="expenses-spend__heading"
              description={section.description}
              descriptionVariant="md"
              headingTag="h2"
              stackClassName="expenses-spend__heading-stack"
              title={<span id="expenses-spend-sources-heading">{section.title}</span>}
            />
          }
          items={items}
          listAriaLabel="Expense source views"
          renderStage={(item) => <ExpensesSpendVisual item={item} />}
        />
      </SitePageSectionShell>
    </section>
  );
}
