//Your code is a simple Express.js server that listens on port 3000 and responds
//  with "Hello World from our cool app"
const bycrypt = require("bcryptjs")
//we are requiring the express module
const express = require("express")
const db = require("better-sqlite3")("OurApp.db")
//the below code will improve the performance of our database
db.pragma("journal_mode = WAL")
// database setup here
const createTables = db.transaction(() => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username STRING NOT NULL UNIQUE,
        password STRING NOT NULL
        
        )

        `).run()

})
createTables()

const app = express()
//now we tell our express app to use ejs
app.set("view engine", "ejs")
//we tell express to use the public folder as a static folder
app.use(express.urlencoded({extended: false}))

app.use(express.static("public"))
//this is what we call middleware
//this is a function that runs before our routes
app.use(function (req, res, next) {
    res.locals.errors = []
    next()
})

//we use get request when we are trying to visit a url
//express is going to give us access to request and response  
app.get("/", (req, res) => {

    res.render("homepage")
//res.send("Hello World from our cool app from kenneth")
// instead of using res. send lets use render
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/register", (req, res) => {
   const errors = []

if (typeof req.body.username !== "string") req.body.username = ""
if (typeof req.body.password !== "string") req.body.password = ""

req.body.username = req.body.username.trim()
//provide a description to set standards for pwd evaluation

    if (!req.body.username) errors.push("you must provide a username.")
    if (req.body.username && req.body.username. length < 3) errors.push("your username must be at least 3 characters.")
    if (req.body.username && req.body.username. length > 10) errors.push("Username cannot exceed 10 characters.")
          //setting limitation requirements for password evaluaotr using the push  and match method.
    if (req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/)) errors.push("Username can only contain alphanumeric characters.")
    // if there are errors or no errors we render the homepage.
    // setting up password requirements without limitations
    if (!req.body.password) errors.push("you must provide a password.")
        if (req.body.password && req.body.password. length < 12) errors.push("your Password must be at least 12 characters.")
        if (req.body.password && req.body.password. length > 70) errors.push("Password cannot exceed 70 characters.")
    
    
    if (errors.length) {
        return res.render("homepage", {errors})
    } 
    // save the new user into a database 
    // hash the password
    const salt = bycrypt.genSaltSync(10)
    req.body.password = bycrypt.hashSync(req.body.password, salt)

    const ourStatement = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)")
    ourStatement.run(req.body.username, req.body.password)
    
    
    
    
    res.send("Thank you for filling out david the form")
    


//log the user in by giving him a cookeie

})


// Lets tell our application to listen  on port 3000
app.listen(3000)
//NB node apps are loaded manually in memory hence with changes you have to 
//restart the server which is not advisable in production
