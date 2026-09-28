const express = require("express");

const {
    getOrganizerEvents,
    getOrganizerEvent,
    updateOrganizerEvent,
    cancelOrganizerEvent,
    getEventParticipants,
    getAllOrganizerEvents
} = require("../controllers/organizerController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();
router.use(protect);
router.use(authorize("ORGANIZER" , "ADMIN"));

router.get("/events", getAllOrganizerEvents);
router.get("/:organizerId/events/:eventId/participants", getEventParticipants);
router.get("/:organizerId/events", getOrganizerEvents);
router.get("/:organizerId/events/:eventId", getOrganizerEvent);
router.put("/:organizerId/events/:eventId", updateOrganizerEvent);
router.put("/:organizerId/events/:eventId/cancel", cancelOrganizerEvent);


module.exports = router;