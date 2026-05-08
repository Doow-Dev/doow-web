import { siteAssetManifest } from "@/lib/assets/site";

export interface ExpensesHeroCardContent {
  id: string;
  accent: string;
  asset:
    | (typeof siteAssetManifest)["expensesHeroCard1"]
    | (typeof siteAssetManifest)["expensesHeroCard2"]
    | (typeof siteAssetManifest)["expensesHeroCard3"]
    | (typeof siteAssetManifest)["expensesHeroCard4"];
  tone: "peach" | "blue" | "mint" | "violet";
}

export interface ExpensesHeroContent {
  id: string;
  eyebrow: string;
  title: {
    prefix: string;
    accent: string;
  };
  description: {
    beforeBreak: string;
    afterBreak: string;
  };
  cards: readonly ExpensesHeroCardContent[];
}

export const expensesHeroContent = {
  id: "expenses-hero",
  eyebrow: "EXPENSES",
  title: {
    prefix: "See where your software money",
    accent: "actually goes",
  },
  description: {
    beforeBreak: "Every SaaS payment across cards, banks, and accounting",
    afterBreak: "systems in one place.",
  },
  cards: [
    {
      id: "expenses-hero-card-peach",
      accent: "Corporate cards",
      asset: siteAssetManifest.expensesHeroCard1,
      tone: "peach",
    },
    {
      id: "expenses-hero-card-blue",
      accent: "Bank transfers",
      asset: siteAssetManifest.expensesHeroCard2,
      tone: "blue",
    },
    {
      id: "expenses-hero-card-mint",
      accent: "Accounting tools",
      asset: siteAssetManifest.expensesHeroCard3,
      tone: "mint",
    },
    {
      id: "expenses-hero-card-violet",
      accent: "Renewal mapping",
      asset: siteAssetManifest.expensesHeroCard4,
      tone: "violet",
    },
  ] satisfies readonly ExpensesHeroCardContent[],
} as const satisfies ExpensesHeroContent;
