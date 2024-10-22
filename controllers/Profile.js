const { User } = require('../models/User')

const GetUserInfo = async (req, res) => {
  try {
    let user = await User.find({ _id: req.params.user_id })
    res.send({ user })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetUserInfo
}
