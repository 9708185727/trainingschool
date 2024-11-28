import notService from "../services/notService.js";

    const  getNotifications=async(req, res) =>{
        try {
            const userId = req.user.id; // Assume user ID is extracted from JWT
            const { type, read, limit, page } = req.query;

            const notifications = await notService.getNotificationstatus(userId, {
                type,
                read,
                limit: parseInt(limit) || 10,
                page: parseInt(page) || 1,
            });

            res.status(200).json({
                success: true,
                data: notifications,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }


export {getNotifications};
