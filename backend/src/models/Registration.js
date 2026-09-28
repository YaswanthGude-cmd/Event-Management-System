const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },

        status: {
            type: String,
            enum: ["REGISTERED", "CANCELLED"],
            default: "REGISTERED"
        }
    },
    {
        timestamps: true
    }
);

// One user can register for an event only once
registrationSchema.index(
    { userId: 1, eventId: 1 },
    { unique: true }
);

module.exports = mongoose.model("Registration", registrationSchema);