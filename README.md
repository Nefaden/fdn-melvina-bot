<h1 align="center">Welcome to fdn-melvina-bot 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/yanndurand11" target="_blank">
    <img alt="Twitter: yanndurand11" src="https://img.shields.io/twitter/follow/yanndurand11.svg?style=social" />
  </a>
</p>

> Discord bot for the Ponce's sub community called "Fleurs de Nantes". This bot will help us to manage many IRL and IG events created on our discord server and add some missing features from the native one.

## Generate SSH key (In order to clone project in more secure way)
```
mkdir -p ~/.ssh
chmod 0700 ~/.ssh
cd ~/.ssh
ssh-keygen

cat id_rsa.pub
```
## Install with NPM

```sh
npm install
```

### Create your own .env file.env

```bash
cp .env.dist .env
```

### DB Postgres install

- Docker engine (CLI or desktop App) :
  Docker install with Postgis image to monitorate the DB
  ```bash
  docker run -d \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_USER=postgres \
    postgis/postgis:11-3.0-alpine
  ```
**OR**
- PostgresSQL Install on UNIX system :
  ```
   sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
   wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
   sudo apt-get update
   sudo apt install postgresql-11
   sudo apt install postgis postgresql-11-postgis-3
  ```

**To start server :**
```sh
sudo -u postgres pg_ctlcluster 11 main start
```

If this error occurs "Could not create /var/run/postgresql/11-main.pg_stat_tmp: No such file or directory" when starting server :
```sh
  cd /var/run
  sudo mkdir postgresql
  chown -R postgres.postgres postgresql/
  sudo -u postgres pg_ctlcluster 11 main start
```

## Usage
### Create DB
```sh
npm run test:prepare
```
This script erase the existing DB and replace it with fresh one. 

If you want to execute latest migrations files run this :
```sh
npm run sequelize db:migrate
```

You can undo the latest migration with this :
```sh
npm run sequelize db:migrate:undo
```

/!\ If there is problems while executing test:prepare and those problems are related to PG and/or sequelize, run this :
```sh
npm install -g pg sequelize sequelize-cli 
```
Reexecute the prepare or migrate script

### Deploy the commands
```sh
npm run deploy-commands
```

### Start the bot
```sh
npm run start
```

## Run tests

### Unit tests

```sh
npm run test:unit
```
### Integration tests

```sh
npm run test:integ
```
### Features tests

```sh
npm run test:features
```

### Execute all tests

```sh
npm run test:all
```

**Tips unit and integration tests**

You can run only one (or more) specified test(s) (who start with `.it`) or a tests group (starting with `.describe`) by adding `.only`.
Example : 
```bash
> describe("Commands :: Handlers :: createOutingEvent", () => {
> describe.only("ValidationMiddleWare", () => {
```

**Tips tests features**

To execute unique specified feature test, execute this command : 
```bash
npm run test:features -- --name "[scenario name]"
```
## Author

👤 **Yann Durand**

* Website: codewithnefaden.com
* Twitter: [@yanndurand11](https://twitter.com/yanndurand11)
* Github: [@nefaden](https://github.com/nefaden)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_