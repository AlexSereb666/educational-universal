FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development
ENV PORT=3000

RUN npm run build:dev || true

EXPOSE 3000

CMD ["npm", "run", "start"]