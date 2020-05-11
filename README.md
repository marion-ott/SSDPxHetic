# SSDPxHetic

### Temporary dev install process
##### install dependencies
```shell
$ cd client
$ yarn install
$ cd server
$ yarn install
````

##### create environment variables file
```shell
$ cd server
$ mkdir config && cd config
$ touch dev.env
```

##### copy & paste the following variables in dev.env
```env
PORT=9000
PRISMA_ENDPOINT=http://prisma:4466
PRISMA_SECRET=MySecret1234
JWT_SECRET="thisisasecret"
```

##### open server/prisma/prisma.yml, comment line 3 (secret) & replace ${env:PRISMA_ENDPOINT} by http://locahost:4466

##### deploy prisma service
```shell
$ cd server
$ yarn deploy
```

##### import data
```shell
$ cd server
$ yarn data --import
```
Quit process (ctrl+c) once import is complete

##### open server/prisma/prisma.yml, uncomment line 3 (secret) & replace http://locahost:4466 by ${env:PRISMA_ENDPOINT}

##### generate new prisma client
```shell
$ cd server
$ yarn generate
```

###### client running on http://localhost:3000
###### server running on http://localhost:9000
###### prisma running on http://localhost:4466
