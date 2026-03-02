import type { Metadata } from "next";
import { geistMono, geistSans } from "@/lib/fonts";
import { appConfig } from "@/lib/config/app-config";
import { getThemeInitScript } from "@/lib/theme";
import { Header } from "@/components/layout/header";
import "./globals.css";

const themeInitScript = getThemeInitScript();
const {
  owner,
  navigation,
  social,
  metadata: metadataConfig,
  layout,
} = appConfig;

const isUmamiEnabled = process.env.NEXT_PUBLIC_UMAMI_ENABLED === "true";
const umamiScriptSrc = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const metadata: Metadata = {
  title: metadataConfig.title,
  description: metadataConfig.description,
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
    <html lang={metadataConfig.language} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
        {isUmamiEnabled && umamiScriptSrc && umamiWebsiteId ? (
          <script defer src={umamiScriptSrc} data-website-id={umamiWebsiteId} />
        ) : null}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} [--app-header-height:6rem] sm:[--app-header-height:7rem] flex min-h-screen flex-col bg-[var(--ui-bg)] text-[var(--ui-fg)] antialiased`}
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
