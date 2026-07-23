const developmentSiteUrl = "http://localhost:3000";

export function getSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

  if (!configuredSiteUrl) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Set NEXT_PUBLIC_SITE_URL or SITE_URL before building production metadata.");
    }

    return new URL(developmentSiteUrl);
  }

  try {
    const siteUrl = new URL(configuredSiteUrl);
    const usesHttp = siteUrl.protocol === "http:" || siteUrl.protocol === "https:";

    if (!usesHttp || siteUrl.username || siteUrl.password) {
      throw new Error();
    }

    return new URL(siteUrl.origin);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL or SITE_URL must be a valid absolute URL using HTTP or HTTPS."
    );
  }
}

export function getSiteOrigin() {
  return getSiteUrl().origin;
}
