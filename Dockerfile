FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]