import { ThemeToggle } from "@/components/theme-toggle";
import { montserrat } from "@/lib/fonts";
import { appConfig } from "@/lib/config/app-config";

const { contact } = appConfig;

type SecondaryFooterProps = {
  legalDisclaimerLine?: string;
};

export function SecondaryFooter({ legalDisclaimerLine }: SecondaryFooterProps) {
  return (
    <footer className="grid w-full grid-cols-[1fr_auto] items-start pb-10 sm:pb-12">
      <p
        className={`${montserrat.className} col-start-1 row-start-1 text-[0.7rem] font-medium tracking-[0.14em] text-[var(--header-item-color)] sm:text-xs`}
      >
        {contact.availabilityLine}
      </p>

      <a
        href={`mailto:${contact.email}`}
        className={`${montserrat.className} col-start-1 row-start-2 mt-2 inline-flex text-xs text-[var(--ui-fg)] transition-colors hover:text-[var(--header-item-hover-color)] sm:text-sm`}
      >
        {contact.email}
      </a>

      {legalDisclaimerLine ? (
        <p
          className={`${montserrat.className} col-start-2 row-start-1 max-w-[26rem] justify-self-end text-right text-[0.62rem] leading-relaxed text-[var(--header-item-color)] opacity-80 sm:text-[0.7rem]`}
        >
          {legalDisclaimerLine}
        </p>
      ) : null}

      <div
        className={`col-start-2 mt-2 justify-self-end ${legalDisclaimerLine ? "row-start-2" : "row-start-1"}`}
      >
        <ThemeToggle />
      </div>
    </footer>
  );
}
