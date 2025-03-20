FROM node:23-alpine3.20

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["node","index.js"]