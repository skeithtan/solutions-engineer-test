## Stack Overview

The solution stack is written on [TypeScript](https://www.typescriptlang.org) as the language on
the [Node.js](https://nodejs.dev) runtime. The Object Relational Mapping in the solution uses
the [TypeORM](https://nodejs.dev)
library. The database itself is an instance of [SQL.js](https://sql.js.org), an in-memory database, to simplify running
the solution. In a production environment, this can easily be substituted with other database drivers (i.e., PostgreSQL,
MySQL, etc.) by specifying the connection options in the configuration file.

The stack uses [Koa.js](https://koajs.com) as the web framework. Request objects are validated through defined schemas
using the [Joi](https://joi.dev) validation library and [Winston](https://github.com/winstonjs/winston) logs events to
the console and/or to files. The testing framework is [Jest](https://jestjs.io).

## First launch prerequisites

Certain environmental variables must be specified to run the server. These environmental variables can be injected to
the instance in a production environment or read from a .env file in a development environment.

To launch the solution, create a .env file at the root folder of the project, and paste the following values:

```dotenv
# Server
SERVER_PORT=8000

# Logger
LOGGER_LEVEL=info
LOGGER_ERROR_LOG_FILENAME=error.log
LOGGER_COMBINED_LOG_FILENAME=combined.log

# TypeORM
TYPEORM_CONNECTION=sqljs
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=false
TYPEORM_ENTITIES=src/entities/**/*.ts
```

Then proceed to install all dependencies using `yarn`.

## Scripts
The package.json contains scripts to facilitate actions.

### Test suite
Runs the test suite with Jest. Ensure that the server port specified is not used by any other process.

`yarn test`

### Production build
Compiles the TypeScript source and creates a production ready build.

`yarn build`

### Running the application

Starts the nodemon server and runs a development build. Ensure that the server port specified is not used by any other process.

`yarn start:dev`

## API Specification

### POST /couriers
Creates a courier. Requires a payload with an ID and max capacity. Example payload:
```json
{
    "id": 1234,
    "max_capacity": 45
}
```

### PUT /couriers/:id
Modifies an existing courier with the given ID. Requires a payload with an ID and max capacity. Example payload:
```json
{
    "id": 1234,
    "max_capacity": 45
}
```

### DELETE /couriers/:id
Deletes an existing courier with the given ID.

### GET /couriers/lookup
Retrieve all couriers with a given max capacity. The max capacity can be specified as a query parameter, like so: `/couriers/lookup?capacity_required=45`. Without a specified max capacity, the value is inferred to be 0.

Response contains an array of couriers. Example response:
```json
[
	{
		"id": 1232,
		"max_capacity": 30
	},
	{
		"id": 1233,
		"max_capacity": 40
	},
	{
		"id": 1234,
		"max_capacity": 50
	}
]
```