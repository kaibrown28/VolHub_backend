const Pool = require("pg").Pool

const pool = new Pool ({
    user: "voladmin",
    password: "volpassword" ,
    host: "localhost",
    port: 5432,
    database: "volunteerhub_db"
})

module.exports = pool

//------------PROJECTS----------------//
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
    pool.query('SELECT * FROM projects ORDER BY project_id ASC', (error, results) => {
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
      'UPDATE projects SET description = $1, projectlead = $2, organization = $3 WHERE project_id = $4', [ description, projectlead, organization, id],
      (error, results) => {
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

 

//--------------VOLUNTEERS----------------//
  const createVolunteer = (request, response) => {
        const { firstname, lastname, interests, skills } = request.body;
        pool.query( 'INSERT INTO volunteers (firstName, lastName, interests, skills) VALUES($1, $2, $3, $4) RETURNING * ',
        [firstname, lastname, interests, skills], (err, results) => {
            if (err){
                throw(err)
            }response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        }
        ); 
    } 
//show all
const getVolunteers = (request, response) => {
    pool.query('SELECT * FROM volunteers ORDER BY volunteer_id ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
    }
    //show one
    const getVolunteerByID= (request, response) => {
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
            const  id  = parseInt(request.params.id);
            const { firstname, lastname, interests, skills } = request.body;
            pool.query( "UPDATE volunteers SET firstName = $1, lastName = $2, interests = $3, skills = $4 WHERE volunteer_id = $5", [ firstname, lastname, interests, skills, id],
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
            const  id  = parseInt(request.params.id);
            pool.query( "DELETE FROM volunteers WHERE volunteer_id = $1", [id], (error, results) => {
                if (error) {
                  throw error
                }
                response.status(200).send(`User deleted with ID: ${id}`)
              })
            }

//------------PROJECT LEADS----------------//
const createProjectLead = (request, response) => {
    const { firstname, lastname, organization } = request.body;
    pool.query( "INSERT INTO projectlead (firstname, lastname, organization) VALUES($1, $2, $3) RETURNING *",
    [firstname, lastname, organization], (error, results) => {
        if (error){
            throw(error)
        }response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    }
    ); 
} 
//show all
const getProjectLead = (request, response) => {
pool.query('SELECT * FROM projectlead ORDER BY projectlead_id ASC', (error, results) => {
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
        const  id  = parseInt(request.params.id);
        const { firstname, lastname, organization } = request.body;
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
        const  id  = parseInt(request.params.id);
        pool.query( "DELETE FROM projectlead WHERE projectlead_id = $1", [id], (error, results) => {
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
    deleteProject,
    getVolunteers,
    getVolunteerByID,
    createVolunteer,
    updateVolunteer,
    deleteVolunteer,
    getProjectLead,
    getProjectLeadByID,
    createProjectLead,
    updateProjectLead,
    deleteProjectLead,
  }