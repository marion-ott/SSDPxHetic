# SSDPxHetic

### Install dependencies
```shell
$ cd client
$ yarn install
$ cd server
$ yarn install
```

### Create environment variables file

```shell
$ cd server
$ mkdir config && cd config
$ touch dev.env
```

### Copy & paste the following variables in dev.env
```env
PORT=9000
PRISMA_ENDPOINT=http://prisma:4466
PRISMA_SECRET=MySecret1234
JWT_SECRET="thisisasecret"
```
