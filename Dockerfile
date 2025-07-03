# Multi-stage build for production optimization
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache build-base python3

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Force compilation from source for native modules
ENV npm_config_build_from_source=true

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Build the application
FROM base AS builder
WORKDIR /app

# Copy source code
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Build the application
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Create uploads directory
RUN mkdir -p /app/server/uploads && chown -R nextjs:nodejs /app/server/uploads

# Create database directory
RUN mkdir -p /app/server/database && chown -R nextjs:nodejs /app/server/database

USER nextjs

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["npm", "run", "server"]