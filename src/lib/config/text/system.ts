export const systemText = {
  notFoundPage: {
    hero: {
      sectionId: "not-found-heading",
      eyebrow: "404",
      title: "Page not found",
      subtitle: "The page you're looking for is not part of the current portfolio.",
    },
    body: {
      navigationAriaLabel: "Not found routes",
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
      navigationAriaLabel: "Error recovery routes",
      actions: {
        retryLabel: "Try again",
        backHomeLabel: "Home",
        backHomeHref: "/",
        openProjectsLabel: "Projects",
        openProjectsHref: "/projects",
        openWorkLabel: "Work",
        openWorkHref: "/work",
      },
    },
  },
} as const;
