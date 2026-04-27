export type FaqCategoryId = string;
export type FaqRoleLabel = string;
export type FaqMessageSpeaker = "user" | "assistant";

export interface FaqThreadMessage {
  id: string;
  speaker: FaqMessageSpeaker;
  text: string;
}

export interface FaqInteractionConfig {
  mode?: "static" | "simulated";
  revealDelayMs?: number;
}

export interface FaqCategory {
  id: FaqCategoryId;
  label: string;
  roleLabel: FaqRoleLabel;
  messages: readonly FaqThreadMessage[];
}

export interface FaqSectionContent {
  categories: readonly FaqCategory[];
  initialSelectedCategoryId?: FaqCategoryId;
  interaction?: FaqInteractionConfig;
}
