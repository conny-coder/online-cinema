FROM node:16 as builder

WORKDIR /app
RUN npm install --global pm2
COPY ./package.json ./
COPY ./yarn.lock ./

RUN npm install -g yarn
RUN yarn

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]