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
  // The HTTP test server must remain usable in Safari; HTTPS is checked separately.
  expect(contentSecurityPolicy).not.toContain("upgrade-insecure-requests");
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

test("HTTPS behind the deployment proxy upgrades insecure requests", async ({request}) => {
  const response = await request.get("/", {headers: {"x-forwarded-proto": "https"}});
  expect(response.headers()["content-security-policy"]).toContain("upgrade-insecure-requests");
});

test("security policy is present regardless of Accept or prefetch headers", async ({request}) => {
  for (const path of [
    "/",
    "/projects",
    "/work",
    "/projects/codex-limits",
    "/api-missing",
    "/missing-route",
  ]) {
    const requestHeaders: Record<string, string>[] = [
      {accept: "*/*"},
      {accept: "text/html", purpose: "prefetch", "next-router-prefetch": "1"},
    ];
    for (const headers of requestHeaders) {
      const response = await request.get(path, {headers});
      expect(response.headers()["content-security-policy"], path).toContain("default-src 'self'");
    }
  }
});

test("legacy project shortcut redirects without becoming canonical content", async ({request}) => {
  const response = await request.get("/codex-limits", {maxRedirects: 0});

  expect(response.status()).toBe(307);
  expect(response.headers()["location"]).toBe("https://github.com/simonesiega/codex-limits");
});
