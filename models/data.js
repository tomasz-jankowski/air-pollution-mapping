// Schema for data

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    gps: {
        lat: String,
        lng: String
    },
    date: Date,
    pm1: Number,
    pm25: Number,
    pm4: Number,
    pm10: Number,
    so2: Number,
    hcho: Number,
    dateReceived: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Data", dataSchema);