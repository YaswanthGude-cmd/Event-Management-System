const express = require("express");

const {
    createFeedback,
    getUserFeedback,
    getEventFeedback,
    updateFeedback,
    deleteFeedback
} = require("../controllers/feedbackController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

router.post("/", createFeedback);
router.get("/user/:userId", getUserFeedback);
router.get("/event/:eventId", getEventFeedback);
router.put("/:feedbackId", updateFeedback);
router.delete("/:feedbackId", deleteFeedback);

module.exports = router;