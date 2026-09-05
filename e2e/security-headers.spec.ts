import {expect, test} from "@playwright/test";

test("HTML responses enforce the production security policy", async ({page}) => {
  const response = await page.goto("/");

  expect(response).not.toBeNull();

  const headers = response?.headers() ?? {};
  const contentSecurityPolicy = headers["content-security-policy"];

  expect(contentSecurityPolicy).toContain("default-src 'self'");
  expect(contentSecurityPolicy).toContain("base-uri 'none'");
  expect(contentSecurityPolicy).toContain("frame-ancestors 'none'");
  expect(contentSecurityPolicy).toContain("object-src 'none'");
  expect(contentSecurityPolicy).toContain("script-src-attr 'none'");
  expect(contentSecurityPolicy).toContain("upgrade-insecure-requests");
  expect(contentSecurityPolicy).not.toContain("'unsafe-eval'");
  expect(headers["strict-transport-security"]).toBe("max-age=63072000; includeSubDomains; preload");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["cross-origin-opener-policy"]).toBe("same-origin");
  expect(headers["cross-origin-resource-policy"]).toBe("same-origin");
  expect(headers["permissions-policy"]).toBe("camera=(), microphone=(), geolocation=()");
  expect(headers["x-powered-by"]).toBeUndefined();
});

test("legacy project shortcut redirects without becoming canonical content", async ({request}) => {
  const response = await request.get("/codex-limits", {maxRedirects: 0});

  expect(response.status()).toBe(307);
  expect(response.headers()["location"]).toBe("https://github.com/simonesiega/codex-limits");
});
