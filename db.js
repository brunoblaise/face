const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "bruno1234",
  port: 5432,
  database: "auth"
});

module.exports = pool;