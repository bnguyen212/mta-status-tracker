# MTA SUBWAY STATUS TRACKER

https://mta-status-tracker.herokuapp.com/

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


#### `/uptime`

- Method: `GET`

- Required Query: `route=[alphanumeric]`

- Sample Success Response:

  ```
  {
    route: "4",
    uptime: 0.7704990038659492,
    start: "2020-08-24T10:03:56.878Z",
    end: "2020-08-24T21:01:49.979Z"
  }
  ```


## Tech
- Node.js
- Express
- PostgreSQL

## Author
Brian Nguyen - <a href="https://www.briannguyen.dev" target="_blank">Website</a> | <a href="https://github.com/bnguyen212" target="_blank">GitHub</a> | <a href="https://www.linkedin.com/in/brian-trong-nguyen/" target="_blank">LinkedIn</a>