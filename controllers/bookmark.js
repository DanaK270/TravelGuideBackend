const { Bookmark } = require('../models/Bookmark')

const getBookmark = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.params.user_id })
      .populate('hotel')
      .populate('place')

    res.send(bookmarks)
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    res.status(500).send('Error fetching bookmarks')
  }
}

// const GetBookmarkById = async (req, res) => {
//   try {
//     const bookmark = await Bookmark.findById(req.params.bookmark_id)
//       .populate('hotel')
//       .populate('place')

//     if (!bookmark) {
//       return res.status(404).send('Bookmark not found')
//     }
//     res.send(bookmark)
//   } catch (error) {
//     throw error
//   }
// }

const createBookmarkPost = async (req, res) => {
  console.log(' CREATE: ', req.body)
  try {
    let bookmarkData = {
      ...req.body
    }
    let bookmark = new Bookmark(bookmarkData)
    bookmark.save()
    res.send(bookmark)
  } catch (error) {
    throw error
  }
}

const deleteBookmark = async (req, res) => {
  try {
    await Bookmark.deleteOne({ _id: req.params.bookmark_id })
    res.send({
      msg: 'Bookmark Deleted',
      payload: req.params.bookmark_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  getBookmark,
  createBookmarkPost,
  deleteBookmark
}
