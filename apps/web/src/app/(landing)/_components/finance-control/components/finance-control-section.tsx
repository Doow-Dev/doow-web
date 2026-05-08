import type { ComponentType, SVGProps, ReactNode } from "react";

import { BillIcon } from "@/components/custom/icons/bill-icon";
import { EyeIcon } from "@/components/custom/icons/eye-icon";
import { GrayBulbIcon } from "@/components/custom/icons/gray-bulb-icon";
import { LoopIcon } from "@/components/custom/icons/loop-icon";
import { OfficeIcon } from "@/components/custom/icons/office-icon";

import { financeControlSectionContent, type FinanceControlCardIcon } from "../content";
import { SectionHeading } from "@/components/system";

export interface FinanceControlSectionProps {
  Shell: ComponentType<{ children: ReactNode }>;
}

const financeControlIcons: Record<FinanceControlCardIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  bill: BillIcon,
  eye: EyeIcon,
  grayBulb: GrayBulbIcon,
  loop: LoopIcon,
  office: OfficeIcon,
};

export function FinanceControlSection({ Shell }: FinanceControlSectionProps) {
  const financeControl = financeControlSectionContent;

  return (
    <section aria-labelledby="finance-control-heading" className="finance-control" id={financeControl.id}>
      <Shell>
        <div className="finance-control__layout">
          <SectionHeading
            className="finance-control__heading"
            description={financeControl.description}
            descriptionClassName="max-w-full"
            headingTag="h2"
            stackClassName="finance-control__heading-stack"
            title={<span id="finance-control-heading">{financeControl.title}</span>}
            titleClassName="max-w-full"
          />

          <ul className="finance-control__grid">
            {financeControl.cards.map((card) => {
              const Icon = financeControlIcons[card.icon];

              return (
                <li className="finance-control__card" data-tone={card.tone} key={card.title}>
                  <span aria-hidden="true" className="finance-control__icon-wrap">
                    <Icon className="finance-control__icon" />
                  </span>
                  <div className="finance-control__card-copy">
                    <h3 className="finance-control__card-title">{card.title}</h3>
                    <p className="finance-control__card-description">{card.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Shell>
    </section>
  );
}
