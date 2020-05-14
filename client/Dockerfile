FROM node:alpine

WORKDIR /home/node

COPY package*.json ./

COPY ./yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=0 /home/node/build /usr/share/nginx/html

COPY --from=0 /home/node/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]