const Pool = require("pg").Pool

const pool = new Pool ({
    user: "",
    password: "" ,
    host: "postgres://amymzpurmqiied:f3b899081a9390a04f83549e05c7fa83cf75af9a730158104cf2c5bed445ce94@ec2-44-198-82-71.compute-1.amazonaws.com:5432/daohosvavhm5ff",
    port: 5432,
    database: "volunteerhub"
})

module.exports = pool