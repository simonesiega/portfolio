export const systemText = {
  notFoundPage: {
    hero: {
      sectionId: "not-found-heading",
      eyebrow: "404",
      title: "Page not found",
      subtitle: "The page you're looking for is not part of the current portfolio.",
    },
    body: {
      actions: {
        backHomeLabel: "Home",
        backHomeHref: "/",
        openProjectsLabel: "Projects",
        openProjectsHref: "/projects",
        openWorkLabel: "Work",
        openWorkHref: "/work",
      },
    },
  },
  errorPage: {
    hero: {
      sectionId: "error-heading",
      eyebrow: "Runtime Error",
      title: "Something went wrong",
      subtitle: "An unexpected issue interrupted this page.",
    },
    body: {
      description:
        "Transient runtime issues can happen during navigation. You can retry this route or jump back to a stable section of the portfolio.",
      diagnosticsLabel: "Reference",
      diagnosticsFallbackValue: "1941754757",
      actions: {
        retryLabel: "Try again",
        backHomeLabel: "Back to home",
        backHomeHref: "/",
        openProjectsLabel: "Open projects",
        openProjectsHref: "/projects",
        openWorkLabel: "View work",
        openWorkHref: "/work",
      },
    },
  },
} as const;

export type SystemText = typeof systemText;
