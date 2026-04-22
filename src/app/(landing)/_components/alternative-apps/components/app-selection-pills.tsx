import type { KeyboardEvent } from "react";

import type { AppSelectionOption } from "../content";
import { AppLogoAvatar } from "./app-logo-avatar";

export interface AppSelectionPillsProps {
  options: readonly AppSelectionOption[];
  selectedAppId: string;
  panelId: string;
  onSelect: (appId: string) => void;
}

function getNextIndex(currentIndex: number, total: number, direction: "next" | "previous") {
  if (direction === "next") {
    return (currentIndex + 1) % total;
  }

  return (currentIndex - 1 + total) % total;
}

export function AppSelectionPills({ options, selectedAppId, panelId, onSelect }: AppSelectionPillsProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();

    const tablist = event.currentTarget.closest('[role="tablist"]');
    const tabs = tablist ? Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')) : [];

    if (!tabs.length) {
      return;
    }

    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = getNextIndex(index, tabs.length, "next");
    }

    if (event.key === "ArrowLeft") {
      nextIndex = getNextIndex(index, tabs.length, "previous");
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = tabs.length - 1;
    }

    const nextOption = options[nextIndex];
    const nextTab = tabs[nextIndex];

    nextTab?.focus();

    if (nextOption) {
      onSelect(nextOption.id);
    }
  }

  return (
    <div className="alternative-apps__pill-strip">
      <div
        aria-label="Choose an application to compare with alternative tools"
        className="alternative-apps__tablist"
        role="tablist"
      >
        {options.map((option, index) => {
          const isSelected = option.id === selectedAppId;

          return (
            <button
              aria-controls={panelId}
              aria-selected={isSelected}
              className="alternative-apps__tab"
              data-state={isSelected ? "active" : "inactive"}
              id={`alternative-apps-tab-${option.id}`}
              key={option.id}
              onClick={() => onSelect(option.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              role="tab"
              tabIndex={isSelected ? 0 : -1}
              type="button"
            >
              <AppLogoAvatar logoKey={option.logoKey} size="pill" />
              <span className="alternative-apps__tab-label">{option.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
