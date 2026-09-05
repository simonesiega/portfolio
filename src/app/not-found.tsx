import type {Metadata} from "next";
import {SystemPage} from "@/components/system/system-page";
import {systemText} from "@/lib/config/text/system";

const {notFoundPage} = systemText;

export const metadata: Metadata = {
  title: notFoundPage.hero.title,
  description: notFoundPage.hero.subtitle,
  alternates: {canonical: null},
  openGraph: null,
  twitter: null,
};

export default function NotFoundPage() {
  return <SystemPage content={notFoundPage} />;
}
