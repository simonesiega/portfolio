import {expect, test} from "@playwright/test";
import {getAppRoutes} from "./helpers/sitemap";

test("fast scrolling reveals landing content without skipping transitions", async ({page}) => {
  await page.setViewportSize({width: 375, height: 500});
  await page.goto("/");

  const sectionReveals = [
    page.getByRole("heading", {name: "EDUCATION"}).locator("../.."),
    page.getByRole("link", {name: "PROJECTS →", exact: true}).locator(".."),
    page.getByRole("link", {name: "WORK →", exact: true}).locator(".."),
    page.getByRole("heading", {name: "ABOUT ME"}).locator(".."),
  ];
  const workReveal = sectionReveals[2]!;
  const aboutReveal = sectionReveals.at(-1)!;
  const interestImageReveals = page.locator(".about-interest-reveal");
  const firstInterestImageReveal = interestImageReveals.first();
  const footerReveal = page.locator("footer").locator("..");

  await workReveal.evaluate((element) => {
    element.addEventListener("transitionstart", (event) => {
      if (event instanceof TransitionEvent && event.propertyName === "opacity") {
        element.setAttribute("data-opacity-transition-started", "true");
      }
    });
  });

  await expect
    .poll(async () => {
      await page.evaluate(() => {
        document.documentElement.scrollTop = document.body.scrollHeight;
      });
      return aboutReveal.evaluate((element) =>
        element.classList.contains("scroll-reveal--visible")
      );
    })
    .toBe(true);
  expect(await interestImageReveals.count()).toBeGreaterThan(0);
  await expect
    .poll(() =>
      interestImageReveals.evaluateAll((elements) =>
        elements.every((element) => element.classList.contains("about-interest-reveal--visible"))
      )
    )
    .toBe(true);
  await expect(footerReveal).toHaveClass(/scroll-reveal--visible/);

  for (const sectionReveal of sectionReveals) {
    await expect(sectionReveal).toHaveClass(/scroll-reveal--visible/);
  }
  await expect(workReveal).toHaveAttribute("data-opacity-transition-started", "true");

  const sectionDelays = await Promise.all(
    sectionReveals.map((sectionReveal) =>
      sectionReveal.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).transitionDelay)
      )
    )
  );
  const aboutDelay = await aboutReveal.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).transitionDelay)
  );
  const imageDelay = await firstInterestImageReveal.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).transitionDelay)
  );
  const footerDelay = await footerReveal.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).transitionDelay)
  );

  sectionDelays.slice(1).forEach((delay, index) => {
    expect(delay).toBeGreaterThan(sectionDelays[index]!);
  });
  expect(imageDelay).toBeGreaterThan(aboutDelay);
  expect(footerDelay).toBe(0);
});

test("keyboard users can skip repeated navigation", async ({page}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", {name: "Skip to content"});
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

test("unknown routes render the not-found recovery page", async ({page}) => {
  const response = await page.goto("/missing-route");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", {name: "Page not found"})).toBeVisible();
  await expect(page.getByRole("navigation", {name: "Not found routes"})).toBeVisible();
});

test("particle network responds to reduced-motion changes", async ({page}) => {
  await page.setViewportSize({width: 1280, height: 720});
  await page.emulateMedia({reducedMotion: "reduce"});
  await page.goto("/projects");
  await expect(page.locator("canvas")).toHaveCount(0);

  await page.emulateMedia({reducedMotion: "no-preference"});
  await expect(page.locator("canvas")).toHaveCount(1);

  await page.emulateMedia({reducedMotion: "reduce"});
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("every sitemap route renders a responsive shell without browser errors", async ({
  page,
  request,
}) => {
  const appRoutes = await getAppRoutes(request);
  const browserErrors: string[] = [];

  await page.setViewportSize({width: 320, height: 720});

  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      browserErrors.push(message.text());
    }
  });

  for (const route of appRoutes) {
    await test.step(route, async () => {
      browserErrors.length = 0;
      const response = await page.goto(route);

      expect(response?.status()).toBe(200);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.getByRole("heading", {level: 1})).toHaveCount(1);
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
          )
      );

      const {viewportWidth, contentWidth} = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        contentWidth: document.documentElement.scrollWidth,
      }));
      expect(contentWidth).toBeLessThanOrEqual(viewportWidth);
      expect(browserErrors).toEqual([]);
    });
  }
});
