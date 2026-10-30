# syntax=docker/dockerfile:1

# deps
FROM oven/bun:1.4.4-alpine@sha256:4cf82f5686b196504fe119db3fcd9185b191f82ece82c40680e597228ec6070a AS deps
WORKDIR /app
ENV HUSKY=0
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# build
FROM node:26-alpine@sha256:c6ad9e9c1d80f6eb607c26b4b0a132ff7a2344fad1c78ea3baa2a7d4c8de6d94 AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_UMAMI_ENABLED
ARG NEXT_PUBLIC_UMAMI_SCRIPT_SRC
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ARG NEXT_PUBLIC_SITE_URL
ARG SITE_URL=https://simonesiega.com
ENV NEXT_PUBLIC_UMAMI_ENABLED=$NEXT_PUBLIC_UMAMI_ENABLED
ENV NEXT_PUBLIC_UMAMI_SCRIPT_SRC=$NEXT_PUBLIC_UMAMI_SCRIPT_SRC
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV SITE_URL=$SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=secret,id=NEXT_PUBLIC_UMAMI_WEBSITE_ID,required=false \
  export NEXT_PUBLIC_UMAMI_WEBSITE_ID="${NEXT_PUBLIC_UMAMI_WEBSITE_ID:-$(cat /run/secrets/NEXT_PUBLIC_UMAMI_WEBSITE_ID 2>/dev/null || true)}" \
  && node node_modules/next/dist/bin/next build

# run
FROM node:26-alpine@sha256:c6ad9e9c1d80f6eb607c26b4b0a132ff7a2344fad1c78ea3baa2a7d4c8de6d94 AS runner
WORKDIR /app
ARG NEXT_PUBLIC_UMAMI_ENABLED
ARG NEXT_PUBLIC_UMAMI_SCRIPT_SRC
ARG NEXT_PUBLIC_SITE_URL
ARG SITE_URL=https://simonesiega.com
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_UMAMI_ENABLED=$NEXT_PUBLIC_UMAMI_ENABLED
ENV NEXT_PUBLIC_UMAMI_SCRIPT_SRC=$NEXT_PUBLIC_UMAMI_SCRIPT_SRC
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV SITE_URL=$SITE_URL
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN apk upgrade --no-cache \
  && rm -rf /usr/local/lib/node_modules/npm \
  && rm -f /usr/local/bin/npm /usr/local/bin/npx \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
USER nextjs
CMD ["node", "server.js"]
