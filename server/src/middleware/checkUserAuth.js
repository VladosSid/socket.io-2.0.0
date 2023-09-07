const { USERS } = require('../data/dataChat')

const validateUser = (req, res, next) => {
  const authData = req.headers['authorization'];

  if (!authData) {
    throw new Error('Not autorized')
  }

  const userIndex = USERS.findIndex(usr => usr.id === authData)

  if (userIndex === -1 || !USERS[userIndex].online) {
    throw new Error('Not autorized')
  }

  next()
}

module.exports = validateUser