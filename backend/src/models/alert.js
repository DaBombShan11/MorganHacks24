const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'Kid', required: true },
    state: { type: String, enum: ['high', 'low', 'medium'], required: true },
    time: { type: Date, required: true }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;