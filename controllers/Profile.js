const User = require('../models/User')

const GetUserById = async (req, res) => {
  try {
    let user = await User.findById(req.params.user_id)
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.send({ user })
  } catch (error) {
    throw error
  }
}

const UpdateUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.user_id)

    if (!existingUser) {
      return res.status(404).send('User not found')
    }

    let updatedData = req.body

    if (req.file) {
      updatedData.image = req.file.filename
    }

    const user = await User.findByIdAndUpdate(req.params.user_id, updatedData, {
      new: true
    })

    res.send(user)
  } catch (error) {
    console.log('Error updating user:', error)
    res.status(500).send('Error updating user')
  }
}

const GetUsersById = async (req, res) => {
  try {
    let user = await User.find(req.params.user_id)
    if (!user) {
      return res.status(404).send('Users not found')
    }
    res.send({ user })
  } catch (error) {
    throw error
  }
}

const UpdateUsers = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.user_id)

    if (!existingUser) {
      return res.status(404).send('User not found')
    }

    let updatedData = req.body

    const user = await User.findByIdAndUpdate(req.params.user_id, updatedData, {
      new: true
    })

    res.send(user)
  } catch (error) {
    console.log('Error updating user:', error)
    res.status(500).send('Error updating user')
  }
}

module.exports = {
  GetUserById,
  UpdateUser,
  GetUsersById,
  UpdateUsers
}
