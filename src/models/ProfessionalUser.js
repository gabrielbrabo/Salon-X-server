const mongoose = require("mongoose")

const professionalUser = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        ID_user: {
            type: mongoose.Types.ObjectId, 
            ref: 'user',
            required: true,
        },
        avatar: {
            type: String
        },
        stars: {
            type: String,
        },
        lat: {
            type: String,
            required: true
        },
        lng: {
            type: String,
            required: true
        },
    }
);
module.exports = mongoose.model("professionalUser", professionalUser );