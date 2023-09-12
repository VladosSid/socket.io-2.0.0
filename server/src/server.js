const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const routerAuth = require('./router/routerAuth');
const routerRooms = require('./router/routerRooms');

const socketOperations = require('./socket')

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const PORT_SOCKET = 5050

app.use(express.json());
app.use(cors());
app.use('/auth', routerAuth);
app.use('/room', routerRooms);

let count = 1

io.on('connection', (socket) => {
  console.log('connected', count, '-', socket.client.id);
  count += 1
  socket.handshake.auth.userInRoom = null
  // disconected
  socket.on('disconnect', async () => {
    try {
      data = {
        socketId: socket.client.id,
        userId: socket.handshake.auth.userId,
        roomId: socket.handshake.auth.userInRoom,
      }

      const dataDisconected = await socketOperations.disconnectedUser(data)
      
      socket.to(data.roomId).emit('leaveRoom', dataDisconected)
      socket.leave(socket.handshake.auth.roomId)
      console.log(`${socket.client.id} disconnect!!!`);
    } catch (err) {
      console.log("disconnect ERR", err.message);
      socket.emit('error', err.message)
    }
    // count -= 1
  })

  // leaveRoom
  socket.on('leaveRoom', async data => {
    try {
      data = {
        socketId: socket.client.id,
        userId: data.userId,
        roomId: data.roomId,
      }
      const dataDisconected = await socketOperations.disconnectedUser(data)
      
      // console.log('dataDisconected', dataDisconected);

      socket.to(data.roomId).emit('leaveRoom', dataDisconected)
      socket.leave(socket.handshake.auth.roomId)
      console.log(`${socket.client.id} leaveRoom!!!`);
    } catch (err) {
      // console.log("disconnect ERR", err.message);
      socket.emit('error', err.message)
    }
    count -= 1
  })

  // JoinRoom
  socket.on('joinUser', async data => {
    try {
      data.socketId = socket.client.id
      const userCurrentRoom = await socketOperations.validateUserConnectionsRoom(data)

      // save data in socket handshake for socket.on "disconect"
      socket.handshake.auth.userId = data.userId
      socket.handshake.auth.userInRoom = data.roomId

      const allUsersData = { 
        message: `${userCurrentRoom.name} success conected to Chat!!! Welcome...`,
        room: userCurrentRoom.room,
      }

      const welcomMessage = {
        message: 'Welcom in Chat!!!',
        room: userCurrentRoom.room,
      }
      
      // connected room 
      socket.join(data.roomId)
      // message all users except the owner of attachment new user
      socket.to(data.roomId).emit('joinRoom', allUsersData)
      // welcome message owner  
      socket.emit('welcomMessage', welcomMessage)
      } catch (err) {
      // console.log("connect ERR", err.message);
      socket.emit('error', err.message)
    }
  })

  // message
  socket.on('messageRoom', async data => {
    try {
      const messageData = socketOperations.sendMessageRoom(data)

      socket.to(data.roomId).emit('newMessage', messageData)
      socket.emit('newMessage', messageData)
    } catch (err) {
      console.log('ERR!!!', err.message);
      socket.emit('error', err.message)
    }
  })
})
server.listen(PORT_SOCKET, (err) => {
    if (err) {
        throw Error('Server SOCKEET not running: ', err.message)
    }
    console.log(`Server SOCKET listening on *:${PORT_SOCKET}`);
});

module.exports = io

