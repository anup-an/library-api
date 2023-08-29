FROM node:alpine

WORKDIR /app

RUN yarn install

COPY . .

CMD ["yarn", "run", "build"]