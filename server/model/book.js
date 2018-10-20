const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = require("../config");

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
});

module.exports = mongoose.model(collection.book_collection, bookSchema);