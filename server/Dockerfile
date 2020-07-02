FROM node:13

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install --production=true --pure-lockfile

COPY . .

EXPOSE 9000

CMD ["yarn", "start"]