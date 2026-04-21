# apps/concerts/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build concerts

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist/apps/concerts ./dist

# ไม่มี EXPOSE เพราะ concerts คุยผ่าน Kafka ไม่ใช่ HTTP
CMD ["node", "dist/main"]