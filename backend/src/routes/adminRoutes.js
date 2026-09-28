const express = require("express");

const {
    getAllUsers,
    getUserById,
    blockUser,
    unblockUser,
    getAllEvents,
    getAdminEvent,
    cancelAdminEvent,
    updateAdminEvent,
    deleteAdminEvent,
    getAllOrganizers,
    getOrganizerById,
    getAllRegistrations,
    getRegistrationsByEvent,
    getRegistrationById,
    cancelAdminRegistration,
    updateUser
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();
router.use(protect);
router.use(authorize("ADMIN"));

router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.put("/users/:userId/block", blockUser);
router.put("/users/:userId/unblock", unblockUser);
router.get("/events", getAllEvents);
router.get("/events/:eventId", getAdminEvent);
router.put("/events/:eventId/cancel", cancelAdminEvent);
router.put("/events/:eventId", updateAdminEvent);
router.delete("/events/:eventId", deleteAdminEvent);
router.get("/registrations", getAllRegistrations);
router.get("/registrations/event/:eventId", getRegistrationsByEvent);
router.get("/registrations/:registrationId", getRegistrationById);
router.put("/registrations/:registrationId/cancel", cancelAdminRegistration);
router.get("/organizers", getAllOrganizers);
router.get("/organizers/:organizerId", getOrganizerById);
router.put("/users/:userId", updateUser);

module.exports = router;