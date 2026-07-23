import type {Metadata} from "next";
import Script from "next/script";
import {geistSans} from "@/lib/fonts";
import {appConfig} from "@/lib/config/app-config";
import {sharedOpenGraph, sharedTwitter} from "@/lib/metadata";
import {getSiteUrl} from "@/lib/site-url";
import {themeInitScript} from "@/lib/theme-init";
import {ScrollToTopOnRouteChange} from "@/components/behavior/scroll/scroll-to-top-on-route-change";
import {Header} from "@/components/layout/header";
import {animationTimings, toMs} from "@/lib/animation/animation-timings";
import "./globals.css";

const metadataBase = getSiteUrl();
const {owner, navigation, social, metadata: metadataConfig, analytics} = appConfig;
const themeTransitionStyle = {
  "--theme-transition-duration": toMs(animationTimings.themeTransition.durationMs),
  "--theme-transition-easing": animationTimings.themeTransition.easing,
} as React.CSSProperties;

export const metadata: Metadata = {
  metadataBase,
  title: metadataConfig.title,
  description: metadataConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...sharedOpenGraph,
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: owner.name,
    title: metadataConfig.title.default,
    description: metadataConfig.description,
  },
  twitter: {
    ...sharedTwitter,
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
    <html lang={metadataConfig.language} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <Script src="/runtime-init.js" strategy="beforeInteractive" />
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {analytics.umami.enabled && analytics.umami.scriptSrc && analytics.umami.websiteId ? (
          <script
            defer
            src={analytics.umami.scriptSrc}
            data-website-id={analytics.umami.websiteId}
          />
        ) : null}
      </head>
      <body
        style={themeTransitionStyle}
        className={`${geistSans.variable} flex min-h-svh flex-col bg-[var(--ui-bg)] text-[var(--ui-fg)] antialiased [--app-header-height:5.5rem] sm:[--app-header-height:4.5rem]`}
      >
        <a
          href="#main-content"
          className={`${geistSans.className} fixed top-3 left-3 z-[60] -translate-y-24 rounded-md bg-[var(--ui-bg)] px-4 py-2 font-semibold text-[var(--ui-fg)] shadow-lg transition-transform duration-200 focus:translate-y-0 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-fg)]`}
        >
          {navigation.skipToContentLabel}
        </a>
        <ScrollToTopOnRouteChange />
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
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 flex-col pt-[var(--app-header-height)] focus:outline-none"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
