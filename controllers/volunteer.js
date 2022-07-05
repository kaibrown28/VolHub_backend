const db = require ("../queries")

const express = require("express")    
const router = express.Router()

const pool = new Pool ({
user: "voladmin",
password: "volpassword" ,
host: "localhost",
port: 5432,
database: "volunteerhub_db"
})

module.exports = pool
//routes



const createVolunteer = (request, response) => {
    const { firstName, lastName, interests, skills } = req.body;
    pool.query( "INSERT INTO volunteers (firstName, lastName, interests, skills) VALUES($1, $2, $3, $4)",
    [firstName, lastName, interests, skills], (err, results) => {
        if (err){
            throw(err)
        }response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    }
    ); 
} 
//show all
const getVolunteers = (request, response) => {
pool.query('SELECT * FROM volunteers ORDER BY id ASC', (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).json(results.rows)
})
}
//show one
const getVolunteerByID = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('SELECT * FROM volunteers WHERE volunteer_id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
    }

//update
const updateVolunteer = (request, response) => {
        const  id  = parseInt(req.params.id);
        const { firstName, lastName, interests, skills } = req.body;
        pool.query( "UPDATE volunteers SET firstName = $1, lastName = $2, interests = $3, skills = $4 WHERE volunteer_id = $5", [ firstName, lastName, interests, skills, id],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
            }
        )
        }
//delete
const deleteVolunteer = (request, response) => {
        const  id  = parseInt(req.params.id);
        pool.query( "DELETE FROM volunteers WHERE volunteer_id = $1", [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User deleted with ID: ${id}`)
            })
        }
module.exports ={
    getVolunteers,
    getVolunteerByID,
    createVolunteer,
    updateVolunteer,
    deleteVolunteer,
    }

router.get('/volunteers', db.getVolunteers)
router.get('/volunteers/:id', db.getVolunteerByID)
router.post('/volunteers', db.createVolunteer)
router.put('/volunteers/:id', db.updateVolunteer)
router.delete('/volunteers/:id', db.deleteVolunteer)

module.exports = router;