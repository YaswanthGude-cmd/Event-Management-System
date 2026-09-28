const express = require("express");

const {
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
} = require("../controllers/notificationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

router.post("/", createNotification);
router.get("/user/:userId", getUserNotifications);
router.put("/:notificationId/read", markNotificationAsRead);
router.put("/user/:userId/read-all", markAllNotificationsAsRead);
router.delete("/:notificationId", deleteNotification);

module.exports = router;