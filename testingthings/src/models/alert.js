const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    name: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Kid', 
        required: true 
    },
    diebeticState: { 
        type: String, 
        enum: ['Really High', 'High', 'Medium', 'Low', 'Really Low'], 
        required: true 
    },
    time: { 
        type: Date, 
        required: true 
    }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;