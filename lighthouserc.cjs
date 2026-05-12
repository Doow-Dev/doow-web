// eslint-disable-next-line @typescript-eslint/no-require-imports -- LHCI config files run as CommonJS.
const { getLighthouseUrls } = require("./lighthouse-routes.cjs");

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--headless=new --no-sandbox",
        formFactor: "mobile",
        screenEmulation: {
          disabled: false,
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true,
        },
        throttlingMethod: "simulate",
      },
      url: getLighthouseUrls(),
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:performance": ["error", { minScore: 0.85 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
