import {expect, test} from "@playwright/test";
import {appConfig} from "../src/lib/config/app-config";
import {getSitemapUrls} from "./helpers/sitemap";

function normalizeUrl(value: string) {
  return new URL(value).href;
}

test("every sitemap route publishes complete canonical and social metadata", async ({
  page,
  request,
}) => {
  const sitemapUrls = await getSitemapUrls(request);
  const socialImagePaths = new Set<string>();

  for (const sitemapUrl of sitemapUrls) {
    await test.step(sitemapUrl.pathname, async () => {
      const response = await page.goto(sitemapUrl.pathname);
      expect(response?.status()).toBe(200);

      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      const openGraphTitle = await page
        .locator('meta[property="og:title"]')
        .getAttribute("content");
      const openGraphDescription = await page
        .locator('meta[property="og:description"]')
        .getAttribute("content");
      const openGraphUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
      const openGraphImage = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");
      const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute("content");

      expect(title.trim().length).toBeGreaterThan(0);
      expect(description?.trim().length).toBeGreaterThan(0);
      expect(await page.locator('meta[name="application-name"]').getAttribute("content")).toBe(
        `${appConfig.owner.name} Portfolio`
      );
      expect(await page.locator('meta[name="author"]').getAttribute("content")).toBe(
        appConfig.owner.name
      );
      expect(await page.locator('meta[name="creator"]').getAttribute("content")).toBe(
        appConfig.owner.name
      );
      expect(await page.locator('meta[name="publisher"]').getAttribute("content")).toBe(
        appConfig.owner.name
      );
      expect(await page.locator('meta[name="robots"]').getAttribute("content")).toBe(
        "index, follow"
      );
      expect(await page.locator('link[rel="icon"]').getAttribute("href")).toBe(
        appConfig.metadata.iconPath
      );
      expect(canonical).not.toBeNull();
      expect(normalizeUrl(canonical!)).toBe(sitemapUrl.href);
      expect(openGraphTitle).toBe(title);
      expect(openGraphDescription).toBe(description);
      expect(normalizeUrl(openGraphUrl!)).toBe(sitemapUrl.href);
      expect(await page.locator('meta[property="og:type"]').getAttribute("content")).toBe(
        "website"
      );
      expect(await page.locator('meta[property="og:locale"]').getAttribute("content")).toBe(
        appConfig.metadata.locale
      );
      expect(await page.locator('meta[property="og:site_name"]').getAttribute("content")).toBe(
        appConfig.owner.name
      );
      expect(await page.locator('meta[property="og:image:alt"]').getAttribute("content")).toBe(
        `${appConfig.owner.name} portfolio preview`
      );
      expect(await page.locator('meta[property="og:image:type"]').getAttribute("content")).toBe(
        "image/png"
      );
      expect(await page.locator('meta[name="twitter:card"]').getAttribute("content")).toBe(
        "summary_large_image"
      );
      expect(await page.locator('meta[name="twitter:title"]').getAttribute("content")).toBe(title);
      expect(await page.locator('meta[name="twitter:description"]').getAttribute("content")).toBe(
        description
      );
      expect(await page.locator('meta[name="twitter:creator"]').getAttribute("content")).toBe(
        appConfig.social.xHandle
      );
      expect(await page.locator('meta[name="twitter:image:alt"]').getAttribute("content")).toBe(
        `${appConfig.owner.name} portfolio preview`
      );
      expect(openGraphImage).not.toBeNull();
      expect(twitterImage).not.toBeNull();

      for (const imageUrl of [openGraphImage!, twitterImage!]) {
        const parsedImageUrl = new URL(imageUrl);
        expect(parsedImageUrl.origin).toBe(sitemapUrl.origin);
        socialImagePaths.add(`${parsedImageUrl.pathname}${parsedImageUrl.search}`);
      }
    });
  }

  for (const imagePath of socialImagePaths) {
    const imageResponse = await request.get(imagePath);
    expect(imageResponse.status()).toBe(200);
    expect(imageResponse.headers()["content-type"]).toContain("image/png");
  }

  const iconResponse = await request.get(appConfig.metadata.iconPath);
  expect(iconResponse.status()).toBe(200);
  expect(iconResponse.headers()["content-type"]).toContain("image/svg+xml");
});

test("robots points crawlers to the canonical sitemap", async ({request}) => {
  const sitemapUrls = await getSitemapUrls(request);
  const siteOrigin = sitemapUrls[0]!.origin;
  const response = await request.get("/robots.txt");
  const body = await response.text();

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/plain");
  expect(body).toContain("User-Agent: *");
  expect(body).toContain("Allow: /");
  expect(body).toContain(`Host: ${siteOrigin}`);
  expect(body).toContain(`Sitemap: ${siteOrigin}/sitemap.xml`);
});

test("not-found responses are excluded from indexing and canonical URLs", async ({page}) => {
  const response = await page.goto("/definitely-not-a-real-route");
  const title = await page.title();
  const description = await page.locator('meta[name="description"]').getAttribute("content");

  expect(response?.status()).toBe(404);
  expect(await page.locator('meta[name="robots"]').first().getAttribute("content")).toContain(
    "noindex"
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
  expect(await page.locator('meta[property="og:title"]').getAttribute("content")).toBe(title);
  expect(await page.locator('meta[property="og:description"]').getAttribute("content")).toBe(
    description
  );
  expect(await page.locator('meta[name="twitter:title"]').getAttribute("content")).toBe(title);
});
