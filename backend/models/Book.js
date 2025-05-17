const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  coverImage: String,
  availability: Boolean
});

module.exports = mongoose.model('Book', BookSchema);
