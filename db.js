const Pool = require("pg").Pool;
require("dotenv").config


const pool= new Pool({
    user: "",
    password: "",
    host: "localhost",
    port: 5432,
    database: "volunteerhub"
});

const proConfig ={
    connectionString: process.env.DATABASE_URL
};


module.exports = pool