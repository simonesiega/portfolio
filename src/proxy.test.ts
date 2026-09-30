import {NextRequest} from "next/server";
import {unstable_doesMiddlewareMatch} from "next/experimental/testing/server";
import {afterEach, describe, expect, it, vi} from "vitest";

async function getProxy(env: Record<string, string | undefined> = {}) {
  vi.resetModules();
  vi.stubEnv("NODE_ENV", "production");
  for (const name of [
    "CSP_MODE",
    "CSP_REPORT_URI",
    "CSP_CONNECT_SRC_EXTRA",
    "NEXT_PUBLIC_UMAMI_ENABLED",
    "NEXT_PUBLIC_UMAMI_SCRIPT_SRC",
  ]) {
    vi.stubEnv(name, undefined);
  }
  for (const [name, value] of Object.entries(env)) {
    vi.stubEnv(name, value);
  }
  return (await import("./proxy")).proxy;
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("content security policy", () => {
  it("matches documents and prefetches but skips framework assets and metadata files", async () => {
    const {config} = await import("./proxy");
    for (const url of [
      "/",
      "/projects/codex-limits",
      "/missing",
      "/api-missing",
      "/robots.txt/missing",
    ]) {
      expect(
        unstable_doesMiddlewareMatch({
          config,
          url,
          headers: {purpose: "prefetch", "next-router-prefetch": "1"},
        }),
        url
      ).toBe(true);
    }
    for (const url of [
      "/_next/static/app.js",
      "/_next/image?url=test",
      "/favicon.ico",
      "/robots.txt",
      "/sitemap.xml",
    ]) {
      expect(unstable_doesMiddlewareMatch({config, url}), url).toBe(false);
    }
  });

  it.each([undefined, "*/*", "text/html", "text/x-component"])(
    "protects document responses with Accept %s",
    async (accept) => {
      const proxy = await getProxy();
      const headers = accept ? {accept} : undefined;
      const response = proxy(new NextRequest("https://simonesiega.com/projects", {headers}));
      const policy = response.headers.get("Content-Security-Policy");

      expect(policy).toContain("default-src 'self'");
      expect(policy).toContain("frame-ancestors 'none'");
      expect(policy).toContain("script-src-attr 'none'");
      expect(policy).toContain("upgrade-insecure-requests");
      expect(policy).not.toContain("'unsafe-eval'");
    }
  );

  it("does not upgrade HTTP preview assets to an unavailable HTTPS server", async () => {
    const proxy = await getProxy();
    const response = proxy(new NextRequest("http://127.0.0.1:3100/"));
    const policy = response.headers.get("Content-Security-Policy");

    expect(policy).toContain("default-src 'self'");
    expect(policy).not.toContain("upgrade-insecure-requests");
  });

  it("supports report-only mode with reporting and extra connection origins", async () => {
    const proxy = await getProxy({
      CSP_MODE: "report-only",
      CSP_REPORT_URI: "https://reports.example.com/csp",
      CSP_CONNECT_SRC_EXTRA: "https://api.example.com   https://metrics.example.com",
    });
    const response = proxy(new NextRequest("https://simonesiega.com/"));

    expect(response.headers.has("Content-Security-Policy")).toBe(false);
    expect(response.headers.get("Content-Security-Policy-Report-Only")).toContain(
      "connect-src 'self' https://api.example.com https://metrics.example.com"
    );
    expect(response.headers.get("Content-Security-Policy-Report-Only")).toContain(
      "report-uri https://reports.example.com/csp; report-to csp-endpoint"
    );
    expect(response.headers.get("Reporting-Endpoints")).toBe(
      'csp-endpoint="https://reports.example.com/csp"'
    );
  });

  it("does not emit policy or reporting headers when explicitly disabled", async () => {
    const proxy = await getProxy({CSP_MODE: "off", CSP_REPORT_URI: "https://reports.example.com"});
    const response = proxy(new NextRequest("https://simonesiega.com/"));

    expect(response.headers.has("Content-Security-Policy")).toBe(false);
    expect(response.headers.has("Content-Security-Policy-Report-Only")).toBe(false);
    expect(response.headers.has("Reporting-Endpoints")).toBe(false);
  });

  it("fails closed for an invalid mode in production", async () => {
    const proxy = await getProxy({CSP_MODE: "typo"});
    expect(
      proxy(new NextRequest("https://simonesiega.com/")).headers.has("Content-Security-Policy")
    ).toBe(true);
  });

  it("leaves development unmodified unless a policy is requested", async () => {
    const proxy = await getProxy({NODE_ENV: "development"});
    expect(
      proxy(new NextRequest("http://localhost:3000/")).headers.has("Content-Security-Policy")
    ).toBe(false);

    const enforcedProxy = await getProxy({NODE_ENV: "development", CSP_MODE: "enforce"});
    const policy = enforcedProxy(new NextRequest("http://localhost:3000/")).headers.get(
      "Content-Security-Policy"
    );
    expect(policy).toContain("'unsafe-eval'");
    expect(policy).not.toContain("upgrade-insecure-requests");
  });

  it.each([
    ["https://cloud.umami.is/script.js", "https://cloud.umami.is https://gateway.umami.is"],
    ["https://analytics.example.com/script.js", "https://analytics.example.com"],
    ["javascript:alert(1)", ""],
    ["not-a-url", ""],
  ])("scopes analytics permissions to valid origins: %s", async (scriptSrc, origins) => {
    const proxy = await getProxy({
      NEXT_PUBLIC_UMAMI_ENABLED: "true",
      NEXT_PUBLIC_UMAMI_SCRIPT_SRC: scriptSrc,
    });
    const policy = proxy(new NextRequest("https://simonesiega.com/")).headers.get(
      "Content-Security-Policy"
    );
    expect(policy?.split("; ")).toContain(`connect-src 'self'${origins ? ` ${origins}` : ""}`);
  });
});
