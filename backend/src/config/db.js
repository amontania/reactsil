 import { config } from "dotenv";

config();



const silonline={
  db: {
    host: process.env.MYSQLDB_HOSTSIL,
    port: process.env.MYSQLDB_LOCAL_PORTSIL,
    database: process.env.MYSQLDB_DATABASESIL,
    user: process.env.MYSQLDB_USERSIL,
    password: process.env.MYSQLDB_PASSWORDSIL,
  },
  listPerPage: 10,
  jwtExpiration: process.env.jwtExpiration, // 2 hour
  jwtRefreshExpiration: process.env.jwtRefreshExpiration, // 24 hours
}

const silserver={
  db: {
    host: process.env.MYSQLDB_HOST,
    port: process.env.MYSQLDB_LOCAL_PORT,
    database: process.env.MYSQLDB_DATABASE,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
  },
  listPerPage: 10,
  jwtExpiration: process.env.jwtExpiration, // 2 hour
  jwtRefreshExpiration: process.env.jwtRefreshExpiration, // 24 hours
}


export const dbconfig = {
  silonline,
  silserver
};