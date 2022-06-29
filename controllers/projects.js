//routes
    //Create
        app.post("/projects", async(req,res) =>{
            try {
                const { description } = req.body;
                const newProject = await pool.query( "INSERT INTO projects (description) VALUES($1)",
                [description]
                ); 
            } catch (err) {
                console.error(error.message);
            }
        })
    //show all
    app.post("/projects", async(req,res) =>{
        try {
            const allProjects = await pool.query( "SELECT * FROM projects",
            res.json(allProjects.rows)
            ); 
        } catch (err) {
            console.error(error.message);
        }
    })
    //show one
    //update
    //delete