const mongoose = require("mongoose");
const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

//GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

        res.status(200).json({
            count: users.length,
            users
        });
    } catch (error) {
        console.error("Get all users error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

//  GET USER BY ID
const getUserById = async (req, res) => {
    try {
        const {userId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format"
            });
        }
        console.log("Requested userId:", userId);

        const user = await User.findById(userId).select("-password");

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json(user);
    }catch (error) {
        console.error("Get user by ID error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// UPDATE USER
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, phone } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format"
            });
        }

        if (!firstName || !lastName || !phone) {
            return res.status(400).json({
                message: "First name, last name and phone are required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.phone = phone;

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                status: user.status
            }
        });

    } catch (error) {
        console.error("Update user error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// BLOCK USER
const blockUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.status === "BLOCKED") {
            return res.status(400).json({
                message: "User is already blocked"
            });
        }

        user.status = "BLOCKED";

        await user.save();

        res.status(200).json({
            message: "User blocked successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });

    } catch (error) {
        console.error("Block user error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// UNBLOCK USER
const unblockUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.status === "ACTIVE") {
            return res.status(400).json({
                message: "User is already active"
            });
        }

        user.status = "ACTIVE";

        await user.save();

        res.status(200).json({
            message: "User unblocked successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });

    } catch (error) {
        console.error("Unblock user error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

//GET ALL EVENTS
const getAllEvents = async (req , res) => {
    try {
        const events = await Event.find()
        .populate("organizerId", "firstName lastName email")
        .sort({ createdAt: -1 });
        
        const eventsWithRegistrationCount = await Promise.all(
            events.map(async (event) => {
                const registrationCount = await Registration.countDocuments({
                    eventId: event._id,
                    status: "REGISTERED"
                });
                return {
                    ...event.toObject(),
                    registrations: registrationCount
                };
            })
        );

        res.status(200).json({
            count: eventsWithRegistrationCount.length,
            events: eventsWithRegistrationCount
        });
    }catch (error) {
        console.error("Get all events error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

//GET EVENT BY ID
const getAdminEvent = async(req, res) => {
    try {
        const { eventId } = req.params;

        if(!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID format"
            });
        }

        const event = await Event.findById(eventId)
        .populate("organizerId", "firstName lastName email");

        if(!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error("Get event by ID error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// UPDATE EVENT BY ADMIN
const updateAdminEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Validate event ID
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID format"
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const {
            title,
            description,
            category,
            date,
            time,
            venue,
            capacity,
            registrationDeadline,
            status
        } = req.body;

        // Title
        if (title !== undefined) {
            if (title.trim() === "") {
                return res.status(400).json({
                    message: "Title cannot be empty"
                });
            }

            event.title = title.trim();
        }

        // Description
        if (description !== undefined) {
            if (description.trim() === "") {
                return res.status(400).json({
                    message: "Description cannot be empty"
                });
            }

            event.description = description.trim();
        }

        // Category
        if (category !== undefined) {
            if (category.trim() === "") {
                return res.status(400).json({
                    message: "Category cannot be empty"
                });
            }

            event.category = category.trim();
        }

        // Date
        if (date !== undefined) {
            const eventDate = new Date(date);

            if (isNaN(eventDate.getTime())) {
                return res.status(400).json({
                    message: "Invalid event date"
                });
            }

            event.date = eventDate;
        }

        // Time
        if (time !== undefined) {
            if (time.trim() === "") {
                return res.status(400).json({
                    message: "Time cannot be empty"
                });
            }

            event.time = time.trim();
        }

        // Venue
        if (venue !== undefined) {
            if (venue.trim() === "") {
                return res.status(400).json({
                    message: "Venue cannot be empty"
                });
            }

            event.venue = venue.trim();
        }

        // Capacity
        if (capacity !== undefined) {
            if (capacity <= 0) {
                return res.status(400).json({
                    message: "Capacity must be greater than 0"
                });
            }

            event.capacity = capacity;
        }

        // Registration deadline
        if (registrationDeadline !== undefined) {
            const deadline = new Date(registrationDeadline);

            if (isNaN(deadline.getTime())) {
                return res.status(400).json({
                    message: "Invalid registration deadline"
                });
            }

            event.registrationDeadline = deadline;
        }

        // Status
        if (status !== undefined) {
            event.status = status;
        }

        // Final date validation
        if (event.registrationDeadline > event.date) {
            return res.status(400).json({
                message: "Registration deadline cannot be after event date"
            });
        }

        const updatedEvent = await event.save();

        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent
        });

    } catch (error) {
        console.error("Update admin event error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// CANCEL EVENT
const cancelAdminEvent = async (req, res) => {
    try{
        const { eventId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID format"
            });
        }

        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        if(event.status === "CANCELLED") {
            return res.status(400).json({
                message: "Event is already cancelled"
            });
        }
        event.status = "CANCELLED";
        await event.save();

        res.status(200).json({
            message: "Event cancelled successfully",
            event
        });
    } catch (error) {
        console.error("Cancel event error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// DELETE EVENT
const deleteAdminEvent = async (req , res) => {
    try{
        const { eventId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID format"
            });
        }

        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const registrations = await Registration.countDocuments({ eventId: eventId });
        if(registrations > 0) {
            return res.status(400).json({
                message: "Cannot delete event because of existing registrations"
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            message: "Event deleted successfully"
        });
    } catch(error) {
        console.error("Delete admin event error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// GET ALL REGISTRAIONS
const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find()
        .populate("userId", "firstName lastName email phone")
        .populate("eventId", "title category date time venue")
        .sort({ createdAt: -1 });
        res.status(200).json({
            count: registrations.length,
            registrations
        });
    } catch (error) {
        console.error("Get all registrations error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

//GET REGISTRATIONS BY EVENT
const getRegistrationsByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID format"
            });
        }

        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const registrations = await Registration.find({ eventId: eventId })
        .populate("userId", "firstName lastName email phone")
        .populate("eventId", "title category date time venue")
        .sort({ createdAt: -1 });

        res.status(200).json({
            event: {
                id: event._id,
                title: event.title
            },
            count : registrations.length,
            registrations
        });
    }catch (error) {
        console.error("Get registrations by event error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// GET REGISTRATIONS BY ID   
const getRegistrationById = async (req, res) => {
    try {
        const { registrationId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(registrationId)) {
            return res.status(400).json({
                message: "Invalid registration ID format"
            });
        }

        const registration = await Registration.findById(registrationId)
        .populate("userId", "firstName lastName email phone")
        .populate("eventId", "title category date time venue");

        if(!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }
        res.status(200).json(registration);
    }catch (error) {
        console.error("Get registration by ID error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// CANCEL REGISTRATION BY ADMIN
const cancelAdminRegistration = async (req, res) => {
    try {
        const { registrationId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(registrationId)) {
            return res.status(400).json({
                message: "Invalid registration ID format"
            });
        }

        const registration = await Registration.findById(registrationId);
        if(!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }
        if(registration.status === "CANCELLED") {
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
        console.error("Cancel admin registration error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// GET ALL ORGANIZERS
const getAllOrganizers = async (req, res) => {
    try {
        const organizers = await User.find({
            role: "ORGANIZER"
        })
        .select("-password")
        .sort({ createdAt: -1 });

        const organizersWithEventCount = await Promise.all(
            organizers.map(async (organizer) => {
                const eventCount = await Event.countDocuments({
                    organizerId: organizer._id
                });

                return {
                    ...organizer.toObject(),
                    events: eventCount
                };
            })
        );

        res.status(200).json({
            count: organizersWithEventCount.length,
            organizers: organizersWithEventCount
        });

    } catch (error) {
        console.error("Get all organizers error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET ORGANIZER BY ID
const getOrganizerById = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid organizer ID format"
            });
        }

        const organizer = await User.findOne({
            _id: userId,
            role: "ORGANIZER"
        }).select("-password");

        if (!organizer) {
            return res.status(404).json({
                message: "Organizer not found"
            });
        }

        const eventCount = await Event.countDocuments({
            organizerId: organizer._id
        });

        res.status(200).json({
            organizer: {
                ...organizer.toObject(),
                events: eventCount
            }
        });

    } catch (error) {
        console.error("Get organizer by ID error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    blockUser,
    unblockUser,
    getAllEvents,
    getAdminEvent,
    updateAdminEvent,
    cancelAdminEvent,
    deleteAdminEvent,
    getAllRegistrations,
    getRegistrationsByEvent,
    getRegistrationById,
    getAllOrganizers,
    getOrganizerById,
    cancelAdminRegistration,
    updateUser
};
