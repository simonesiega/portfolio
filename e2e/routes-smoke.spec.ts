import {expect, test} from "@playwright/test";
import {appRoutes} from "./helpers/projects-fixtures";

test("fast scrolling keeps landing-page reveals in document order", async ({page}) => {
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
  const visibleImage = page.locator(".about-interest-reveal--visible").first();
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
  await expect(visibleImage).toBeAttached();
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
  const imageDelay = await visibleImage.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).transitionDelay)
  );
  const footerDelay = await footerReveal.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).transitionDelay)
  );

  sectionDelays.slice(1).forEach((delay, index) => {
    expect(delay).toBeGreaterThan(sectionDelays[index]!);
  });
  expect(imageDelay).toBeGreaterThan(aboutDelay);
  expect(footerDelay).toBeGreaterThan(imageDelay);
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

test.describe("app routes smoke", () => {
  for (const route of appRoutes) {
    test(`${route} renders a main landmark`, async ({page}) => {
      await page.goto(route);
      await expect(page.getByRole("main")).toBeVisible();
    });
  }
});
