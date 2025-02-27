import BambooSVG from "@/assets/svgs/Bamboo"
import DeelSVG from "@/assets/svgs/Deel"
import GoogleSVG from "@/assets/svgs/Google"
import GustoSVG from "@/assets/svgs/Gusto"
import NetSuiteSVG from "@/assets/svgs/NetSuite"
import OktaSVG from "@/assets/svgs/Okta"
import OneLoginSVG from "@/assets/svgs/OneLogin"
import PlaidSVG from "@/assets/svgs/Plaid"
import QuickBooksSVG from "@/assets/svgs/QuickBooks"
import SageSVG from "@/assets/svgs/Sage"
import WindowsSVG from "@/assets/svgs/Windows"
import YapilySVG from "@/assets/svgs/Yapily"
import ZohoSVG from "@/assets/svgs/Zoho"

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
      nigeria: '/flags/nigeria.png',
      britain: '/flags/britain.png',
      china: '/flags/kenya.jpg'
    }
  } as const

  export const INTEGRATION_ROWS = {
    row1: ["Bamboo", "Gusto", "NetSuite", "QuickBooks", "Plaid", "Sage", "Windows", "Okta", "Zoho", "OneLogin", "Deel", "Google",  "Yapily"]
  } as const
  
  export type IntegrationKey = keyof typeof AppImages.integration
  