const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const kidSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    schedule: { type: mongoose.Schema.Types.Mixed }, // You can define a more specific schema for 'schedule'
    age: { type: Number, min: 5, max: 17, required: true }
});

const Kid = mongoose.model('Kid', kidSchema);

module.exports = Kid;
