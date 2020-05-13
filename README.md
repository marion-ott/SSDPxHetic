# SSDPxHetic

### Install dependencies

```shell
$ cd client
$ yarn install
$ cd server
$ yarn install
$ docker-compose up
```

### Create environment variables file

```shell
$ cd server
$ mkdir config && cd config
$ touch dev.env
$ cd client/src
$ touch .env
```

### Copy & paste the following variables in dev.env

```env
PORT=9000
PRISMA_ENDPOINT=http://prisma:4466
PRISMA_SECRET=MySecret1234
JWT_SECRET="thisisasecret"
```

### Deploy prisma service to init database or update data model

```shell
$ docker-compose exec ssdpxhetic_server_1 yarn deploy
```

### Import data

```shell
$ docker-compose exec ssdpxhetic_server_1 yarn data --import
```

###### Quit process (ctrl+c) once import is complete

- Client is now running on http://localhost:3000
- Server is now running on http://localhost:9000
- Prisma is now running on http://localhost:4466
