import { FaRegCopyright } from "react-icons/fa6";
import { ThemeToggle } from "@/components/theme-toggle";
import { montserrat } from "@/lib/fonts";
import { appConfig } from "@/lib/config/app-config";

const { owner } = appConfig;

export function Footer() {
  return (
    <footer className="flex items-end justify-between pb-10 sm:pb-12">
      <div>
        <div className="flex items-center gap-2">
          <FaRegCopyright className="h-4 w-4 text-[var(--header-item-color)]" />
          <span
            className={`${montserrat.className} text-sm tracking-[0.14em] text-[var(--header-item-color)]`}
          >
            {new Date().getFullYear()} {owner.copyrightName}
          </span>
        </div>
        <p
          className={`${montserrat.className} mt-2 text-xs font-medium tracking-[0.16em] text-[var(--header-item-color)] sm:text-sm`}
        >
          {owner.tagline}
        </p>
      </div>

      <ThemeToggle />
    </footer>
  );
}
