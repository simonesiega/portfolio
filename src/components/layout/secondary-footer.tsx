import {ThemeToggle} from "@/components/theme-toggle";
import {montserrat} from "@/lib/fonts";
import {appConfig} from "@/lib/config/app-config";

const {contact} = appConfig;

type SecondaryFooterProps = {
  legalDisclaimerLine?: string;
};

export function SecondaryFooter({legalDisclaimerLine}: SecondaryFooterProps) {
  return (
    <footer className="w-full pb-10 sm:pb-12">
      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] sm:items-start sm:gap-x-6 sm:gap-y-2">
        <p
          className={`${montserrat.className} text-[0.7rem] font-medium tracking-[0.14em] text-[var(--header-item-color)] sm:col-start-1 sm:row-start-1 sm:text-xs`}
        >
          {contact.availabilityLine}
        </p>

        <a
          href={`mailto:${contact.email}`}
          className={`${montserrat.className} inline-flex w-fit text-xs text-[var(--ui-fg)] transition-colors hover:text-[var(--header-item-hover-color)] sm:col-start-1 sm:row-start-2 sm:text-sm`}
        >
          {contact.email}
        </a>

        {legalDisclaimerLine ? (
          <p
            className={`${montserrat.className} mt-3 max-w-[26rem] text-[0.62rem] leading-relaxed text-[var(--header-item-color)] opacity-80 sm:col-start-2 sm:row-start-1 sm:mt-0 sm:justify-self-end sm:text-right sm:text-[0.7rem]`}
          >
            {legalDisclaimerLine}
          </p>
        ) : null}

        <div className="mt-1 sm:col-start-2 sm:row-start-2 sm:mt-0 sm:justify-self-end">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
