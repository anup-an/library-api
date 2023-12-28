FROM node:18 as builder

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:latest

COPY --from=builder /app/build /var/www/client

COPY nginx/templates/ /etc/nginx/templates

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



