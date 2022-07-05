const express = require('express');
const router = express.Router();

//routes

router.get('/', (req, res) => {
    res.json("This is the admin index page")
  })

router.post("/", async(req,res) =>{
    try {
        const { firstName, lastName, organization } = req.body;
        const newAdministrator = await pool.query( "INSERT INTO administrator (firstName, lastName, organization) VALUES($1, $2, $3)",
        [firstName, lastName, organization]
        ); 
    } catch (err) {
        console.error(err.message);
    }
})
//show all
router.get("/", async(req,res) =>{
try {
    const allAdministrators = await pool.query( "SELECT * FROM administrator");
    res.json(allAdministrators.rows); 
} catch (err) {
    console.error(err.message);
}
})
    //show one
    router.get("/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const administrator = await pool.query( "SELECT * FROM administrator WHERE admin_id = $1", [id]);
            res.json(administrator.rows); 
        } catch (err) {
            console.error(err.message);
        }
        })
    //update
    router.put("/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const { firstName, lastName, organization} = req.body;
            const updateAdministrator = await pool.query( "UPDATE administrator SET firstName = $1, lastName = $2, organization = $3 WHERE projectlead_id = $4", [ firstName, lastName, organization, id]);
            res.json(updateAdministrator.rows); 
        } catch (err) {
            console.error(err.message);
        }
        })
    //delete
    router.delete("/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const deleteAdministrator= await pool.query( "DELETE FROM administrator WHERE admin_id = $1", [id]);
            res.json("The administrator was deleted."); 
        } catch (err) {
            console.error(err.message);
        }
        })
        module.exports = router;