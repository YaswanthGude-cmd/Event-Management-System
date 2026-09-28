const express = require('express');

const {
    registerForEvent,
    cancelRegistration,
    getUserRegistrations,
    getEventRegistrations,
    checkRegistration
} = require("../controllers/registrationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

// Register for an event
router.post("/register", registerForEvent);
// Cancel registration for an event
router.put("/:id/cancel", cancelRegistration);
router.get("/user/:userId", getUserRegistrations);
router.get("/event/:eventId", getEventRegistrations);
router.get("/check/:userId/:eventId", checkRegistration);

module.exports = router;
