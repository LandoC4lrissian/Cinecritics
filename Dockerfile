# 1. Aşama: Build
FROM node:20 AS build

WORKDIR /app

# Sadece package.json'ı kopyala (daha hızlı build için)
COPY package.json package-lock.json ./
RUN npm ci

# Geri kalan dosyaları kopyala
COPY . .
RUN npm run build

# 2. Aşama: Serve
FROM nginx:alpine

# Nginx konfigürasyonu
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build output'u kopyala
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]