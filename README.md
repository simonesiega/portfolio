<h1 align="center">Simone Siega — Portfolio</h1>

<p align="center">
Personal portfolio website showcasing my work, projects, and technical interests.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p align="center">
🌐 <b>Live Website:</b> <a href="https://simonesiega.com">simonesiega.com</a>
</p>

## 🚀 Preview

<p align="center">
  <img src="docs/gif/home-animation.gif" alt="Homepage animation and theme toggle" />
</p>

## About

I am **Simone Siega**, a software developer and computer science student based in **Venice, Italy**.

This repository contains the source code for my personal portfolio website, designed as the main place to explore my work. The site brings together selected projects, experiments, and professional experience, with a focus on **systems-oriented engineering**, **backend development**, and **practical software architecture**.

## What the portfolio includes

- Selected software projects and technical experiments  
- Professional experience and development work  
- The technical direction of my work across systems, backend engineering, and software architecture

Explore the portfolio here:

- [Projects](https://simonesiega.com/projects)
- [Work](https://simonesiega.com/work)

## Running Locally

```bash
bun install
bun run dev
```

Then open:

```bash
http://localhost:3000
```

Optional: copy `.env.example` to `.env` to configure analytics, canonical URL generation, and CSP/security-header behavior.

Production builds require `NEXT_PUBLIC_SITE_URL` or `SITE_URL` so metadata, robots, and sitemap URLs are generated from an explicit origin. For local verification, run:

```bash
bun run check
```

Run the browser suite separately:

```bash
bunx playwright install chromium
bun run test:e2e
```

## Production

The Docker image uses Next.js standalone output and runs as a non-root `nextjs` user on port `3000`.

Configuration is handled with environment variables:

- `NEXT_PUBLIC_SITE_URL` or `SITE_URL`: canonical site origin used at build time by metadata, sitemap, and robots. Docker builds default `SITE_URL` to `https://simonesiega.com`; deployments can override it with a build argument.
- `NEXT_PUBLIC_UMAMI_ENABLED`, `NEXT_PUBLIC_UMAMI_SCRIPT_SRC`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID`: optional Umami analytics. Provide all three at build time. When analytics is enabled, also provide `NEXT_PUBLIC_UMAMI_ENABLED=true` and `NEXT_PUBLIC_UMAMI_SCRIPT_SRC` at runtime so the CSP permits that origin; changing runtime values alone does not modify prerendered pages.
- `CSP_MODE`: `off`, `report-only`, or `enforce`; production defaults to `enforce` when unset.
- `CSP_REPORT_URI`: optional CSP report endpoint.
- `CSP_CONNECT_SRC_EXTRA`: optional space-separated extra `connect-src` origins.

## 🧑‍💻 Contact

- Website: https://simonesiega.com  
- GitHub: https://github.com/simonesiega  
- LinkedIn: https://linkedin.com/in/simonesiega  

## License

This project is licensed under the **MIT License**.

See [LICENSE](LICENSE) for details.
