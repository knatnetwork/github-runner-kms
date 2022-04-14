FROM node:16.13.1-alpine3.14

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["node","index.js"]