const express = require('express');
const router = express.Router();

//routes

router.get('/', (req, res) => {
    res.json("This is the project lead index page")
  })

router.post("/", async(req,res) =>{
    try {
        const { firstName, lastName, organization} = req.body;
        const newProjectLead = await pool.query( "INSERT INTO projectlead (firstName, lastName, organization) VALUES($1, $2, $3)",
        [firstName, lastName, organization]
        ); 
    } catch (err) {
        console.error(err.message);
    }
})
//show all
router.get("/", async(req,res) =>{
try {
    const allProjectLeads = await pool.query( "SELECT * FROM projectlead");
    res.json(allProjectLeads.rows); 
} catch (err) {
    console.error(err.message);
}
})
    //show one
    router.get("/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const projectLead = await pool.query( "SELECT * FROM projectlead WHERE projectlead_id = $1", [id]);
            res.json(projectLead.rows); 
        } catch (err) {
            console.error(err.message);
        }
        })
    //update
    router.put("/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const { firstName, lastName, organization} = req.body;
            const updateProjectLead = await pool.query( "UPDATE projectlead SET firstName = $1, lastName = $2, organization = $3 WHERE projectlead_id = $4", [ firstName, lastName, organization, id]);
            res.json(updateProjectLead.rows); 
        } catch (err) {
            console.error(err.message);
        }
        })
    //delete
    router.delete("/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const deleteProjectLead = await pool.query( "DELETE FROM projectlead WHERE projectlead_id = $1", [id]);
            res.json("The projectlead was deleted."); 
        } catch (err) {
            console.error(err.message);
        }
        })
        module.exports = router;