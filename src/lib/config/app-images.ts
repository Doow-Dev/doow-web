import BambooSVG from "@/assets/svg/Bamboo"
import DeelSVG from "@/assets/svg/Deel"
import GoogleSVG from "@/assets/svg/Google"
import GustoSVG from "@/assets/svg/Gusto"
import NetSuiteSVG from "@/assets/svg/NetSuite"
import OktaSVG from "@/assets/svg/Okta"
import OneLoginSVG from "@/assets/svg/OneLogin"
import PlaidSVG from "@/assets/svg/Plaid"
import QuickBooksSVG from "@/assets/svg/QuickBooks"
import SageSVG from "@/assets/svg/Sage"
import WindowsSVG from "@/assets/svg/Windows"
import YapilySVG from "@/assets/svg/Yapily"
import ZohoSVG from "@/assets/svg/Zoho"

export const AppImages = {
    integration: {
      Bamboo: BambooSVG,
      Okta: OktaSVG,
      Deel: DeelSVG,
      Google: GoogleSVG,
      Gusto: GustoSVG,
      NetSuite: NetSuiteSVG,
      Plaid: PlaidSVG,
      QuickBooks: QuickBooksSVG,
      Sage: SageSVG,
      Windows: WindowsSVG,
      Yapily: YapilySVG,
      Zoho: ZohoSVG,
      OneLogin: OneLoginSVG,
    },
    demos: {
        dashboard: '/demos/screenshot.png',
        bankingworkflows: '/demos/bankingworkflows.png',
        sendmoney: '/demos/sendmoney.png',
        budgeting: '/demos/budgetinghome.png',
        bankingcards: '/demos/bankingcards.png',
        contracthome: '/demos/contracthome.jpg',
        allapplications: '/demos/allapplications.png',
    },
    logos: {
        fullDoowLogo: '/logos/doowFull.svg',
        zoom: '/logos/zoom.svg',
        notion: '/logos/notion.svg',
        teams: '/logos/teams.svg',
        slack: '/logos/slack.svg',
    },
    profiles: {
      afro: '/profiles/afro-hair.jpeg',
      aiony: '/profiles/aiony.jpg',
      anthony: '/profiles/anthony.jpg',
      ayo: '/profiles/ayo.jpg',
      joseph: '/profiles/joseph.jpg',
      jurica: '/profiles/jurica.jpg',
      mathias: '/profiles/mathias.jpg',
      micheal: '/profiles/michael.jpg',
      prince: '/profiles/prince.jpg',
      lupita: '/profiles/russian-lady.jpg',
      lucas: '/profiles/headtie-man.jpeg',
      thomas: '/profiles/spec-man.jpeg',
    },
    flags: {
      usa: '/flags/usa.svg',
      brazil: '/flags/brazil.jpg',
      britain: '/flags/britain.png',
      china: '/flags/china.jpg',
      australia: '/flags/australia.jpg',
    }
  } as const

  export const INTEGRATION_ROWS = {
    row1: ["Bamboo", "Gusto", "NetSuite", "QuickBooks", "Plaid", "Sage", "Windows", "Okta", "Zoho", "OneLogin", "Deel", "Google",  "Yapily"],
    row2: ["Bamboo", "Gusto", "NetSuite", "QuickBooks", "Plaid", "Sage", "Windows", "Okta", "Zoho", "OneLogin", "Deel", "Google",  "Yapily"]
  } as const
  
  export type IntegrationKey = keyof typeof AppImages.integration
  