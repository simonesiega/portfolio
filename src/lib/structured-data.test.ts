import {describe, expect, it} from "vitest";
import {appConfig} from "@/lib/config/app-config";
import {homeText} from "@/lib/config/text/home";
import {createPortfolioStructuredData, serializeJsonLd} from "./structured-data";

describe("portfolio structured data", () => {
  it("connects the site and owner to canonical profile and social URLs", () => {
    const siteUrl = new URL("https://simonesiega.com/");
    const structuredData = createPortfolioStructuredData(siteUrl);

    expect(structuredData["@context"]).toBe("https://schema.org");
    expect(structuredData["@graph"][0]).toEqual({
      "@type": "Person",
      "@id": "https://simonesiega.com/#person",
      name: appConfig.owner.name,
      url: "https://simonesiega.com/",
      image: new URL(homeText.intro.profileImage.src, siteUrl).href,
      description: appConfig.metadata.description,
      sameAs: [appConfig.social.githubUrl, appConfig.social.linkedinUrl, appConfig.social.xUrl],
    });
    expect(structuredData["@graph"][1]).toEqual({
      "@type": "WebSite",
      "@id": "https://simonesiega.com/#website",
      url: "https://simonesiega.com/",
      name: appConfig.owner.name,
      alternateName: `${appConfig.owner.name} Portfolio`,
      inLanguage: appConfig.metadata.language,
      publisher: {"@id": "https://simonesiega.com/#person"},
    });
  });

  it("safely serializes JSON-LD without allowing a script-closing tag", () => {
    const value = {label: "</script><script>alert(1)</script>"};
    const serialized = serializeJsonLd(value);

    expect(serialized).not.toContain("</script>");
    expect(JSON.parse(serialized)).toEqual(value);
  });

  it("rejects values that cannot be serialized as JSON", () => {
    expect(() => serializeJsonLd(undefined)).toThrow("JSON-LD data must be serializable");
  });
});
