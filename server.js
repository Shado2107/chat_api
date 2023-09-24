const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./utils/db")


const app = express();
const PORT = process.env.PORT || 3000;


//les middlewares
app.use(express.json())


//http get request
app.get("/", (req, res)=>{
    res.status(201).json("chat app api")
})


//api routes



//Start server only when we have valid connection
connectDB().then(() => {
    try{

        //Demarrage du serveur sur le PORT = 3000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    } catch(error) {
        console.log("cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid database connection...!")
}) 