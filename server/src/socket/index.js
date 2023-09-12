const { v4: uuidv4 } = require('uuid');

const {USERS, ROOMS} = require('../data/dataChat')

const validateUserConnectionsRoom = (data) => {
  const { userId, roomId, socketId } = data

  if (!userId || !roomId) throw new Error('Bad request')
  
  // check user auth 
  const userIndex = USERS.findIndex(usr => usr.id === userId)
  if (userIndex === -1 || !USERS[userIndex].online) throw new Error('Not autorized!!!')
  const user = USERS[userIndex]

  //find room
  const indexRoom = ROOMS.findIndex(room => room.id === roomId) 
  if (indexRoom === -1) throw new Error('Room not found! Choose another room or create new room.')

  if(ROOMS[indexRoom].member.find(memb => memb.id === user.id)) throw new Error('User connected!!!')

  USERS[userIndex].socketId = socketId

  ROOMS[indexRoom].member.push({
    id: user.id,
    name: user.name,
  })

  // console.log('ROOMS in validateUserConnectionsRoom', ROOMS);

  const room = ROOMS[indexRoom]

  dataRes = {
    room,
    name: user.name,
  }
  return dataRes
}

// disconnected User
const disconnectedUser = (data) => {
  const { userId, roomId, socketId } = data

  if (!userId || !roomId) throw new Error('Bad request')
  
  // check user auth 
  const userIndex = USERS.findIndex(usr => usr.id === userId)
  if (userIndex === -1 || !USERS[userIndex].online) throw new Error('Not autorized!!!')
  const user = USERS[userIndex]

  USERS[userIndex].socketId = null

  //find room
  const indexRoom = ROOMS.findIndex(room => room.id === roomId) 
  if (indexRoom === -1) throw new Error('Room not found! Choose another room or create new room.')

  ROOMS[indexRoom].member = ROOMS[indexRoom].member.filter(memb => memb.id !== user.id)
  // console.log('ROOMS in disconnectedUser', ROOMS);
  // console.log('ROOMS[indexRoom].member', ROOMS[indexRoom].member.filter(memb => memb.id !== user.id));
  const room = ROOMS[indexRoom]

  dataRes = {
    message: `${user.name} disconnected Chat.`,
    room,
  }
  return dataRes
}

const sendMessageRoom = data => {
  const { userId, roomId, message } = data
  
  if (!userId || !roomId || !message) throw new Error('Bad request')

  // check user auth 
  const userIndex = USERS.findIndex(usr => usr.id === userId)
  if (userIndex === -1 || !USERS[userIndex].online) throw new Error('Not autorized!!!')
  const userName = USERS[userIndex].name

  //find room
  const indexRoom = ROOMS.findIndex(room => room.id === roomId) 
  if (indexRoom === -1) throw new Error('Room not found! Choose another room or create new room.')
  
  const messsageData = {
    id: uuidv4(),
    ownerId: userId,
    owner: userName,
    message,
  }

  ROOMS[indexRoom].messages.push(messsageData)

  return messsageData
}

const socketOperations = {
  validateUserConnectionsRoom,
  disconnectedUser,
  sendMessageRoom,
}
module.exports = socketOperations