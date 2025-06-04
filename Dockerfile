FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и устанавливаем
COPY package*.json ./
RUN npm install

# Копируем всё остальное
COPY . .

# Билдим SSR-приложение
RUN npm run build:ssr

# Контейнер слушает порт SSR-сервера
EXPOSE 4000

# Запускаем SSR-сервер
CMD ["node", "dist/solterprise/server/server.mjs"]
