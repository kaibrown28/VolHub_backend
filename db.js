const Pool = require("pg").Pool

const pool = new Pool ({
    user: process.env.USER_NAME,
    password: process.env.PASSWORD ,
    host: process.env.DATABASE_URL,
    port: 5432,
    database: process.env.DATABASE_NAME
})

module.exports = pool