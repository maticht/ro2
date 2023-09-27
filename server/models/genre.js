const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: { type: String, required: false },
    numberOfRS: {type: Number, default: 0, required: false}
}, {toJSON: {virtuals: true}});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = {Genre};