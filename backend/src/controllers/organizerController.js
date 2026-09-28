const mongoose = require("mongoose");
const Events = require("../models/Event");
const User = require("../models/User");
const Registration = require("../models/Registration");

// GET ORGANIZER EVENTS
const getOrganizerEvents = async (req, res) => {
  try {
    const { organizerId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(organizerId)) {
      return res.status(400).json({
        message: "Invalid organizer ID format",
      });
    }
    if (req.user.role !== "ADMIN" && req.user.id !== organizerId) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // Check organizer
    const organizer = await User.findById(organizerId);

    if (!organizer) {
      return res.status(404).json({
        message: "Organizer not found",
      });
    }

    if (organizer.role !== "ORGANIZER") {
      return res.status(400).json({
        message: "User is not an organizer",
      });
    }

    const events = await Events.find({
      organizerId: organizer._id,
    }).populate("organizerId", "firstName lastName email");

    res.status(200).json({
      count: events.length,
      events,
    });
  } catch (error) {
    console.error("Get organizer events error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET ONE ORGANIZER EVENT
const getOrganizerEvent = async (req, res) => {
  try {
    const { organizerId, eventId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(organizerId)) {
      return res.status(400).json({
        message: "Invalid organizer ID format",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        message: "Invalid event ID format",
      });
    }

    if (req.user.role !== "ADMIN" && req.user.id !== organizerId) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    // Check organizer
    const organizer = await User.findById(organizerId);

    if (!organizer) {
      return res.status(404).json({
        message: "Organizer not found",
      });
    }

    if (organizer.role !== "ORGANIZER") {
      return res.status(400).json({
        message: "User is not an organizer",
      });
    }

    // Find event belonging to this organizer
    const event = await Events.findOne({
      _id: eventId,
      organizerId: organizer._id,
    }).populate("organizerId", "firstName lastName email");

    if (!event) {
      return res.status(404).json({
        message: "Event not found for this organizer",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Get organizer event error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// UPDATE ORGANIZER EVENT
const updateOrganizerEvent = async (req, res) => {
  try {
    const { organizerId, eventId } = req.params;

    // Validate organizer ID
    if (!mongoose.Types.ObjectId.isValid(organizerId)) {
      return res.status(400).json({
        message: "Invalid organizer ID format",
      });
    }

    if (req.user.role !== "ADMIN" && req.user.id !== organizerId) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // Validate event ID
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        message: "Invalid event ID format",
      });
    }

    // Find event belonging to this organizer
    const event = await Events.findOne({
      _id: eventId,
      organizerId: organizerId,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found for this organizer",
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
    } = req.body;

    // Title
    if (title !== undefined) {
      if (title.trim() === "") {
        return res.status(400).json({
          message: "Title cannot be empty",
        });
      }

      event.title = title.trim();
    }

    // Description
    if (description !== undefined) {
      if (description.trim() === "") {
        return res.status(400).json({
          message: "Description cannot be empty",
        });
      }

      event.description = description.trim();
    }

    // Category
    if (category !== undefined) {
      if (category.trim() === "") {
        return res.status(400).json({
          message: "Category cannot be empty",
        });
      }

      event.category = category.trim();
    }

    // Date
    if (date !== undefined) {
      const eventDate = new Date(date);

      if (isNaN(eventDate.getTime())) {
        return res.status(400).json({
          message: "Invalid event date",
        });
      }

      event.date = eventDate;
    }

    // Time
    if (time !== undefined) {
      if (time.trim() === "") {
        return res.status(400).json({
          message: "Time cannot be empty",
        });
      }

      event.time = time.trim();
    }

    // Venue
    if (venue !== undefined) {
      if (venue.trim() === "") {
        return res.status(400).json({
          message: "Venue cannot be empty",
        });
      }

      event.venue = venue.trim();
    }

    // Capacity
    if (capacity !== undefined) {
      if (capacity <= 0) {
        return res.status(400).json({
          message: "Capacity must be greater than 0",
        });
      }

      event.capacity = capacity;
    }

    // Registration deadline
    if (registrationDeadline !== undefined) {
      const deadline = new Date(registrationDeadline);

      if (isNaN(deadline.getTime())) {
        return res.status(400).json({
          message: "Invalid registration deadline",
        });
      }

      event.registrationDeadline = deadline;
    }

    // Final date validation
    if (event.registrationDeadline > event.date) {
      return res.status(400).json({
        message: "Registration deadline cannot be after event date",
      });
    }

    const updatedEvent = await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Update organizer event error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// CANCEL ORGANIZER EVENT
const cancelOrganizerEvent = async (req, res) => {
  try {
    const { organizerId, eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(organizerId)) {
      return res.status(400).json({
        message: "Invalid organizer ID format",
      });
    }
    if (req.user.role !== "ADMIN" && req.user.id !== organizerId) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        message: "Invalid event ID format",
      });
    }

    const event = await Events.findOne({
      _id: eventId,
      organizerId: organizerId,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found for this organizer",
      });
    }

    if (event.status === "CANCELLED") {
      return res.status(400).json({
        message: "Event is already cancelled",
      });
    }

    if (event.status === "COMPLETED") {
      return res.status(400).json({
        message: "Completed events cannot be cancelled",
      });
    }

    event.status = "CANCELLED";

    await event.save();

    res.status(200).json({
      message: "Event cancelled successfully",
      event,
    });
  } catch (error) {
    console.error("Cancel organizer event error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET PARTICIPANTS OF ORGANIZER EVENT
const getEventParticipants = async (req, res) => {
  try {
    const { organizerId, eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(organizerId)) {
      return res.status(400).json({
        message: "Invalid organizer ID format",
      });
    }
    if (req.user.role !== "ADMIN" && req.user.id !== organizerId) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        message: "Invalid event ID format",
      });
    }

    const event = await Events.findOne({
      _id: eventId,
      organizerId: organizerId,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found for this organizer",
      });
    }

    const registrations = await Registration.find({
      eventId: eventId,
      status: "REGISTERED",
    }).populate("userId", "firstName lastName email phone");

    res.status(200).json({
      event: {
        id: event._id,
        title: event.title,
      },
      count: registrations.length,
      participants: registrations,
    });
  } catch (error) {
    console.error("Get participants of organizer event error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAllOrganizerEvents = async (req, res) => {
    try {

        const events = await Events.find()
            .populate(
                "organizerId",
                "firstName lastName email"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: events.length,
            events
        });

    } catch (error) {

        console.error(
            "Get all organizer events error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
  getOrganizerEvents,
  getOrganizerEvent,
  updateOrganizerEvent,
  cancelOrganizerEvent,
  getEventParticipants,
  getAllOrganizerEvents
};
