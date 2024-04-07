const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const listOfSchools = require('../utils/listOfSchools');

const kidSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: uuidv4 
    },
    name: { 
        type: String, 
        required: true 
    },
    schedule: { 
        type: mongoose.Schema.Types.Mixed 
    },
    age: { 
        type: Number, 
        min: 5, 
        max: 17, 
        required: true 
    },
    emergancyContact: { 
        type: String, 
        required: true 
    },
    school: { 
        type: String, 
        enum: listOfSchools, 
    },
});

const Kid = mongoose.model('Kid', kidSchema);

module.exports = Kid;
