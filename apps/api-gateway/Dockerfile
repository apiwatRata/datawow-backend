# apps/api-gateway/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build api-gateway        

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist/apps/api-gateway ./dist

EXPOSE 3000
CMD ["node", "dist/main"]