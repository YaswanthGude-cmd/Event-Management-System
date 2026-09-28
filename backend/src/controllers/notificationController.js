const Notification = require("../models/Notification");
const User = require("../models/User");

// CREATE NOTIFICATION
const createNotification = async (req, res) => {
    try {
        const {userId, title, message, type} = req.body;

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({message : "User not found"});
        }

        const notification = await Notification.create({
            userId,
            title,
            message,
            type
        });
        res.status(201).json({
            message: "Notification created successfully", 
            notification
        });
    } catch (error) {
        console.error("Create notification error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// GET NOTIFICATIONS FOR A USER
const getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message : "User not found"});
        }
        if(req.user.id !== userId ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const notifications = await Notification.find({userId : userId}).sort({createdAt: -1});
        res.status(200).json({
            count: notifications.length,
            notifications
        });
    } catch (error) {
        console.error("Get user notifications error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findById(notificationId);
        if(!notification) {
            return res.status(404).json({message : "Notification not found"});
        }

        if(notification.isRead) {
            return res.status(400).json({message : "Notification is already marked as read"});
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({
            message: "Notification marked as read successfully",
            notification
        });
    } catch (error) {
        console.error("Mark notification as read error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// MARK ALL NOTIFICATIONS AS READ
const markAllNotificationsAsRead = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message : "User not found"});
        }

        if(req.user.id !== userId ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const result = await Notification.updateMany(
            { userId: userId, isRead: false },
            { $set: { isRead: true } }
        );
        res.status(200).json({
            message: `${result.modifiedCount} notifications marked as read successfully`,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error("Mark all notifications as read error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// DELETE A NOTIIFICATION
const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findById(notificationId);
        if(!notification) {
            return res.status(404).json({message : "Notification not found"});
        }

        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({
            message: "Notification deleted successfully"
        });
    } catch (error) {
        console.error("Delete notification error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
};