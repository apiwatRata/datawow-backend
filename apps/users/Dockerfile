# apps/users/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build users

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist/apps/users ./dist

# ไม่มี EXPOSE เพราะ users คุยผ่าน Kafka ไม่ใช่ HTTP
CMD ["node", "dist/main"]