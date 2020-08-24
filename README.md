# MTA SUBWAY STATUS TRACKER

### Objective

Create a web service to monitor the MTA's subway routes

## Installation

To run this app locally on your machine, clone this repository and create an `.env` file in the main directory

```
$ git clone git@github.com:bnguyen212/mta-status-tracker.git
$ cd mta-status-tracker
$ npm install
$ touch .env
```

You will also need to have access to your own PostgreSQL database. Put your DB credentials in the `.env` file in the following format:
```
DATABASE_URL='postgres://username:password@example.com:5432/dbname'
```

Type `npm start` in the terminal to start running the app locally, which you can access at `localhost:3000`

## Endpoints

#### `/status`

- Method: `GET`

- Required Query: `route=[alphanumeric]`

- Sample Success Response:

  ```
  {
    route: "4",
    delayed: false,
    timestamp: "2020-08-24T08:34:55-04:00"
  }
  ```
  **NOTE**: `timestamp` refers to when the subway route last switched to this `delayed` status


#### `/uptime`

- Method: `GET`

- Required Query: `route=[alphanumeric]`

- Sample Success Response:

  ```
  {
    route: "4",
    uptime: 0.7704990038659492,
    start: "2020-08-24T06:03:56-04:00",
    end: "2020-08-24T17:32:29-04:00"
  }
  ```
  **NOTE**: `start` refers to the earliest record available in the database, `end` refers to a moment between the time the request was made and the time the server responded


## Tech
- Node.js
- Express
- PostgreSQL

## Author
Brian Nguyen - <a href="https://briannguyen.dev" target="_blank">Website</a> | <a href="https://github.com/bnguyen212" target="_blank">GitHub</a> | <a href="https://www.linkedin.com/in/brian-trong-nguyen/" target="_blank">LinkedIn</a>
