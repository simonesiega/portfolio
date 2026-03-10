import type { Metadata } from "next";
import Script from "next/script";
import { geistMono, geistSans } from "@/lib/fonts";
import { appConfig } from "@/lib/config/app-config";
import { animationTimings, toMs } from "@/lib/animation/animation-timings";
import { Header } from "@/components/layout/header";
import "./globals.css";

const themeTransitionDuration = toMs(animationTimings.themeTransition.durationMs);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "http://localhost:3000";
const metadataBase = new URL(siteUrl);
const {
  owner,
  navigation,
  social,
  metadata: metadataConfig,
  analytics,
  layout,
} = appConfig;

export const metadata: Metadata = {
  metadataBase,
  title: metadataConfig.title,
  description: metadataConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: owner.name,
    title: metadataConfig.title.default,
    description: metadataConfig.description,
  },
  twitter: {
    card: "summary",
    title: metadataConfig.title.default,
    description: metadataConfig.description,
  },
  icons: {
    icon: metadataConfig.iconPath,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={metadataConfig.language}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <Script src="/runtime-init.js" strategy="beforeInteractive" />
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        {analytics.umami.enabled && analytics.umami.scriptSrc && analytics.umami.websiteId ? (
          <script
            defer
            src={analytics.umami.scriptSrc}
            data-website-id={analytics.umami.websiteId}
          />
        ) : null}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} [--app-header-height:6rem] sm:[--app-header-height:7rem] [--theme-transition-easing:cubic-bezier(0.22,1,0.36,1)] flex min-h-screen flex-col bg-[var(--ui-bg)] text-[var(--ui-fg)] antialiased`}
        style={{
          "--theme-transition-duration": themeTransitionDuration,
        } as React.CSSProperties}
      >
        <div className="fixed inset-x-0 top-0 z-50">
          <div className="mx-auto w-full max-w-[90rem] px-0 sm:px-8">
            <Header
              homeHref={navigation.homeHref}
              ownerName={owner.name}
              navItems={navigation.headerLinks}
              navAriaLabel={navigation.ariaLabel}
              githubUrl={social.githubUrl}
              linkedinUrl={social.linkedinUrl}
              socialLabels={social.labels}
            />
          </div>
        </div>
        <main
          className="flex flex-1 flex-col"
          style={{ paddingTop: `var(--app-header-height, ${layout.headerHeightFallback})` }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
