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

const { USERS, ROOMS } = require('./data/dataChat')

let count = 1 

io.on('connection', (socket) => {
  console.log('connected', count, '-', socket.client.id);
  count += 1
  socket.handshake.auth.userInRoom = []
  // disconected
  socket.on('disconnect', async () => {
    try {
      data = {
        socketId: socket.client.id,
        userId: socket.handshake.auth.userId,
        roomId: socket.handshake.auth.userInRoom,
      }
      const dataDisconected = await socketOperations.disconnectedUser(data)
      
      // console.log('dataDisconected', dataDisconected);

      socket.leave(socket.handshake.auth.roomId)
      socket.to(data.roomId).emit('leaveRoom', dataDisconected)
      console.log(`${socket.client.id} disconnect!!!`);
    } catch (err) {
      console.log("disconnect ERR", err.message);
      socket.emit('error', err.message)
    }
    count -= 1
  })

  // JoinRoom
  socket.on('joinUser', async data => {
    try {
      data.socketId = socket.client.id
      const userCurrentRoom = await socketOperations.validateUserConnectionsRoom(data)

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

      socket.join(data.roomId)
      socket.to(data.roomId).emit('joinRoom', allUsersData)
      socket.emit('welcomMessage', welcomMessage)
      } catch (err) {
      console.log("connect ERR", err.message);
      socket.emit('error', err.message)
    }
  })

  // socket.on('message', (message) => {
  //   console.log('message', message);
  //   io.emit('message', 'Hi-----')
  // })
//   // disconnected user to socket
//   socket.on('disconnectUser', async (data) => {
    // try {
    //   data.socketId = socket.client.id 
    //   const dataDisconected = await socketOperations.disconnectedUser(data)
      
    //   console.log(`${socket.client.id} disconnect!!!`);
    //   io.emit('disconnectRoom', dataDisconected.message)
    // } catch (err) {
    //   console.log(err.message);
    //   socket.emit('error', err.message)
    // }
    // count -= 1
//   })

//   // connected user to socket
//   socket.emit('connected', 'User conected!!!')

//   socket.on('connectedRoom', async (data) => {
  //   try {
  //     data.socketId = socket.client.id
  //     const userCurrentRoom = await socketOperations.validateUserConnectionsRoom(data)

  //     io.emit('connectedRoom', userCurrentRoom)
  //     console.log('User connected ROOM.');
  //   } catch (err) {
  //     socket.emit('error', err.message)
  //   }
  // })

  // socket.on('message', (message) => {
  //   console.log('message', message);
  //   io.emit('message', 'Hi-----')
  // })
});

server.listen(PORT_SOCKET, (err) => {
    if (err) {
        throw Error('Server SOCKEET not running: ', err.message)
    }
    console.log(`Server SOCKET listening on *:${PORT_SOCKET}`);
});

module.exports = io
