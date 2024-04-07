const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const listOfSchools = require('../utils/listOfSchools');

const nurseSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: uuidv4 
    },
    username: { 
        type: String, 
        unique: true, 
        required: true 
    },
    school: { 
        type: String, 
        enum: listOfSchools, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    students: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Kid' 
    }]
});

const Nurse = mongoose.model('Nurse', nurseSchema);

module.exports = Nurse;