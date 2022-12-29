FROM node:16 as builder

WORKDIR /app
RUN npm install --global pm2
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . .
RUN yarn build

EXPOSE 4200

CMD ["yarn", "prod"]