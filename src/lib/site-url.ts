const productionSiteUrl = "https://simonesiega.com";
const developmentSiteUrl = "http://localhost:3000";

function getFallbackSiteUrl() {
  return process.env.NODE_ENV === "development"
    ? developmentSiteUrl
    : productionSiteUrl;
}

export function getSiteUrl() {
  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;

  try {
    return new URL(configuredSiteUrl ?? getFallbackSiteUrl());
  } catch {
    return new URL(getFallbackSiteUrl());
  }
}

export function getSiteOrigin() {
  return getSiteUrl().origin;
}
