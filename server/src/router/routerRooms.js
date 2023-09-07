const express = require("express");

const { ROOMS } = require('../data/dataChat')
const routerRooms = express.Router()

const validateUser = require('../middleware/checkUserAuth')

// all list rooms
routerRooms.get('/getrooms', validateUser, (req, res) => {
  try {
    const dataRooms = ROOMS.reduce((prev, room) => {
      const newRoom = {
        id: room.id,
        nameRoom: room.nameRoom,
        owner: room.owner,
        member: room.member.length
      }
      
      return [...prev, newRoom]
    }, [])
  
      res.status(200).json({
          status: 'success',
          code: 200,
          data: {
            rooms: dataRooms,
          },
      })
  } catch (err) {
    res.status(404).json({
      status: 'success',
      code: 404,
      message: err.message,
  })
  }
})

// create room
routerRooms.post('/creatroom', validateUser, (req, res) => {
  const nameRoom = req.body.name
})

// connect room
routerRooms.post('/connectroom', validateUser, (req, res) => {
  const idRoom = req.body.id
})

module.exports = routerRooms