const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soundSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    url: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true, enum: [
        "Boom",
        "Clap",
        "HiHat-Open",
        "HiHat-Closed",
        "Kick",
        "Ride",
        "Snare",
        "Tink",
        "Tom-High",
        "Tom-Low",
        "Tom-Mid",
    ] }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Sound', soundSchema);