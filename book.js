const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    name: String
  });
  const Bookmodel = mongoose.model('Books', bookSchema);

  module.exports = Bookmodel;