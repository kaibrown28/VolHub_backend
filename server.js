//requirements
const express = require("express")
const bodyParser =require("body-parser")
const cors = require("cors")
const pool = require ("./db")
const app = express()

//user auth configuration
require("./configs/dotenv");
const client  =  require("./configs/database");
client.connect((err) => { //Connected Database
    if (err) {
        console.log(err);
    }
    else {
    console.log("Data logging initiated!");}
    });

const user  =  require("./routes/user");
app.use("/user",  user);



//express router
const router = express.Router();

const projectsRouter = require('./controllers/projects.js')
const administratorController = require('./controllers/admin.js')
const volunteerController = require('./controllers/volunteer.js')
const projectLeadController = require('./controllers/projectLead.js')
const dotenv = require("dotenv")

dotenv.config({
    path: '../.env'
})

const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, '../client/build')))
app.use("/", router);
app.use('/projects', projectsRouter);
app.use('/admin', administratorController);
app.use('/volunteer', volunteerController);
app.use('/projectLead', projectLeadController);


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/../client/build/index.html'))
// })



//.listeners
app.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}.`)
})


// app.get("/projects", async(req,res) =>{
//     try {
//         const allProjects = await pool.query( "SELECT * FROM projects");
//         res.json(allProjects.rows); 
//     } catch (err) {
//         console.error(err.message);
//     }
//     })

