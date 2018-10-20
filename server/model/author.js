const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = require('../config');

const authorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model(collection.author_collection, authorSchema);