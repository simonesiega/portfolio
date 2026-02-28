import type { Metadata } from "next";
import { geistMono, geistSans } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import { getThemeInitScript } from "@/lib/theme";
import "./globals.css";

const themeInitScript = getThemeInitScript();

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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
