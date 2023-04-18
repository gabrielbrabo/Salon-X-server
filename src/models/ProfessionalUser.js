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
        cell: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false,
        },
        number: {
            type: String,
            required: false,
        },
        district: {
            type: String,
            required: false,
        },
    }
);
module.exports = mongoose.model("professionalUser", professionalUser );