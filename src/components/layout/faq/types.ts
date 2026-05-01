export type FaqCategoryId = string;
export type FaqRoleLabel = string;
export type FaqMessageSpeaker = "user" | "assistant";

export interface FaqThreadMessage {
  id: string;
  speaker: FaqMessageSpeaker;
  text: string;
  assistantLabel?: string;
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
}
