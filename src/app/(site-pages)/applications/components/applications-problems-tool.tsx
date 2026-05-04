"use client";

import { ApplicationsProblemIllustration } from "@/app/(site-pages)/applications/components/applications-problem-illustration";
import type {
  ApplicationsProblemIconKey,
  ApplicationsProblemId,
  ApplicationsProblemsSectionContent,
} from "@/app/(site-pages)/applications/content/problems-content";
import { ChartArrowDownRectangleIcon, SquareStackIcon, TrashIcon, EyeOffIcon } from "@/components/custom/icons";
import { ProgressiveSplitShell, type ProgressiveSplitItem } from "@/components/layout/shared";

const problemIconMap = {
  chart: ChartArrowDownRectangleIcon,
  "eye-off": EyeOffIcon,
  stack: SquareStackIcon,
  trash: TrashIcon,
} as const satisfies Record<ApplicationsProblemIconKey, typeof SquareStackIcon>;

type ApplicationsProblemsSplitItem = ApplicationsProblemsSectionContent["items"][number] &
  ProgressiveSplitItem<ApplicationsProblemId>;

export interface ApplicationsProblemsToolProps {
  content: ApplicationsProblemsSectionContent;
}

export function ApplicationsProblemsTool({ content }: ApplicationsProblemsToolProps) {
  const items = content.items.map((problem) => {
    const Icon = problemIconMap[problem.iconKey];

    return {
      ...problem,
      announcementLabel: problem.label,
      description: problem.description,
      indicator: <Icon className="applications-problems__selector-icon-svg" />,
      title: problem.label,
    } satisfies ApplicationsProblemsSplitItem;
  });

  return (
    <ProgressiveSplitShell
      classNames={{
        contentColumn: "applications-problems__content-column",
        contentPanel: "applications-problems__content-panel",
        item: "applications-problems__selector-item",
        itemButton: "applications-problems__selector-button",
        itemCopy: "applications-problems__selector-copy",
        itemDescription: "applications-problems__selector-description text-body-sm-normal",
        itemIndicator: "applications-problems__selector-icon",
        itemList: "applications-problems__selector-list",
        itemTitle: "applications-problems__selector-label",
        layout: "applications-problems__layout",
        stageColumn: "applications-problems__stage-column",
        stageMotion: "applications-problems__stage-motion",
        stagePanel: "applications-problems__stage-panel",
        stageSurface: "applications-problems__stage",
      }}
      defaultItemId={content.defaultProblemId}
      getPanelProps={(item) => ({ "data-selected-problem-id": item.id })}
      header={
        <div className="applications-problems__intro">
          <h2 className="applications-problems__heading" id="applications-problems-heading">
            {content.title}
          </h2>

          <p className="applications-problems__lede">{content.description}</p>
        </div>
      }
      items={items}
      listAriaLabel="Select a software sprawl problem to preview the matching illustration"
      panelTitle={<h3 className="applications-problems__selector-title">{content.panelTitle}</h3>}
      renderStage={(item) => (
        <ApplicationsProblemIllustration
          illustrationKey={item.illustrationKey}
          illustrationStatus={item.illustrationStatus}
        />
      )}
    />
  );
}
