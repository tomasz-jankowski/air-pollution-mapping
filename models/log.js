// Schema for logging (test)

const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    headers: Object,
    body: Object,
    dateReceived: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Log", logSchema);