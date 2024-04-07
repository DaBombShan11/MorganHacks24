const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const scheduleSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    time: { type: Date, required: true },
    Teacher: { type: String },
    className: { type: String }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;