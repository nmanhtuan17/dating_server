import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  socket.on('setup', (user) => {
    console.log('user._id', user._id)
    socket.join(user._id)
    socket.emit('connected')
  })

  socket.on("join room", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("send", (message) => {
    console.log(message)
    socket.to(message.room).emit('receive', {
      room: message.room,
      msg: message.msg
    })
  })

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(user._id);
  });
});

export { app, io, server };
