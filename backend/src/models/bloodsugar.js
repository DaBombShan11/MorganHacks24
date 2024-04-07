const mongoose = require('mongoose');

const bloodsugarSchema = new mongoose.Schema({
    bloodLvl: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Kid', required: true }
});

const Bloodsugar = mongoose.model('Bloodsugar', bloodsugarSchema);

module.exports = Bloodsugar;