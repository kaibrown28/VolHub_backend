//requirements
const express = require("express")
const bodyParser =require("body-parser")
const cors = require("cors")
const pool = require ("./db")
const app = express()

const PORT = process.env.PORT || 3003;

//Middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//.listeners
app.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}.`)
})

//routes

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.post("/projects", async(req,res) =>{
    try {
        const { description, projectlead, organization } = req.body;
        const newProject = await pool.query( "INSERT INTO projects (description, projectlead, organization) VALUES($1, $2, $3)",
        [description, projectlead, organization]
        ); 
    } catch (err) {
        console.error(err.message);
    }
})
//show all
app.get("/projects", async(req,res) =>{
try {
    const allProjects = await pool.query( "SELECT * FROM projects");
    res.json(allProjects.rows); 
} catch (err) {
    console.error(err.message);
}
})
    //show one
    app.get("/projects/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const project = await pool.query( "SELECT * FROM projects WHERE project_id = $1", [id]);
            res.json(project.rows); 
        } catch (err) {
            console.error(err.message);
        }
        })
    //update
    app.put("/projects/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const { description, projectlead, organization } = req.body;
            const updateProject = await pool.query( "UPDATE projects SET description = $1, projectlead = $2, organization = $3 WHERE project_id = $4", [ description, projectlead, organization, id]);
            res.json(updateProject.rows); 
        } catch (err) {
            console.error(err.message);
        }
        })
    //delete
    app.delete("/projects/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const deleteProject = await pool.query( "DELETE FROM projects WHERE project_id = $1", [id]);
            res.json("The project was deleted."); 
        } catch (err) {
            console.error(err.message);
        }
        })