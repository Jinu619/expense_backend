const { User } = require('../../models');
const { Op } = require('sequelize');
const { updateUserSchema } = require('../../validations/user/user.validation');
const bcrypt = require('bcrypt');

const getprofile = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    try {
        const profile = await User.findOne({ where: { id: userId } });
        res.status(200).json({ message: 'success', data: profile });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
const updateprofile = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    try {
        const { error } = updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation error", details: error.details });
        }
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await user.update(req.body);
        res.status(200).json({ message: "Profile updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const changePassword = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Validation error", details: "old password and new password are required" });
    }
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let fixedHash = user.password.replace('$2y$', '$2a$');
        const isMatch = await bcrypt.compare(oldPassword, fixedHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Old Password is wrong" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await user.update({ password: hashedPassword });

        res.status(200).json({ message: "Password updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const updatePin = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const { oldPin, newPin } = req.body;
    if (!oldPin || !newPin) {
        return res.status(400).json({ message: "Validation error", details: "old pin and new pin are required" });
    }
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let fixedHash = user.pin.replace('$2y$', '$2a$');
        const isMatch = await bcrypt.compare(oldPin, fixedHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Old Pin is wrong" });
        }
        const hashedPin = await bcrypt.hash(newPin, 10);
        const updatedUser = await user.update({ pin: hashedPin });

        res.status(200).json({ message: "Pin updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
module.exports = {
    getprofile,
    updateprofile,
    changePassword,
    updatePin
};