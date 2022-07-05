const db = require ("../queries")

const express = require("express")    
const router = express.Router()

const pool = new Pool ({
user: "voladmin",
password: "volpassword" ,
host: "localhost",
port: 5432,
database: "ProjectLeadhub_db"
})

module.exports = pool
//routes



const createProjectLead = (request, response) => {
    const { firstname, lastname, organization } = req.body;
    pool.query( "INSERT INTO projectlead (firstname, lastname, organization) VALUES($1, $2, $3",
    [firstname, lastname, organization], (err, results) => {
        if (err){
            throw(err)
        }response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    }
    ); 
} 
//show all
const getprojectlead = (request, response) => {
pool.query('SELECT * FROM projectlead ORDER BY id ASC', (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).json(results.rows)
})
}
//show one
const getProjectLeadByID = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('SELECT * FROM projectlead WHERE projectlead_id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
    }

//update
const updateProjectLead = (request, response) => {
        const  id  = parseInt(req.params.id);
        const { firstname, lastname, organization } = req.body;
        pool.query( "UPDATE projectlead SET firstname = $1, lastname = $2, organization= $3 WHERE projectlead_id = $4", [ firstname, lastname, organization, id],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
            }
        )
        }
//delete
const deleteProjectLead = (request, response) => {
        const  id  = parseInt(req.params.id);
        pool.query( "DELETE FROM projectlead WHERE projectlead_id = $1", [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User deleted with ID: ${id}`)
            })
        }
module.exports ={
    getProjectlead,
    getProjectLeadByID,
    createProjectLead,
    updateProjectLead,
    deleteProjectLead,
    }

router.get('/projectlead', db.getprojectlead)
router.get('/projectlead/:id', db.getProjectLeadByID)
router.post('/projectlead', db.createProjectLead)
router.put('/projectlead/:id', db.updateProjectLead)
router.delete('/projectlead/:id', db.deleteProjectLead)

module.exports = router;