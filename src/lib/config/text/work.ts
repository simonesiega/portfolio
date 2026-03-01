export const workText = {
  title: "Experience",
  subtitle: "Places I've worked at and things I've built along the way.",
  experiences: [
    {
      company: "Nexora Technologies",
      role: "Full-Stack Developer",
      period: "Jun 2025 – Present",
      location: "Remote",
      type: "Full-time",
      highlights: ["-40% API latency", "2M+ events/day", "Mentored 2 engineers"],
      description:
        "Building and scaling a cloud-based analytics platform used by over 50,000 professionals. Leading the migration from a legacy monolith to a distributed microservices architecture.",
      achievements: [
        "Reduced API response times by 40% through query optimization and Redis caching layers",
        "Designed and shipped a real-time notification pipeline processing 2M+ events per day",
        "Mentored two junior engineers through structured onboarding and weekly code reviews",
      ],
      technologies: ["TypeScript", "React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    },
    {
      company: "Meridian Labs",
      role: "Software Engineering Intern",
      period: "Jan 2025 – May 2025",
      location: "Venice, Italy",
      type: "Internship",
      highlights: ["94% classification accuracy", "QA from 3 days to 4 hours"],
      description:
        "Contributed to an AI-powered document processing pipeline, collaborating closely with the ML team to integrate NLP models into the production backend.",
      achievements: [
        "Built a document classification module achieving 94% accuracy on internal benchmarks",
        "Developed automated CI/CD testing pipelines that cut QA cycles from 3 days to 4 hours",
      ],
      technologies: ["Python", "FastAPI", "LangChain", "PostgreSQL", "Docker"],
    },
  ],
} as const;

export type WorkExperience = (typeof workText.experiences)[number];
