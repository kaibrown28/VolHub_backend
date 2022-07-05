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
// router.get('/', (req, res) => {
//     res.json("This is the projects index page")
//   })

     const createProject = (request, response) => {
    const {description, projectlead, organization} = request.body
  
    pool.query('INSERT INTO projects (description, projectlead, organization) VALUES($1, $2, $3) RETURNING *', [description, projectlead, organization], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

//show all
const getProjects = (request, response) => {
    pool.query('SELECT * FROM projects ORDER BY id ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
    }

//show one

const getProjectById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM projects WHERE project_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//update
const updateProject = (request, response) => {
    const id = parseInt(request.params.id)
    const { description, projectlead, organization } = request.body
  
    pool.query(
      'UPDATE projects SET description = $1, projectlead = $2, organization = $3 WHERE project_id = $4"', [ description, projectlead, organization, id],
      (error, result) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
//delete

const deleteProject = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM projects WHERE project_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,}
    
  router.get('/projects', db.getProjects)
  router.get('/projects/:id', db.getProjectById)
  router.post('/projects', db.createProject)
  router.put('/projects/:id', db.updateProject)
  router.delete('/projects/:id', db.deleteProject)

  module.exports = router;