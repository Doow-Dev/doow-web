import type { ComponentType, ReactNode } from "react";

import { featureSplitSectionContent } from "../content";
import { FeatureSplitShowcase } from "./feature-split-showcase";

export interface FeatureSplitSectionProps {
  Shell: ComponentType<{ children: ReactNode }>;
}

export function FeatureSplitSection({ Shell }: FeatureSplitSectionProps) {
  const featureSplit = featureSplitSectionContent;

  return (
    <section aria-labelledby="feature-split-heading" className="feature-split" id={featureSplit.id}>
      <Shell>
        <FeatureSplitShowcase content={featureSplit} />
      </Shell>
    </section>
  );
}
