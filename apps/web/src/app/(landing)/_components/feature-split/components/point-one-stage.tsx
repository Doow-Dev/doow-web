import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import type {
  FeatureShowcaseFrame,
  FeatureShowcaseIconSource,
  FeatureShowcaseStatus,
  PointOneDepartmentRow,
  PointOneFeatureContent,
} from "../content";
import { DepartmentIcon } from "@/components/custom/icons/department-icon";
import { GoogleAppIcon } from "@/components/custom/icons/google-app-icon";
import { NotionAppIcon } from "@/components/custom/icons/notion-app-icon";
import { SalesforceAppIcon } from "@/components/custom/icons/salesforce-app-icon";
import { SlackAppIcon } from "@/components/custom/icons/slack-app-icon";
import { cn } from "@/lib/utils";

const stageFrameVariants = {
  enter: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
  },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(4px)",
  },
} as const;

const featureSplitEase = [0.22, 1, 0.36, 1] as const;

const railSlots = 7;
const activeRailIndex = 2;

const appIconMap = {
  department: DepartmentIcon,
  google: GoogleAppIcon,
  notion: NotionAppIcon,
  salesforce: SalesforceAppIcon,
  slack: SlackAppIcon,
} as const;

export interface PointOneStageProps {
  frame: FeatureShowcaseFrame;
  point: PointOneFeatureContent;
  prefersReducedMotion: boolean;
}

function ShowcaseWindowChrome() {
  return (
    <div aria-hidden="true" className="feature-split__window-bar">
      <span className="feature-split__traffic-light feature-split__traffic-light--red" />
      <span className="feature-split__traffic-light feature-split__traffic-light--yellow" />
      <span className="feature-split__traffic-light feature-split__traffic-light--green" />
    </div>
  );
}

function ShowcaseCursor({ frame, prefersReducedMotion }: Pick<PointOneStageProps, "frame" | "prefersReducedMotion">) {
  const positions: Record<FeatureShowcaseFrame, { left: string; top: string; opacity: number }> = {
    "frame-1": {
      left: "22.95%",
      top: "25.5%",
      opacity: 1,
    },
    "frame-2": {
      left: "66.2%",
      top: "61.4%",
      opacity: 1,
    },
    "frame-3": {
      left: "66.2%",
      top: "61.4%",
      opacity: 0,
    },
  };

  return (
    <motion.div
      animate={positions[frame]}
      aria-hidden="true"
      className="feature-split__cursor"
      initial={false}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.5 3.5L15.2 13.1L10.6 14.2L13.4 20.2L10.8 21.4L8.1 15.4L4.5 18.8V3.5Z"
          fill="#0D1016"
          stroke="white"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
        <path d="M14.8 5.4L16.2 3.2" stroke="#0D1016" strokeLinecap="round" strokeWidth="1.6" />
        <path d="M17.5 7.8L20 7.2" stroke="#0D1016" strokeLinecap="round" strokeWidth="1.6" />
        <path d="M16.6 10.9L18.4 12.6" stroke="#0D1016" strokeLinecap="round" strokeWidth="1.6" />
      </svg>
    </motion.div>
  );
}

function DepartmentPill({ color, initials }: Pick<PointOneDepartmentRow, "color" | "initials">) {
  return (
    <span aria-hidden="true" className="feature-split__department-pill" style={{ backgroundColor: color }}>
      <span>{initials}</span>
    </span>
  );
}

function UserAvatarStack({ avatars }: { avatars: readonly { src: string; alt: string }[] }) {
  return (
    <div aria-hidden="true" className="feature-split__avatar-stack">
      {avatars.map((avatar, index) => (
        <Image
          alt={avatar.alt}
          className="feature-split__avatar"
          height={14}
          key={avatar.src}
          src={avatar.src}
          style={{ zIndex: avatars.length - index }}
          unoptimized
          width={14}
        />
      ))}
    </div>
  );
}

function UsersColumn({ row }: { row: PointOneDepartmentRow }) {
  if (row.usersDisplay === "avatars" && row.userAvatars?.length) {
    return <UserAvatarStack avatars={row.userAvatars} />;
  }

  return <span aria-hidden="true" className="feature-split__users-placeholder animate-pulse" />;
}

function ShowcaseIcon({ icon }: { icon: FeatureShowcaseIconSource }) {
  if (icon.kind === "component") {
    const Icon = appIconMap[icon.name];

    return <Icon className="feature-split__application-icon-svg" />;
  }

  return (
    <Image
      alt={icon.alt}
      className="feature-split__application-icon-asset"
      height={12}
      src={icon.src}
      style={{ objectFit: icon.fit ?? "contain" }}
      unoptimized
      width={12}
    />
  );
}

function StatusBadge({ status }: { status: FeatureShowcaseStatus }) {
  return (
    <span
      className={cn(
        "feature-split__status-badge",
        status === "active" ? "feature-split__status-badge--active" : "feature-split__status-badge--inactive"
      )}
    >
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );
}

