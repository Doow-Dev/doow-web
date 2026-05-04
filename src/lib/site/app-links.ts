const DEFAULT_DOOW_APP_BASE_URL = "https://dev.doow.co";

function getDoowAppBaseUrl() {
  return (process.env.NEXT_PUBLIC_DOOW_APP_BASE_URL || DEFAULT_DOOW_APP_BASE_URL).replace(/\/+$/, "");
}

function doowAppUrl(path = "") {
  const cleanPath = path.replace(/^\/+/, "");

  return cleanPath ? `${getDoowAppBaseUrl()}/${cleanPath}` : getDoowAppBaseUrl();
}

export const doowAppLinks = {
  getStarted: doowAppUrl("signup"),
  login: doowAppUrl(),
  signUp: doowAppUrl("signup"),
  startFreeTrial: doowAppUrl("signup"),
} as const;
