require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')
const mongoose = require("mongoose");
const { DB_URI, PORT } = require("./config");
const { createServer } = require("http");
const httpServer = createServer(app);
const socketIo = require("socket.io")
const io = socketIo(httpServer, {
  pingTimeout: 60000
});

//connectDB
mongoose.connect(
  DB_URI,
  {
    useNewUrlParser : true, 
    useUnifiedTopology : true
  },
  (err) => {
    if (!err) {
      console.log("success connect to " + DB_URI);
    } else {
      console.log("connection to database failed");
    }
  }
);

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  // socket.on('joinRoom', order => {
  //   console.log(socket.id, "request join room", order);
  //   socket.join(order)
  //   console.log("join to room", socket.rooms);
  //   socket.emit(`receiveRoom`, order)
  // })
  socket.on("diceClicked", order => {
    io.sockets.emit("diceClicked-room1", order);
    console.log(socket.id, 'diceClicked order', order);
  });
  socket.on("playerClicked-room1", order => {
    io.sockets.emit("playerClicked-room1", order);
    console.log('playerClicked order', order);
  });
  // socket.on("userJoined-room1", order => {
  //   socket.emit("userJoined-room1", order);
  //   console.log('userJoined-room1', order);
  // });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on("disconnecting", (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        console.log(`user ${socket.id} has left`);
        socket.to(room).emit("user has left", socket.id);
      }
    }
  });
});

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(router)


httpServer.listen(PORT, () => {
    console.log('app listening on port', PORT)
})


