//requirements
const express = require("express")
const bodyParser =require("body-parser")
const cors = require("cors")
const pool = require ("./db")
const app = express()
const port = 5000

//Middleware
app.use(cors())
app.use(express.json)

//.listeners
app.listen(port, () => {
    console.log(`I'm listening on port ${port}.`)
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//routes

app.get('/', (req, res) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
  
app.post("/projects", async(req,res) =>{
    try {
        const { description } = req.body;
        const newProject = await pool.query( "INSERT INTO projects (description) VALUES($1)",
        [description]
        ); 
    } catch (err) {
        console.error(error.message);
    }
})
//show all
app.post("/projects", async(req,res) =>{
try {
    const allProjects = await pool.query( "SELECT * FROM projects",
    res.json(allProjects.rows)
    ); 
} catch (err) {
    console.error(error.message);
}
})
    //show one
    //update
    //delete