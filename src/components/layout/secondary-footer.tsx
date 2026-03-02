import { ThemeToggle } from "@/components/theme-toggle";
import { montserrat } from "@/lib/fonts";
import { appConfig } from "@/lib/config/app-config";

const { contact } = appConfig;

export function SecondaryFooter() {
  return (
    <footer className="flex items-end justify-between pb-10 sm:pb-12">
      <div>
        <p
          className={`${montserrat.className} text-xs font-medium tracking-[0.14em] text-[var(--header-item-color)] sm:text-sm`}
        >
          {contact.availabilityLine}
        </p>
        <a
          href={`mailto:${contact.email}`}
          className={`${montserrat.className} mt-2 inline-flex text-sm text-[var(--ui-fg)] transition-colors hover:text-[var(--header-item-hover-color)] sm:text-base`}
        >
          {contact.email}
        </a>
      </div>

      <ThemeToggle />
    </footer>
  );
}
