const express = require("express");

const { signUpUser, loginUser} = require('../helpers/valadeteUserName')
const { USERS, ROOMS } = require('../data/dataChat')
const routerAuth = express.Router()

// create NEW User
routerAuth.post('/signup', (req, res) => {
  try {
    const data = signUpUser(req.body)

    res.status(201).json({
      status: 'created',
      code: 201,
      message: "User created!",
      data: {
        id: data.id,
        name: data.name,
        online: data.online,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      code: 400,
      data: {
        message: err.message,
      },
    })
  }  
})

// login User
routerAuth.post('/login', (req, res) => {
  try {
    const data = loginUser(req.body)
    
    res.status(200).json({
      status: 'success',
      code: 200,
      message: "User login.",
      data: {
        id: data.id,
        name: data.name,
        online: data.online,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'error',
      code: 404,
      data: {
        message: err.message,
      },
    })
  }
})

// current USER
routerAuth.get('/current', (req, res) => {
  const authData = req.headers['authorization'];

  if (!authData) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Invalid request'
    })
  }

  const userIndex = USERS.findIndex(usr => usr.id === authData)

  if (userIndex === -1 || !USERS[userIndex].online) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not autorized'
    })
  }

  const user = USERS[userIndex]
  
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Current user',
    data: {
      id: user.id,
      name: user.name,
      online: user.online,
    }
  })
})

// logout USER
routerAuth.get('/logout', (req, res) => {
  const authData = req.headers['authorization'];

  if (!authData) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Invalid request'
    })
  }

  const userIndex = USERS.findIndex(usr => usr.id === authData)

  USERS[userIndex].online = false

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Logout',
  })
})

module.exports = routerAuth