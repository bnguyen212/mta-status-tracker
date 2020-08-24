# MTA SUBWAY STATUS TRACKER

https://mta-status-tracker.herokuapp.com/

___Note___: there might be some inconsistency in the response because Heroku's free tier puts the servver to sleep after being idle for some time

### Objective

Create a web service to monitor the MTA's subway routes

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
