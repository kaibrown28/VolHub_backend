//requirements
const express = require("express")
const bodyParser =require("body-parser")
const cors = require("cors")
const db = require ("./queries")
const app = express()

// const projects =  require("./controllers/projects")
// const admin =  require("./controllers/admin")
// const projectLead =  require("./controllers/projectLead")
// const volunteer =  require("./controllers/volunteer")


const PORT = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/projects', projects);
// app.use('/admin', admin);
// app.use('/volunteer', volunteer);
// app.use('/projectLead', projectLead);


//routes
app.get('/projects', db.getProjects)
app.get('/projects/:id', db.getProjectById)
app.post('/projects', db.createProject)
app.put('/projects/:id', db.updateProject)
app.delete('/projects/:id', db.deleteProject)

app.get('/volunteers', db.getVolunteers)
app.get('/volunteers/:id', db.getVolunteerByID)
app.post('/volunteers', db.createVolunteer)
app.put('/volunteers/:id', db.updateVolunteer)
app.delete('/volunteers/:id', db.deleteVolunteer)


//.listeners
app.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}.`)
})