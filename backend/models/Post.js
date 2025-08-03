const mongoose = require('mongoose');
const User = require('./User'); // Import User model

const postSchema = new mongoose.Schema({
  title:{
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 🔗 connects to User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
