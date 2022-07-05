const express = require('express');
const projectsRouter = express.Router();

//routes

//show all
projectsRouter.get("/projects", async(req,res) =>{
try {
    const allProjects = await pool.query( "SELECT * FROM projects");
    res.json(allProjects.rows); 
} catch (err) {
    console.error(err.message);
}
})
    //show one
    projectsRouter.get("/projects/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const project = await pool.query( "SELECT * FROM projects WHERE project_id = $1", [id]);
            res.json(project.rows); 
        } catch (err) {
            console.error(err.message);
        }
        })

//create
projectsRouter.post("/", async(req,res) =>{
    try {
        const { description, projectlead, organization } = req.body;
        const newProject = await pool.query( "INSERT INTO projects (description, projectlead, organization) VALUES($1, $2, $3)",
        [description, projectlead, organization]
        ); 
    } catch (err) {
        console.error(err.message);
    }
})
//update
projectsRouter.put("/projects/:id", async(req,res) =>{
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
projectsRouter.delete("projects/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const deleteProject = await pool.query( "DELETE FROM projects WHERE project_id = $1", [id]);
        res.json("The project was deleted."); 
    } catch (err) {
        console.error(err.message);
    }
    })
    module.exports = projectsRouter;