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
    return new URL(configuredSiteUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL or SITE_URL must be a valid absolute URL.");
  }
}

export function getSiteOrigin() {
  return getSiteUrl().origin;
}
