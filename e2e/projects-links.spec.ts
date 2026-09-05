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
