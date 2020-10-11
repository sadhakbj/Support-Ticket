# Support Ticket API
Full stack web application / boilerplate using
[Nest](https://github.com/nestjs/nest) framework TypeScript.

## Requirements:
Make sure you have following nodejs dependencies installed on your machine:
- yarn or `npm install -g yarn`
- ts-node or `npm install -g ts-node`

## Install all the dependencies

```bash
$ yarn
```

## Copy and Set Environment file

```bash
$ cp .env.example .env
```

- Update database configurations accordingly and if using docker for postgres:

```bash
$ docker-compose up -d
```

## Running and generation of migration using typeorm:
****
- Run the migration using command: `yarn migrate` or `yarn typeorm migration:run`
- Rollback the migration using command: `yarn migrate:rollback` or `yarn typeorm migration:revert`
- Automatically generate migration for your entity: `yarn typeorm migration:generate -n NameOfYourMigration`
- Create a migration for code first approach: `yarn migration:make -n CreateBlogsTable`

### Refer to TypeORM's official documentation for details.

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
- Access the api docs at: `http://localhost:8000/api/docs`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

