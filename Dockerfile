FROM oven/bun:1.2.12 AS builder

WORKDIR /app

COPY package.json ./
COPY bun.lock ./

RUN bun install --frozen-lockfile

COPY vite.config.ts ./vite.config.ts
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.app.json ./tsconfig.app.json
COPY tsconfig.node.json ./tsconfig.node.json
COPY tsconfig.vitest.json ./tsconfig.vitest.json

COPY public ./public
COPY .storybook ./.storybook
COPY src ./src

RUN bun run build-storybook

FROM nginx:1.28.0-alpine-slim AS server

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=builder /app/storybook-static /usr/share/nginx/html

EXPOSE 80
