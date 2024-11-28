import Notification from "../models/Notification.js";
  const  getNotificationstatus=async(userId, filters)=>{
        const { type, read, limit, page } = filters;

        const query = { userId };
        if (type) query.type = type;
        if (read !== undefined) query.isRead = read === 'true';

        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 }) // Most recent notifications first
            .skip((page - 1) * limit)
            .limit(limit);

        return notifications;
    }
export default getNotificationstatus;

