import {afterEach, describe, expect, it, vi} from "vitest";
import {getSiteOrigin, getSiteUrl} from "./site-url";

function setNodeEnv(value: string) {
  vi.stubEnv("NODE_ENV", value);
}

function setSiteUrls({publicUrl = "", serverUrl = ""} = {}) {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", publicUrl);
  vi.stubEnv("SITE_URL", serverUrl);
}

describe("site URL resolution", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses localhost when no site URL is configured outside production", () => {
    setNodeEnv("test");
    setSiteUrls();

    expect(getSiteUrl().origin).toBe("http://localhost:3000");
  });

  it("requires an explicit site URL in production", () => {
    setNodeEnv("production");
    setSiteUrls();

    expect(() => getSiteUrl()).toThrow("Set NEXT_PUBLIC_SITE_URL or SITE_URL");
  });

  it("uses and normalizes the server-only fallback", () => {
    setNodeEnv("production");
    setSiteUrls({serverUrl: "https://simonesiega.com/nested/path?ignored=true"});

    expect(getSiteOrigin()).toBe("https://simonesiega.com");
    expect(getSiteUrl().href).toBe("https://simonesiega.com/");
  });

  it("uses the configured public site URL first", () => {
    setNodeEnv("production");
    setSiteUrls({
      publicUrl: "https://preview.example.com/path",
      serverUrl: "https://simonesiega.com",
    });

    expect(getSiteOrigin()).toBe("https://preview.example.com");
    expect(getSiteUrl().href).toBe("https://preview.example.com/");
  });

  it("rejects invalid or unsafe configured URLs", () => {
    setNodeEnv("production");

    for (const publicUrl of [
      "not-a-url",
      "ftp://example.com",
      "javascript:alert(1)",
      "https://user:password@example.com",
    ]) {
      setSiteUrls({publicUrl});
      expect(() => getSiteUrl()).toThrow("must be a valid absolute URL");
    }
  });
});
