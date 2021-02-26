require("dotenv").config();

let knexConfig = {
  client: "pg",
  connection: {
    host: process.env.HOST,
    user: process.env.DBUSERNAME,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl: true,
  },
  debug: true,
  searchPath: [process.env.DATABASE_SCHEMA],
};

const knex = require("knex")(knexConfig);

module.exports = knex;
