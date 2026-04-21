# apps/migrator/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npx", "sequelize-cli", "db:migrate"]
 