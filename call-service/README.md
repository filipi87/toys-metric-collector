# Daily sample metric collector - coll-service

Server side module responsible for provide an REST API, interacting with daily, and save all the information from the meetings. 

## Dev Dependencies
You will need these technologies in order to run the application
1. [Node.js](https://nodejs.org/en/download/)
2. [npm](http://npmjs.com)
3. [yarn](https://www.npmjs.com/package/yarn)   
4. [TypeScript](https://www.typescriptlang.org)

## Before execute in development
Before running, you will need to edit the file ```config/config.ts``` and configure your daily api key.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:8543/docs/](http://localhost:8543/docs/) to view the swagger documentation.

### `yarn test`

Launches the tests.

### `yarn start`

Launch the project in the production mode. In this case, the swagger documentation is not provided.