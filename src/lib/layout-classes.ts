export const pageFrameClassName =
  "mx-auto flex min-h-[calc(100svh-var(--app-header-height,6rem))] w-full max-w-[90rem] flex-col px-4 sm:px-8";

export const pageContentClassName = "mx-auto w-full max-w-[60rem] px-6";

export const pageColumnClassName = "mx-auto w-full max-w-[36rem] pr-3 sm:pr-5";

export const secondaryListingHero = {
  className: pageColumnClassName,
  titleClassName:
    "text-[clamp(1.35rem,8vw,2rem)] leading-tight font-bold tracking-[0.08em] text-[var(--ui-fg)]/95 sm:text-[2.25rem]",
  subtitleClassName:
    "max-w-full text-[0.9rem] leading-relaxed font-normal tracking-normal text-[var(--header-item-color)] sm:text-[0.94rem]",
} as const;
