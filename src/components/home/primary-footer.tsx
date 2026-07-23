import {FaRegCopyright} from "react-icons/fa6";
import {CurrentYear} from "@/components/home/current-year";
import {ThemeToggle} from "@/components/theme-toggle";
import {montserrat} from "@/lib/fonts";

export function PrimaryFooter() {
  const initialYear = new Date().getFullYear();

  return (
    <footer className="flex w-full items-center justify-between pb-10 sm:pb-12">
      <div className="flex items-center gap-2">
        <FaRegCopyright
          aria-hidden={true}
          className="h-3.5 w-3.5 text-[var(--header-item-color)]"
        />
        <span
          className={`${montserrat.className} text-xs tracking-[0.14em] text-[var(--header-item-color)] sm:text-sm`}
        >
          <span className="sr-only">Copyright </span>
          <CurrentYear initialYear={initialYear} />
        </span>
      </div>

      <ThemeToggle />
    </footer>
  );
}
