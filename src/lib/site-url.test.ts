import {afterEach, describe, expect, it} from "vitest";
import {getSiteOrigin, getSiteUrl} from "./site-url";

const originalNodeEnv = process.env.NODE_ENV;
const originalNextPublicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const originalSiteUrl = process.env.SITE_URL;
const mutableEnv = process.env as Record<string, string | undefined>;

function setNodeEnv(value: string) {
  mutableEnv["NODE_ENV"] = value;
}

function setSiteUrls({publicUrl = "", serverUrl = ""} = {}) {
  mutableEnv["NEXT_PUBLIC_SITE_URL"] = publicUrl;
  mutableEnv["SITE_URL"] = serverUrl;
}

describe("site URL resolution", () => {
  afterEach(() => {
    mutableEnv["NODE_ENV"] = originalNodeEnv;
    mutableEnv["NEXT_PUBLIC_SITE_URL"] = originalNextPublicSiteUrl;
    mutableEnv["SITE_URL"] = originalSiteUrl;
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
