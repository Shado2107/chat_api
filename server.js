const express = require("express");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages")
const dotenv = require("dotenv").config();
const connectDB = require("./utils/db")
const socket = require("socket.io")
const cors = require("cors")



const app = express();
const PORT = process.env.PORT || 3000;


//les middlewares
app.use(express.json())


//http get request
app.get("/", (req, res)=>{
    res.status(201).json("chat app api")
})


//api routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


//Start server only when we have valid connection
connectDB().then(() => {
    try{
        //Demarrage du serveur sur le PORT = 3000
       const server =  app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    } catch(error) {
        console.log("cannot connect to the server");
    }

    const io = socket(server, {
        cors : {
            origin: "http://localhost:3000",
            credentials: true,
        }
    });

    global.onlineUsers = new Map();
    io.on("connecction", (socket)=> {
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id);
        })
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive", data.msg)
        };
    });


}).catch(error => {
    console.log("Invalid database connection...!", error)
}) 


