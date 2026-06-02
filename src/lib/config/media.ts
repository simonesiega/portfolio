export const mediaConfig = {
  home: {
    profileImage: {
      width: 60,
      height: 60,
      priority: true,
    },
    workLogo: {
      width: 22,
      height: 22,
    },
    aboutImage: {
      width: 180,
      height: 220,
      eagerFirstImage: true,
    },
  },
  work: {
    logo: {
      width: 44,
      height: 44,
    },
  },
  projects: {
    caseStudyDiagram: {
      width: 1600,
      height: 900,
      priority: true,
    },
  },
} as const;
