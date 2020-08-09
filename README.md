<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
  
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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
$ docker-compose up -d // Make sure to check docker-compose.yml and set same configurations in .env file
```

## Running and generation of migration using typeorm:

- Set `DATABASE_SYNCHRONIZE` to `false` in `.env` file if you want to run migrations manually.
- Run the migration using command: `yarn migrate` or `yarn typeorm migration:run`
- Rollback the migration using command: `yarn migrate:rollback` or `yarn typeorm migration:revert`
- Automatically generate migration for your entity: `yarn typeorm migration:generate -n NameOfYourMigration`
- Create a migration for code first approach: `yarn typeorm migration:create -n NameOfYourMigration`

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
