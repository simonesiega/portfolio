import { ThemeToggle } from "@/components/theme-toggle";
import { montserrat } from "@/lib/fonts";
import { appConfig } from "@/lib/config/app-config";

const { contact } = appConfig;

type SecondaryFooterProps = {
  legalDisclaimerLine?: string;
};

export function SecondaryFooter({ legalDisclaimerLine }: SecondaryFooterProps) {
  return (
    <footer className="grid w-full grid-cols-[1fr_auto] items-start gap-x-6 pb-10 sm:pb-12">
      <div className="flex min-w-0 flex-col gap-2">
        <p
          className={`${montserrat.className} text-[0.7rem] font-medium tracking-[0.14em] text-[var(--header-item-color)] sm:text-xs`}
        >
        </p>

        <a
          href={`mailto:${contact.email}`}
          className={`${montserrat.className} inline-flex text-xs text-[var(--ui-fg)] transition-colors hover:text-[var(--header-item-hover-color)] sm:text-sm`}
        >
          {contact.email}
        </a>
      </div>

      <div className="flex flex-col items-end gap-2 justify-self-end">
        <p
          aria-hidden={!legalDisclaimerLine}
          className={`${montserrat.className} max-w-[26rem] text-right text-[0.62rem] leading-relaxed text-[var(--header-item-color)] opacity-80 sm:text-[0.7rem] ${legalDisclaimerLine ? "" : "invisible"}`}
        >
          {legalDisclaimerLine ?? "Logos and trademarks are the property of their respective owners."}
        </p>

        <ThemeToggle />
      </div>
    </footer>
  );
}
