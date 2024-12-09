import Notification from "../models/notification.model.js";

/**
 * Get Notifications for the Logged-In User
 */
export const getNotifications = async (req, res) => {
  try {
    // Validate user information
    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: "User ID is missing or invalid" });
    }

    const userId = req.user._id;

    // Fetch notifications for the user
    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    // Mark notifications as read
    await Notification.updateMany({ to: userId, read: false }, { read: true });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Error in getNotifications:", error.message);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

/**
 * Delete All Notifications for the Logged-In User
 */
export const deleteNotifications = async (req, res) => {
  try {
    // Validate user information
    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: "User ID is missing or invalid" });
    }

    const userId = req.user._id;

    // Delete all notifications for the user
    await Notification.deleteMany({ to: userId });

    res.status(200).json({
      success: true,
      message: "Notifications deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteNotifications:", error.message);
    res.status(500).json({ error: "Failed to delete notifications" });
  }
};
