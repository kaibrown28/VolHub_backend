//requirements
const express = require("express")
const bodyParser =require("body-parser")
const cors = require("cors")
const pool = require ("./db")
const app = express()
const projectsController = require('./controllers/projects.js')
const administratorController = require('./controllers/admin.js')
const volunteerController = require('./controllers/volunteer.js')
const projectLeadController = require('./controllers/projectLead.js')


const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/projects', projectsController);
app.use('/admin', administratorController);
app.use('/volunteer', volunteerController);
app.use('/projectLead', projectLeadController);

//.listeners
app.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}.`)
})



