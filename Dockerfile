# syntax=docker/dockerfile:1

# deps
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# build
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_UMAMI_ENABLED
ARG NEXT_PUBLIC_UMAMI_SCRIPT_SRC
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_UMAMI_ENABLED=$NEXT_PUBLIC_UMAMI_ENABLED
ENV NEXT_PUBLIC_UMAMI_SCRIPT_SRC=$NEXT_PUBLIC_UMAMI_SCRIPT_SRC
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=secret,id=NEXT_PUBLIC_UMAMI_WEBSITE_ID,required=false \
  export NEXT_PUBLIC_UMAMI_WEBSITE_ID="${NEXT_PUBLIC_UMAMI_WEBSITE_ID:-$(cat /run/secrets/NEXT_PUBLIC_UMAMI_WEBSITE_ID 2>/dev/null || true)}" \
  && npm run build

# run
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
USER nextjs
CMD ["node", "server.js"]
