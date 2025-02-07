//Your code is a simple Express.js server that listens on port 3000 and responds
//  with "Hello World from our cool app"

const express = require("express")
const app = express()
//now we tell our express app to use ejs
app.set("view engine", "ejs")
//we tell express to use the public folder as a static folder
app.use(express.static("public"))

//we use get request when we are trying to visit a url
//express is going to give us access to request and response  
app.get("/", (req, res) => {
    //res.send("Hello World from our cool app from kenneth")
    // instead of using res. send lets use render
    res.render("homepage")
})
// Lets tell our application to listen  on port 3000
app.listen(3000)
//NB node apps are loaded manually in memory hence with changes you have to 
//restart the server which is not advisable in production
