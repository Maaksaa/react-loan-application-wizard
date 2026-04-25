# syntax=docker/dockerfile:1.7

# ---- Stage 1: build ----
# Pin to a specific minor version of node — reproducible builds.
# Alpine variant keeps the build image small.
FROM node:20-alpine AS builder

WORKDIR /app

# Copy lockfile and package.json first to leverage Docker layer caching:
# dependencies only re-install when these files change, not on every code edit.
COPY package*.json ./

# `npm ci` is stricter and faster than `npm install` for CI/Docker builds:
# it requires a lockfile and never modifies it.
RUN npm ci

COPY . .

RUN npm run build

# ---- Stage 2: serve ----
# Serving static files via nginx is the right tool: tiny image, fast,
# and we get gzip/cache headers via config below.
FROM nginx:1.27-alpine AS runner

# Replace the default nginx config with one tuned for a SPA
# (history-mode routing needs a fallback to index.html).
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# nginx image already defines a sensible CMD; explicit form documents intent.
CMD ["nginx", "-g", "daemon off;"]