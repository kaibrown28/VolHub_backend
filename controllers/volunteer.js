const express = require('express');
const router = express.Router();

//routes

router.get('/', (req, res) => {
    res.json(res.body)
  })

router.post("/", async(req,res) =>{
    try {
        const { firstName, lastName, interests, skills } = req.body;
        const newVolunteer = await pool.query( "INSERT INTO volunters (firstName, lastName, interests, skills) VALUES($1, $2, $3, $4)",
        [firstName, lastName, interests, skills]
        ); 
    } catch (err) {
        console.error(err.message);
    }
})
//show all
router.get("/", async(req,res) =>{
try {
    const allVolunteers = await pool.query( "SELECT * FROM volunters");
    res.json(allVolunters.rows); 
} catch (err) {
    console.error(err.message);
}
})
    //show one
    router.get("/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const Volunter = await pool.query( "SELECT * FROM volunters WHERE volunter_id = $1", [id]);
            res.json(Volunter.rows); 
        } catch (err) {
            console.error(err.message);
        }
        })
    //update
    router.put("/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const { firstName, lastName, interests, skills } = req.body;
            const updateVolunter = await pool.query( "UPDATE volunters SET firstName = $1, lastName = $2, interests = $3, skills = $4 WHERE volunteer_id = $5", [ firstName, lastName, interests, skills, id]);
            res.json(updateVolunter.rows); 
        } catch (err) {
            console.error(err.message);
        }
        })
    //delete
    router.delete("/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const deleteVolunter = await pool.query( "DELETE FROM volunters WHERE volunter_id = $1", [id]);
            res.json("This Volunter was deleted."); 
        } catch (err) {
            console.error(err.message);
        }
        })
        module.exports = router;