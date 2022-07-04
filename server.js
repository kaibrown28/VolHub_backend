//requirements
const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser');
const pool = require ("./db")
const timeout = require('connect-timeout')

//express server
const app = express()

//routes
// const projectsRoute = require("./routes/projects.js")
// const administratorRoute = require('./routes/admin.js')
// const volunteerRoute = require('./routes/volunteer.js')
// const projectLeadRoute = require("./routes/projectLead.js")

// app.use('/projects', projectsRoute);
// app.use('/admin', administratorRoute);
// app.use('/volunteer', volunteerRoute);
// app.use('/projectLead', projectLeadRoute);

//use local port or Heroku's assigned port
const PORT = process.env.PORT || 5000;

//Middleware
app.use(timeout('5s'))
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(haltOnTimedout)


//listeners
app.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}.`)
})

//routes
app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
  })

//------------Projects routes-------------//

//create project
app.post("/projects", async(req,res) =>{
    try {
        const { description, projectlead, organization } = req.body;
        const newProject = await pool.query( "INSERT INTO projects (description, projectlead, organization) VALUES($1, $2, $3) RETURNING *",
        [description, projectlead, organization]
        ); 
    } catch (err) {
        console.error(err.message);
    }
})

//show all projects
app.get("/projects", async(req,res) =>{
try {
    const allProjects = await pool.query( "SELECT * FROM projects");
    res.json(allProjects.rows); 
} catch (err) {
    console.error(err.message);
}
})

//get one project
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
app.delete("projects/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const deleteProject = await pool.query( "DELETE FROM projects WHERE project_id = $1", [id]);
        res.json("The project was deleted."); 
    } catch (err) {
        console.error(err.message);
    }
    })

//------------Volunteers routes-------------//
//routes

app.post("/volunteers", async(req,res) =>{
    try {
        const { firstName, lastName, interests, skills } = req.body;
        const newVolunteer = await pool.query( "INSERT INTO volunteers (firstName, lastName, interests, skills) VALUES($1, $2, $3, $4)",
        [firstName, lastName, interests, skills]
        ); 
    } catch (err) {
        console.error(err.message);
    }
})
//show all
app.get("/volunteers", async(req,res) =>{
try {
    const allVolunteers = await pool.query( "SELECT * FROM volunteers");
    res.json(allVolunteers.rows); 
} catch (err) {
    console.error(err.message);
}
})
//show one
app.get("/volunteers/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const Volunteer = await pool.query( "SELECT * FROM volunteers WHERE volunter_id = $1", [id]);
        res.json(Volunteer.rows); 
    } catch (err) {
        console.error(err.message);
    }
    })
//update
app.put("/volunteers/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { firstName, lastName, interests, skills } = req.body;
        const updateVolunteer = await pool.query( "UPDATE volunteers SET firstName = $1, lastName = $2, interests = $3, skills = $4 WHERE volunteer_id = $5", [ firstName, lastName, interests, skills, id]);
        res.json(updateVolunteer.rows); 
    } catch (err) {
        console.error(err.message);
    }
    })
//delete
app.delete("/volunteers/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const deleteVolunteer = await pool.query( "DELETE FROM volunteers WHERE volunteer_id = $1", [id]);
        res.json("This Volunteer was deleted."); 
    } catch (err) {
        console.error(err.message);
    }
    })
 

//------------Project Leads routes-------------//
// app.get('/projectlead', (req, res) => {
//     res.json(res.body)
//   })

app.post("/projectlead", async(req,res) =>{
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
app.get("/projectlead", async(req,res) =>{
try {
    const allProjectLeads = await pool.query( "SELECT * FROM projectlead");
    console.log(allProjectLeads)
    res.json(allProjectLeads.rows); 
} catch (err) {
    console.error(err.message);
}
})
//show one
app.get("/projectlead/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const projectLead = await pool.query( "SELECT * FROM projectlead WHERE projectlead_id = $1", [id]);
        res.json(projectLead.rows); 
    } catch (err) {
        console.error(err.message);
    }
    })
//update
app.put("/projectlead/:id", async(req,res) =>{
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
app.delete("/projectlead/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const deleteProjectLead = await pool.query( "DELETE FROM projectlead WHERE projectlead_id = $1", [id]);
        res.json("The projectlead was deleted."); 
    } catch (err) {
        console.error(err.message);
    }
    })

//--------------ADMIN routes--------------
//routes

// app.get('/admin', (req, res) => {
//     res.json(res.body)
//   })

app.post("/admin", async(req,res) =>{
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
app.get("/admin", async(req,res) =>{
try {
    const allAdministrators = await pool.query( "SELECT * FROM administrator");
    res.json(allAdministrators.rows); 
} catch (err) {
    console.error(err.message);
}
})
    //show one
    app.get("/admin/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const administrator = await pool.query( "SELECT * FROM administrator WHERE admin_id = $1", [id]);
            res.json(administrator.rows); 
        } catch (err) {
            console.error(err.message);
        }
        })
    //update
    app.put("/admin/:id", async(req,res) =>{
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
    app.delete("/admin/:id", async(req,res) =>{
        try {
            const { id } = req.params;
            const deleteAdministrator= await pool.query( "DELETE FROM administrator WHERE admin_id = $1", [id]);
            res.json("The administrator was deleted."); 
        } catch (err) {
            console.error(err.message);
        }
        })
        module.exports = app;

// timeout function
function haltOnTimedout (req, res, next) {
    if (!req.timedout) next()
  }
  
  app.listen(3000)