// const express = require('express');
// const router = express.Router();

// //routes
// router.get("/",(req,res)=>{
//     res.send("VOlunteer request")
// })


// router.post("/volunteers", async(req,res) =>{
//     try {
//         const { firstName, lastName, interests, skills } = req.body;
//         const newVolunteer = await pool.query( "INSERT INTO volunteers (firstName, lastName, interests, skills) VALUES($1, $2, $3, $4)",
//         [firstName, lastName, interests, skills]
//         ); 
//     } catch (err) {
//         console.error(err.message);
//     }
// })
// //show all
// router.get("/volunteers", async(req,res) =>{
// try {
//     const allVolunteers = await pool.query( "SELECT * FROM volunteers");
//     res.json(allVolunteers.rows); 
// } catch (err) {
//     console.error(err.message);
// }
// })
//     //show one
//     router.get("/volunteers/:id", async(req,res) =>{
//         try {
//             const { id } = req.params;
//             const Volunteer = await pool.query( "SELECT * FROM volunteers WHERE volunter_id = $1", [id]);
//             res.json(Volunteer.rows); 
//         } catch (err) {
//             console.error(err.message);
//         }
//         })
//     //update
//     router.put("/volunteers/:id", async(req,res) =>{
//         try {
//             const { id } = req.params;
//             const { firstName, lastName, interests, skills } = req.body;
//             const updateVolunteer = await pool.query( "UPDATE volunteers SET firstName = $1, lastName = $2, interests = $3, skills = $4 WHERE volunteer_id = $5", [ firstName, lastName, interests, skills, id]);
//             res.json(updateVolunteer.rows); 
//         } catch (err) {
//             console.error(err.message);
//         }
//         })
//     //delete
//     router.delete("/volunteers/:id", async(req,res) =>{
//         try {
//             const { id } = req.params;
//             const deleteVolunteer = await pool.query( "DELETE FROM volunteers WHERE volunteer_id = $1", [id]);
//             res.json("This Volunteer was deleted."); 
//         } catch (err) {
//             console.error(err.message);
//         }
//         })
//         module.exports = router;