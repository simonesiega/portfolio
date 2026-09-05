import type {APIRequestContext} from "@playwright/test";

export async function getSitemapUrls(request: APIRequestContext) {
  const response = await request.get("/sitemap.xml");

  if (!response.ok()) {
    throw new Error(`Sitemap request failed with status ${response.status()}.`);
  }

  const xml = await response.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => new URL(match[1]!));

  if (urls.length === 0) {
    throw new Error("Sitemap does not contain any routes.");
  }

  if (new Set(urls.map((url) => url.href)).size !== urls.length) {
    throw new Error("Sitemap contains duplicate routes.");
  }

  return urls;
}

export async function getAppRoutes(request: APIRequestContext) {
  return (await getSitemapUrls(request)).map((url) => url.pathname);
}

export async function getProjectRoutes(request: APIRequestContext) {
  return (await getAppRoutes(request)).filter((route) => route.startsWith("/projects/"));
}
