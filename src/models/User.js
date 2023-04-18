const mongoose = require("mongoose")

const userschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            },
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        professionaluser: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'professionalUser'
            }
        ],
        status: {
            type: String,
            enum: ["active", "inactive"],
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("user", userschema);