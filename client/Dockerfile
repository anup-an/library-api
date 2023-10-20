FROM node:18

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . .

CMD ["yarn", "run", "build"]