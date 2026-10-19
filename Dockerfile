# syntax=docker/dockerfile:1

# deps
FROM oven/bun:1.4.3-alpine@sha256:629e17411f1f129dbec3af78d5af9c9f2a937435c80349437206c6b0b7422373 AS deps
WORKDIR /app
ENV HUSKY=0
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# build
FROM node:26-alpine@sha256:6f08a523443ddedf52941874c203475b0ad503e859ad70cb26ab8be9a517dbd5 AS builder
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
FROM node:26-alpine@sha256:6f08a523443ddedf52941874c203475b0ad503e859ad70cb26ab8be9a517dbd5 AS runner
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
