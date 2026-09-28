const express = require("express");

const {
    getDashboardStats,
    getRecentRegistrations,
    getRecentEvents,
    getEventRegistrationStats,
} = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();
router.use(protect);
router.use(authorize("ADMIN"));
router.get("/stats", getDashboardStats);
router.get("/recent-registrations", getRecentRegistrations);
router.get("/recent-events", getRecentEvents);
router.get("/event-registration-stats", getEventRegistrationStats);

module.exports = router;