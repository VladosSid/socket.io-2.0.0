const { v4: uuidv4 } = require('uuid');

const { USERS } = require('../data/dataChat')

const signUpUser = (reqData) => {
  const { name, password } = reqData

  const checkUserName = USERS.find(user => user.name === name)

  if (checkUserName) {
    throw Error( "The name is already taken! Choose a different Name")
  }
  
  const newUser = {id: uuidv4(), name, password, online: true}

  USERS.push(newUser)
  return newUser
}

const loginUser = (reqData) => {
  const { name, password } = reqData

  const checkUser = USERS.find(user => user.name === name)
  if (!checkUser) {
    throw Error( "User undefined!")
  }

  if (checkUser.password !== password) {
    throw Error( "Password invalid!")
  }

  const findUserIndex = USERS.findIndex(user => user.name === name)
  USERS[findUserIndex].online = true

  return USERS[findUserIndex]
}

module.exports = {
  signUpUser, 
  loginUser
}