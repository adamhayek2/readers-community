const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book_name: { type: String, required: true },
  author: { type: String, required: true },
  picture: { type: String, required: true },
  review: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;