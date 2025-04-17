FROM node:20.10.0-alpine

LABEL maintainer="NTET MANYAMA IGOR"

LABEL creation_date="17-04-2025 at 11:10"

WORKDIR /app

COPY package.json .
 
RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]

