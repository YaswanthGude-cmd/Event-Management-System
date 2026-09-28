const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        role: {
            type: String,
            enum: ["USER", "ORGANIZER", "ADMIN"],
            default: "USER"
        },

        status: {
            type: String,
            enum: ["ACTIVE", "BLOCKED"],
            default: "ACTIVE"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);