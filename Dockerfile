FROM node:20-slim as base
FROM base as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
