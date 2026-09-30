import {expect, test} from "@playwright/test";
import {getProjectRoutes} from "./helpers/sitemap";

const projectContentLinksHeading = "Links";

test("project navigation resets scroll before rendering the case study", async ({page}) => {
  await page.setViewportSize({width: 375, height: 400});
  await page.goto("/projects");

  const caseStudyLinks = page.getByRole("link", {name: /^Open case study /i});
  await expect(caseStudyLinks.first()).toBeVisible();

  const caseStudyLink = caseStudyLinks.last();
  const href = await caseStudyLink.getAttribute("href");
  const projectTitle = (await caseStudyLink.textContent())?.trim();

  expect(href).toMatch(/^\/projects\/[a-z0-9-]+$/);
  expect(projectTitle).toBeTruthy();

  await caseStudyLink.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await caseStudyLink.click();
  await expect(page).toHaveURL(href!);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.getByRole("heading", {name: projectTitle!, level: 1})).toBeVisible();
});

test("every project case study renders its content links", async ({page, request}) => {
  const projectRoutes = await getProjectRoutes(request);

  expect(projectRoutes.length).toBeGreaterThan(0);

  for (const route of projectRoutes) {
    await test.step(route, async () => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      const heading = page.getByRole("heading", {name: projectContentLinksHeading});
      const linksSection = page.locator("section", {has: heading});

      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
      await expect(linksSection.getByRole("link").first()).toBeVisible();
    });
  }
});

for (const slug of ["codex-limits", "cfg-parser"]) {
  test(`gallery reserves its final size before ${slug} loads`, async ({page}) => {
    await page.emulateMedia({reducedMotion: "reduce"});
    let releaseImages!: () => void;
    const imagesReady = new Promise<void>((resolve) => {
      releaseImages = resolve;
    });
    await page.route("**/*", async (route) => {
      if (route.request().resourceType() === "image") await imagesReady;
      await route.continue();
    });
    try {
      await page.goto(`/projects/${slug}`, {waitUntil: "domcontentloaded"});
      const image = page.locator("figure > div img").first();
      await expect(image).toHaveJSProperty("naturalWidth", 0);
      const before = await image.boundingBox();
      expect(before).not.toBeNull();
      releaseImages();
      await image.evaluate((element) => (element as HTMLImageElement).decode());
      const after = await image.boundingBox();
      expect(after?.width).toBeCloseTo(before!.width, 1);
      // The image optimizer rounds resized dimensions to whole pixels.
      expect(after?.height).toBeCloseTo(before!.height, 0);
    } finally {
      releaseImages();
    }
  });
}

test("multi-image project galleries switch the selected image", async ({page, request}) => {
  const projectRoutes = await getProjectRoutes(request);
  let testedGallery = false;

  for (const route of projectRoutes) {
    await page.goto(route);

    const previews = page.getByRole("group", {name: "Project image previews"}).getByRole("button");

    if ((await previews.count()) < 2) {
      continue;
    }

    await test.step(route, async () => {
      testedGallery = true;
      const selectedImage = page.locator("figure > div img").first();
      const initialSource = await selectedImage.getAttribute("src");
      const nextPreview = previews.nth(1);

      await nextPreview.click();
      await expect(nextPreview).toHaveAttribute("aria-pressed", "true");
      await expect.poll(() => selectedImage.getAttribute("src")).not.toBe(initialSource);
    });
  }

  expect(testedGallery, "Expected at least one project with a multi-image gallery").toBe(true);
});
