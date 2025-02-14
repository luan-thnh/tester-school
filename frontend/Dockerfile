# Base stage for dependencies
FROM node:20 AS deps
WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm install --frozen-lockfile

# Build stage
FROM node:20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runtime stage
FROM node:20 AS runtime
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
RUN npm install --production --frozen-lockfile

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 3000
CMD ["npm", "run", "start"]
