const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const scheduleSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: uuidv4 
    },
    time: { 
        type: Date, 
        required: true 
    },
    Teacher: { 
        type: String 
    },
    className: { 
        type: String 
    },
    roomNumber: { 
        type: Number, 
        min: 100, 
        unique: true, 
        index: true, 
        required: true, 
        // default: () => Math.floor(Math.random() * 300) + 100 // this most def wont work 💀
    }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;