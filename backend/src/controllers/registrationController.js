const mongoose = require("mongoose");
const Registration = require("../models/Registration");
const User = require("../models/User");
const Event = require("../models/Event");

// Register a user for an event
const registerForEvent = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        // Check userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format"
            });
        }

        // Check eventId format
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID format"
            });
        }

        // Check the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check the event
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Check if event is cancelled
        if (event.status === "CANCELLED") {
            return res.status(400).json({
                message: "Cannot register for a cancelled event"
            });
        }

        // Check if event is ongoing or completed
        if (
            event.status === "ONGOING" ||
            event.status === "COMPLETED"
        ) {
            return res.status(400).json({
                message: "Cannot register for an ongoing or completed event"
            });
        }

        // Check registration deadline
        if (new Date() > new Date(event.registrationDeadline)) {
            return res.status(400).json({
                message: "Registration deadline has passed"
            });
        }

        // Check existing registration
        const existingRegistration = await Registration.findOne({
            userId,
            eventId
        });

        if (existingRegistration) {
            if (existingRegistration.status === "REGISTERED") {
                return res.status(400).json({
                    message: "User is already registered for this event"
                });
            }

            // If previously cancelled, register again
            existingRegistration.status = "REGISTERED";

            const updatedRegistration =
                await existingRegistration.save();

            return res.status(200).json({
                message: "Registration successful",
                registration: updatedRegistration
            });
        }

        // Check capacity
        const registeredCount = await Registration.countDocuments({
            eventId,
            status: "REGISTERED"
        });

        if (registeredCount >= event.capacity) {
            return res.status(400).json({
                message: "Event is full"
            });
        }

        // Create registration
        const registration = await Registration.create({
            userId,
            eventId
        });

        res.status(201).json({
            message: "Registration successful",
            registration
        });

    } catch (error) {
        console.error("Register event error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// CANCEL REGISTRATION
const cancelRegistration = async (req, res) => {
    try {
        const { id } = req.params;

        // Check ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid registration ID format"
            });
        }

        const registration = await Registration.findById(id);

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        if (registration.status === "CANCELLED") {
            return res.status(400).json({
                message: "Registration is already cancelled"
            });
        }

        registration.status = "CANCELLED";

        await registration.save();

        res.status(200).json({
            message: "Registration cancelled successfully",
            registration
        });

    } catch (error) {
        console.error("Cancel registration error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET USER REGISTRATIONS
const getUserRegistrations = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check ID format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format"
            });
        }

        if(req.user.id !== userId ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const registrations = await Registration.find({
            userId
        })
            .populate("eventId")
            .populate("userId", "firstName lastName email");

        res.status(200).json({
            count: registrations.length,
            registrations
        });

    } catch (error) {
        console.error("Get user registrations error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET EVENT REGISTRATIONS
const getEventRegistrations = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Check ID format
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID format"
            });
        }

        const registrations = await Registration.find({
            eventId
        })
            .populate("userId", "firstName lastName email")
            .populate("eventId", "title date venue");

        res.status(200).json({
            count: registrations.length,
            registrations
        });

    } catch (error) {
        console.error("Get event registrations error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// CHECK USER REGISTRATION
const checkRegistration = async (req, res) => {
    try {
        const { userId, eventId } = req.params;

        // Check userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format"
            });
        }

        if(req.user.id !== userId ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        // Check eventId format
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID format"
            });
        }

        const registration = await Registration.findOne({
            userId,
            eventId
        });

        if (!registration) {
            return res.status(200).json({
                registered: false
            });
        }

        res.status(200).json({
            registered: registration.status === "REGISTERED",
            registration
        });

    } catch (error) {
        console.error("Check registration error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    registerForEvent,
    cancelRegistration,
    getUserRegistrations,
    getEventRegistrations,
    checkRegistration
};