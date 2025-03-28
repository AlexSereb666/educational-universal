FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development
ENV PORT=8000

EXPOSE 8000

CMD ["npm", "run", "start:dev"]