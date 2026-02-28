import type { Metadata } from "next";
import { geistMono, geistSans } from "@/lib/fonts";
import { siteConfig } from "@/lib/config/site-config";
import { getThemeInitScript } from "@/lib/theme";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const themeInitScript = getThemeInitScript();
const { owner, navigation, social } = siteConfig;

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  icons: {
    icon: siteConfig.metadata.iconPath,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="4ed28268-4936-4cda-a09f-8649dbfb9129"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-[var(--ui-bg)] text-[var(--ui-fg)] antialiased`}
      >
        <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-8">
          <SiteHeader
            ownerName={owner.name}
            navItems={navigation.headerLinks}
            navAriaLabel={navigation.ariaLabel}
            githubUrl={social.githubUrl}
            linkedinUrl={social.linkedinUrl}
            socialLabels={social.labels}
          />
        </div>
        <main className="flex flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
