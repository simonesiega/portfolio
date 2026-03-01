import type { Metadata } from "next";
import { geistMono, geistSans } from "@/lib/fonts";
import { appConfig } from "@/lib/config/app-config";
import { getThemeInitScript } from "@/lib/theme";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RouteReveal } from "@/components/animation/route-reveal";
import "./globals.css";

const themeInitScript = getThemeInitScript();
const { owner, navigation, social, analytics } = appConfig;

export const metadata: Metadata = {
  title: appConfig.metadata.title,
  description: appConfig.metadata.description,
  icons: {
    icon: appConfig.metadata.iconPath,
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
          src={analytics.umami.scriptSrc}
          data-website-id={analytics.umami.websiteId}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-[var(--ui-bg)] text-[var(--ui-fg)] antialiased`}
      >
        <div className="fixed inset-x-0 top-0 z-50">
          <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-8">
            <Header
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
          style={{ paddingTop: "var(--app-header-height, 6rem)" }}
        >
          {children}
        </main>
        <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-8">
          <RouteReveal variant="fade-in" duration={1300} threshold={0.05}>
            <Footer />
          </RouteReveal>
        </div>
      </body>
    </html>
  );
}
