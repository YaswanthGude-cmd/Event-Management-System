const mongoose = require("mongoose");
const User = require("../models/User");

// GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            count: users.length,
            users
        });

    } catch (error) {
        console.error("Get all users error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET USER BY ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID format"
            });
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("Get user error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// UPDATE USER
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID format"
            });
        }

        const {
            firstName,
            lastName,
            email,
            phone,
            role,
            status
        } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Update only provided fields
        if (firstName !== undefined) {
            user.firstName = firstName;
        }

        if (lastName !== undefined) {
            user.lastName = lastName;
        }

        if (email !== undefined) {
            user.email = email;
        }

        if (phone !== undefined) {
            user.phone = phone;
        }

        if (role !== undefined) {
            user.role = role;
        }

        if (status !== undefined) {
            user.status = status;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                phone: updatedUser.phone,
                role: updatedUser.role,
                status: updatedUser.status
            }
        });

    } catch (error) {
        console.error("Update user error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// DELETE USER
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID format"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error("Delete user error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};