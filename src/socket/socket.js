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

const userSocketMap = new Map(); // {userId: socketId}

io.on("connection", (socket) => {
  socket.on('setup', (userId) => {
    console.log('user._id', userId)
    socket.join(userId)
    socket.emit('connected')
    userSocketMap.set(userId, socket.id);
  })

  socket.on("join room", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("send", (message) => {
    console.log(message)
    const {room, ...rest} = message;
    socket.in(message.room).emit('receive', rest)
  })

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    const room = userSocketMap.get(userId);
    socket.leave(room);
  });
});

export { app, io, server };
