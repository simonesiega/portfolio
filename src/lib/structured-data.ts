import {appConfig} from "@/lib/config/app-config";
import {homeText} from "@/lib/config/text/home";

export function createPortfolioStructuredData(siteUrl: URL) {
  const siteOrigin = siteUrl.origin;
  const siteUrlValue = `${siteOrigin}/`;
  const personId = `${siteOrigin}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: appConfig.owner.name,
        url: siteUrlValue,
        image: new URL(homeText.intro.profileImage.src, siteOrigin).href,
        description: appConfig.metadata.description,
        sameAs: [appConfig.social.githubUrl, appConfig.social.linkedinUrl, appConfig.social.xUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${siteOrigin}/#website`,
        url: siteUrlValue,
        name: appConfig.owner.name,
        alternateName: `${appConfig.owner.name} Portfolio`,
        inLanguage: appConfig.metadata.language,
        publisher: {"@id": personId},
      },
    ],
  } as const;
}

export function serializeJsonLd(value: unknown) {
  const serialized = JSON.stringify(value);

  if (serialized === undefined) {
    throw new Error("JSON-LD data must be serializable.");
  }

  return serialized.replace(/</g, "\\u003c");
}
