 import {Server} from "socket.io";
 import http from "http";
 import express from "express";

 const app = express();
 const server = http.createServer(app);

 const io = new Server(server , {
    cors : {
        origin: ["http://localhost:5173"],
        // credentials : true
    }
 })

 //listening in comming connections

 io.on("connection" , (socket) => {
    console.log("A User connected" , socket.id);

    socket.on("disconnect" , () => {
        console.log("a user disconnected" , socket.id)
    })
 })

 export {io , app , server};