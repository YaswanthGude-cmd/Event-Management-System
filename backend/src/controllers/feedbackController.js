const User = require("../models/User");
const Event = require("../models/Event");
const Feedback = require("../models/Feedback");

// SUBMIT A FEEDBACK
const createFeedback = async (req, res) => {
    try {
        const { userId, eventId, rating, comment } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const existingFeedback = await Feedback.findOne({ userId, eventId });
        if (existingFeedback) {
            return res.status(400).json({ message: "Feedback already submitted for this event by the user" });
        }

        const feedback = await Feedback.create({
            userId,
            eventId,
            rating,
            comment
        });
        res.status(201).json({
            message: "Feedback submitted successfully",
            feedback
        }); 
    } catch (error) {
        console.error("Create feedback error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// TO GET A USER'S FEEDBACK
const getUserFeedback = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const feedback = await Feedback.find({ userId })
        .populate("eventId", "title category date time venue")
        .sort({ createdAt: -1 });
        res.status(200).json({
            count: feedback.length,
            feedback
        });
    } catch (error) {
        console.error("Get user feedback error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// TO GET A EVENT'S FEEDBACK
const getEventFeedback = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const feedback = await Feedback.find({ eventId: eventId }).
        populate("userId", "firstName lastName email").
        populate("eventId", "title category date time venue").
        sort({ createdAt: -1 });

        res.status(200).json({
            event: {
                id: event._id,
                title: event.title,
            },
            count: feedback.length,
            feedback
        });
    } catch (error) {
        console.error("Get event feedback error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// TO UPADATE A FEEDBACK 
const updateFeedback = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const {
            rating, 
            comment
        } = req.body;

        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        if(feedback.userId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        if(rating !== undefined) feedback.rating = rating;
        if(comment !== undefined) feedback.comment = comment;

        await feedback.save();
        res.status(200).json({
            message: "Feedback updated successfully",
            feedback
        });
    } catch (error) {
        console.error("Update feedback error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// DELETE A FEEDBACK
const deleteFeedback = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        if(feedback.userId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }
        await Feedback.findByIdAndDelete(feedbackId);
        res.status(200).json({
            message: "Feedback deleted successfully"
        });
    } catch (error) {
        console.error("Delete feedback error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createFeedback,
    getUserFeedback,
    getEventFeedback,
    updateFeedback,
    deleteFeedback
};