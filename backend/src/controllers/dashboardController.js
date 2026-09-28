const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

// GET DASHBOARD STATS DATA 
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const totalOrganizers = await User.countDocuments({ role: "ORGANIZER" });

        const totalAdmins = await User.countDocuments({ role: "ADMIN" });

        const activeUsers = await User.countDocuments({ status: "ACTIVE" });

        const blockedUsers = await User.countDocuments({ status: "BLOCKED" });

        const totalEvents = await Event.countDocuments();

        const upcomingEvents = await Event.countDocuments({ status: "UPCOMING" });

        const ongoingEvents = await Event.countDocuments({ status: "ONGOING" });

        const completedEvents = await Event.countDocuments({ status: "COMPLETED" });

        const cancelledEvents = await Event.countDocuments({ status: "CANCELLED" });

        const totalRegistrations = await Registration.countDocuments();

        const activeRegistrations = await Registration.countDocuments({ status: "REGISTERED" });

        const cancelledRegistrations = await Registration.countDocuments({ status: "CANCELLED" });

        res.status(200).json({
            users : {
                total: totalUsers,
                organizers: totalOrganizers,
                admins: totalAdmins,
                active: activeUsers,
                blocked: blockedUsers
            },
            events : {
                total: totalEvents,
                upcoming: upcomingEvents,
                ongoing: ongoingEvents,
                completed: completedEvents,
                cancelled: cancelledEvents
            },
            registrations : {
                total: totalRegistrations,
                active: activeRegistrations,
                cancelled: cancelledRegistrations
            }
        });
    } catch (error) {
        console.error("Get dashboard stats error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// GET RECENT REGISTRATIONS
const getRecentRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find()
        .populate("userId", "firstName lastName email")
        .populate("eventId", "title date time venue")
        .sort({ createdAt: -1 })
        .limit(5);

        res.status(200).json({
            count: registrations.length,
            registrations
        });
    } catch (error) {
        console.error("Get recent registrations error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// GET RECENT EVENTS
const getRecentEvents = async (req, res) => {
    try {
        const events = await Event.find()
        .populate("organizerId", "firstName lastName email")
        .sort({ createdAt: -1 })
        .limit(5);

        res.status(200).json({
            count: events.length,
            events
        });
    } catch (error) {
        console.error("Get recent events error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// GET EVENT REGISTRATIONS STATS
const getEventRegistrationStats = async (req, res) => {
    try {
        const events = await Event.find()
        .select("title status capacity");

        const stats = await Promise.all(events.map(async (event) => {
            const registrationsCount = await Registration.countDocuments({ 
                eventId: event._id, status: "REGISTERED" 
            });

            return {
                eventId: event._id,
                title: event.title,
                status: event.status,
                capacity: event.capacity,
                registrations: registrationsCount
            };
        })
        );
        res.status(200).json({
            count: stats.length,
            events: stats
        });
    }catch (error) {
        console.error("Get event registration stats error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getDashboardStats,
    getRecentRegistrations,
    getRecentEvents,
    getEventRegistrationStats
};