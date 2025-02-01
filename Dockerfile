FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build && ls -la
EXPOSE 8080
CMD ["node", "dist/apps/backend/main.js"]