function DepartmentsTable({ point }: { point: PointOneFeatureContent }) {
  return (
    <div className="feature-split__panel-surface">
      <div className="feature-split__panel-header">
        <h3 className="feature-split__panel-title">{point.title}</h3>
        <p className="feature-split__panel-subtitle">{point.subtitle}</p>
      </div>

      <div className="feature-split__table feature-split__table--departments">
        <div className="feature-split__table-header feature-split__table-header--departments">
          <span>Name</span>
          <span>Users</span>
          <span>App in Use</span>
        </div>

        <div className="feature-split__table-body">
          {point.departments.map((row) => {
            const isSelected = row.id === point.selectedDepartmentId;

            return (
              <motion.div
                animate={isSelected ? { scale: 1.01 } : { scale: 1 }}
                className={cn(
                  "feature-split__table-row feature-split__table-row--departments",
                  isSelected && "feature-split__table-row--selected"
                )}
                key={row.id}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <span className="feature-split__department-name">
                  <DepartmentPill color={row.color} initials={row.initials} />
                  <span>{row.name}</span>
                </span>
                <span className="feature-split__users-cell">
                  <UsersColumn row={row} />
                </span>
                <span className="feature-split__count-cell">{row.applicationCount}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ApplicationsTable({ point }: { point: PointOneFeatureContent }) {
  return (
    <div className="feature-split__panel-surface">
      <div className="feature-split__panel-breadcrumb">
        <span>Department</span>
        <span aria-hidden="true">/</span>
        <span className="feature-split__panel-breadcrumb-current">{point.breadcrumbLabel}</span>
      </div>

      <div className="feature-split__table feature-split__table--applications">
        <div className="feature-split__table-header feature-split__table-header--applications">
          <span>Application</span>
          <span>Seat Type</span>
          <span>Status</span>
        </div>

        <div className="feature-split__table-body">
          {point.applications.map((row, index) => (
            <div
              className={cn(
                "feature-split__table-row feature-split__table-row--applications",
                index === point.applications.length - 1 && "feature-split__table-row--last"
              )}
              key={row.id}
            >
              <span className="feature-split__application-name">
                <span className="feature-split__application-icon">
                  <ShowcaseIcon icon={row.icon} />
                </span>
                <span>{row.name}</span>
              </span>
              <span className="feature-split__seat-type-cell">{row.seatType}</span>
              <span className="feature-split__status-cell">
                <StatusBadge status={row.status} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlankPanel() {
  return <div className="feature-split__panel-surface feature-split__panel-surface--blank" />;
}

function MockNavigationRail({
  expanded,
  point,
  prefersReducedMotion,
}: {
  expanded: boolean;
  point: PointOneFeatureContent;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.aside
      animate={{ width: expanded ? 124 : 38 }}
      className="feature-split__rail"
      initial={false}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="feature-split__rail-inner">
        {Array.from({ length: railSlots }).map((_, index) => {
          const isActive = index === activeRailIndex;

          return (
            <div
              className={cn(
                "feature-split__rail-item",
                isActive && "feature-split__rail-item--active",
                !isActive && "feature-split__rail-item--placeholder"
              )}
              key={`rail-slot-${index}`}
            >
              {isActive ? (
                <>
                  <span className="feature-split__rail-item-icon">
                    <DepartmentIcon className="feature-split__rail-item-icon-svg" />
                  </span>
                  <AnimatePresence>
                    {expanded ? (
                      <motion.span
                        animate={{ opacity: 1 }}
                        className="feature-split__rail-item-copy"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.14 }}
                      >
                        <span className="feature-split__rail-item-label">{point.railLabel}</span>
                        <span className="feature-split__rail-item-count">{point.railCount}</span>
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
}

export function PointOneStage({ frame, point, prefersReducedMotion }: PointOneStageProps) {
  const contentTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: featureSplitEase };

  return (
    <div aria-hidden="true" className="feature-split__stage" data-feature-point-one-stage="true">
      <div className="feature-split__window">
        <ShowcaseWindowChrome />

        <div className="feature-split__window-body">
          <MockNavigationRail expanded={frame === "frame-1"} point={point} prefersReducedMotion={prefersReducedMotion} />

          <div className="feature-split__window-panel">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                animate="center"
                className="feature-split__window-panel-frame"
                exit="exit"
                initial="enter"
                key={frame}
                transition={contentTransition}
                variants={stageFrameVariants}
              >
                {frame === "frame-1" ? <BlankPanel /> : null}
                {frame === "frame-2" ? <DepartmentsTable point={point} /> : null}
                {frame === "frame-3" ? <ApplicationsTable point={point} /> : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <ShowcaseCursor frame={frame} prefersReducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </div>
  );
}
