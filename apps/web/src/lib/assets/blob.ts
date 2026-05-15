const DEFAULT_BLOB_BASE_URL = "https://landingpageassests.blob.core.windows.net/images";

function getBlobBaseUrl() {
  return (process.env.NEXT_PUBLIC_BLOB_BASE_URL || DEFAULT_BLOB_BASE_URL).replace(/\/+$/, "");
}

export function assetUrl(path: string) {
  const cleanPath = path.replace(/^\/+/, "");

  return `${getBlobBaseUrl()}/${cleanPath}`;
}

export function videoAsset(videoFile: string, posterFile: string) {
  return {
    poster: assetUrl(posterFile),
    src: assetUrl(videoFile),
  };
}
