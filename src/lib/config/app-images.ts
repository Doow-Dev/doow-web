export const AppImages = {
    integration: {
      Bamboo: '/integrations/bamboo.svg',
      Deel: '/integrations/deel.svg',
      Google: '/integrations/google.svg',
      Gusto: '/integrations/gusto.svg',
      NetSuite: '/integrations/net-suite.svg',
      Okta: '/integrations/okta.svg',
      OneLogin: '/integrations/one-login.svg',
      Plaid: '/integrations/plaid.svg',
      QuickBooks: '/integrations/quick-books.svg',
      Sage: '/integrations/sage.svg',
      Windows: '/integrations/windows.svg',
      Yapily: '/integrations/yapily.svg',
      Zoho: '/integrations/zoho.svg',
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
      micheal: '/profiles/micheal.jpg',
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
    row1: ["Bamboo", "Google", "NetSuite", "Plaid", "Sage", "Windows", "Zoho", "Deel", "Gusto", "Okta", "OneLogin", "QuickBooks", "Yapily"]
  } as const
  
  export type IntegrationKey = keyof typeof AppImages.integration