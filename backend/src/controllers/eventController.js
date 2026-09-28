const mongoose = require("mongoose");
const Event = require("../models/Event");

// CREATE EVENT
const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            date,
            time,
            venue,
            capacity,
            registrationDeadline,
            organizerId
        } = req.body;

        // Check required fields
        if (
            !title ||
            !description ||
            !category ||
            !date ||
            !time ||
            !venue ||
            capacity === undefined ||
            !registrationDeadline ||
            !organizerId
        ) {
            return res.status(400).json({
                message: "All event fields are required"
            });
        }

        // Check empty strings
        if (
            title.trim() === "" ||
            description.trim() === "" ||
            category.trim() === "" ||
            time.trim() === "" ||
            venue.trim() === ""
        ) {
            return res.status(400).json({
                message: "Event fields cannot be empty"
            });
        }

        // Check capacity
        if (capacity <= 0) {
            return res.status(400).json({
                message: "Capacity must be greater than 0"
            });
        }

        // Check dates
        const eventDate = new Date(date);
        const deadline = new Date(registrationDeadline);

        if (isNaN(eventDate.getTime()) || isNaN(deadline.getTime())) {
            return res.status(400).json({
                message: "Invalid date or registration deadline"
            });
        }

        if (deadline > eventDate) {
            return res.status(400).json({
                message: "Registration deadline cannot be after event date"
            });
        }

        const event = await Event.create({
            title: title.trim(),
            description: description.trim(),
            category: category.trim(),
            date: eventDate,
            time: time.trim(),
            venue: venue.trim(),
            capacity,
            registrationDeadline: deadline,
            organizerId
        });

        res.status(201).json({
            message: "Event created successfully",
            event
        });

    } catch (error) {
        console.error("Create event error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET ALL EVENTS
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("organizerId", "firstName lastName email");

        res.status(200).json({
            count: events.length,
            events
        });

    } catch (error) {
        console.error("Get events error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET EVENT BY ID
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid event ID format"
            });
        }
        const event = await Event.findById(req.params.id)
            .populate("organizerId", "firstName lastName email");

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(event);

    } catch (error) {
        console.error("Get event error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// UPDATE EVENT
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid event ID format"
            });
        }
        const event = await Event.findById(req.params.id);

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

        if (title !== undefined) {
            if (title.trim() === "") {
                return res.status(400).json({
                    message: "Title cannot be empty"
                });
            }
            event.title = title.trim();
        }

        if (description !== undefined) {
            if (description.trim() === "") {
                return res.status(400).json({
                    message: "Description cannot be empty"
                });
            }
            event.description = description.trim();
        }

        if (category !== undefined) {
            if (category.trim() === "") {
                return res.status(400).json({
                    message: "Category cannot be empty"
                });
            }
            event.category = category.trim();
        }

        if (date !== undefined) {
            const eventDate = new Date(date);

            if (isNaN(eventDate.getTime())) {
                return res.status(400).json({
                    message: "Invalid event date"
                });
            }

            event.date = eventDate;
        }

        if (time !== undefined) {
            if (time.trim() === "") {
                return res.status(400).json({
                    message: "Time cannot be empty"
                });
            }
            event.time = time.trim();
        }

        if (venue !== undefined) {
            if (venue.trim() === "") {
                return res.status(400).json({
                    message: "Venue cannot be empty"
                });
            }
            event.venue = venue.trim();
        }

        if (capacity !== undefined) {
            if (capacity <= 0) {
                return res.status(400).json({
                    message: "Capacity must be greater than 0"
                });
            }
            event.capacity = capacity;
        }

        if (registrationDeadline !== undefined) {
            const deadline = new Date(registrationDeadline);

            if (isNaN(deadline.getTime())) {
                return res.status(400).json({
                    message: "Invalid registration deadline"
                });
            }

            event.registrationDeadline = deadline;
        }

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
        console.error("Update event error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// DELETE EVENT
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid event ID format"
            });
        }
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Event deleted successfully"
        });

    } catch (error) {
        console.error("Delete event error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};