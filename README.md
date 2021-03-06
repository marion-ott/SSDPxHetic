# SSDPxHetic

### Install dependencies
```shell
$ cd client
$ yarn
$ cd server
$ yarn
$ cd app
$ yarn
```

### Create environment variables file
```shell
$ cd server
$ mkdir config && cd config
$ touch dev.env
```

### Copy & paste the following variables in server/config/dev.env
```env
PORT=9000
PRISMA_ENDPOINT=http://prisma:4466
PRISMA_SECRET=MySecret1234
JWT_SECRET="thisisasecret"
```

### Start docker containers
```shell
$ docker-compose up
```

### Deploy prisma service to init database or update data model
```shell
$ docker exec ssdpxhetic_server_1 yarn deploy
```

### Import data

```shell
$ docker exec ssdpxhetic_server_1 yarn data --import
$ docker exec ssdpxhetic_server_1 yarn task
```

###### Quit process (ctrl+c) once import is complete

- Client is now running on http://localhost:3000
- Server is now running on http://localhost:9000
- Prisma is now running on http://localhost:4466
