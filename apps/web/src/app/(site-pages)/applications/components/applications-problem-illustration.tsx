import {
  ApplicationsCostSpiralsIllustration,
  ApplicationsDuplicateToolsIllustration,
  ApplicationsVisibilityBoardIllustration,
  ProgressiveSplitPlaceholderIllustration,
} from "@/components/custom/illustrations/applications-illustrations";
import {
  applicationsProblemAvatarAssetMap,
  applicationsProblemCostBars,
  applicationsProblemCostLinePoints,
  applicationsProblemCostMarkers,
  applicationsProblemDuplicateToolsApps,
  applicationsProblemDuplicateToolsNodes,
  applicationsProblemVisibilityAvatarSlots,
} from "@/app/(site-pages)/applications/content/problems-illustrations-content";
import type {
  ApplicationsProblemIllustrationKey,
  ApplicationsProblemIllustrationStatus,
} from "@/app/(site-pages)/applications/content/problems-content";

const classNamePrefix = "applications-problems";

export interface ApplicationsProblemIllustrationProps {
  illustrationKey: ApplicationsProblemIllustrationKey;
  illustrationStatus: ApplicationsProblemIllustrationStatus;
}

export function ApplicationsProblemIllustration({
  illustrationKey,
  illustrationStatus,
}: ApplicationsProblemIllustrationProps) {
  return (
    <div
      aria-hidden="true"
      className="applications-problems__illustration"
      data-illustration-status={illustrationStatus}
      data-problem-illustration={illustrationKey}
    >
      {illustrationKey === "duplicate-tools" ? (
       <ApplicationsDuplicateToolsIllustration
       apps={applicationsProblemDuplicateToolsApps}
       classNamePrefix={classNamePrefix}
       getAppProps={(app) => ({ "data-problem-duplicate-app": app.id })}
       getNodeProps={(node) => ({ "data-problem-duplicate-node": node.id })}
       nodes={applicationsProblemDuplicateToolsNodes}
     />
      ) : null}

      {illustrationKey === "budgets-bleed" ? (
        <ProgressiveSplitPlaceholderIllustration className="applications-problems__placeholder-figure" />
      ) : null}

      {illustrationKey === "visibility-disappears" ? (
        <ApplicationsVisibilityBoardIllustration
          avatarAssetMap={applicationsProblemAvatarAssetMap}
          classNamePrefix={classNamePrefix}
          getSlotProps={(slot) => ({ "data-problem-avatar-slot": slot.id })}
          slots={applicationsProblemVisibilityAvatarSlots}
        />
      ) : null}

      {illustrationKey === "cost-spirals" ? (
        <ApplicationsCostSpiralsIllustration
          bars={applicationsProblemCostBars}
          classNamePrefix={classNamePrefix}
          getBarProps={(bar) => ({ "data-problem-cost-bar": bar.id })}
          getMarkerProps={(marker) => ({ "data-problem-cost-marker": marker.id })}
          linePoints={applicationsProblemCostLinePoints}
          markers={applicationsProblemCostMarkers}
        />
      ) : null}
    </div>
  );
}
