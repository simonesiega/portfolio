import {FaRegCopyright} from "react-icons/fa6";
import {CurrentYear} from "@/components/home/current-year";
import {ThemeToggle} from "@/components/theme-toggle";
import {montserrat} from "@/lib/fonts";
import {appConfig} from "@/lib/config/app-config";

const {owner} = appConfig;

export function PrimaryFooter() {
  return (
    <footer className="flex w-full items-end justify-between pb-10 sm:pb-12">
      <div>
        <div className="flex items-center gap-2">
          <FaRegCopyright className="h-3.5 w-3.5 text-[var(--header-item-color)]" />
          <span
            className={`${montserrat.className} text-xs tracking-[0.14em] text-[var(--header-item-color)] sm:text-sm`}
          >
            <CurrentYear /> {owner.copyrightName}
          </span>
        </div>
        <p
          className={`${montserrat.className} mt-2 text-[0.7rem] font-medium tracking-[0.16em] text-[var(--header-item-color)] sm:text-xs`}
        >
          {owner.tagline}
        </p>
      </div>

      <ThemeToggle />
    </footer>
  );
}
