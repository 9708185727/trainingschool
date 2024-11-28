import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user receiving the notification
    ref: "User",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user or system sending the notification
    ref: "User",
  },
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to an opportunity if the notification is related to one
    ref: "Opportunity",
  },
  submissionId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a submission if the notification is related to one
    ref: "Submission",
  },
  type: {
    type: String, // Type of notification
    enum: ["Opportunity", "Submission", "System", "Custom"],
    required: true,
  },
  message: {
    type: String, // The content of the notification
    required: true,
  },
  status: {
    type: String, // Status of the notification
    enum: ["Unread", "Read"],
    default: "Unread",
  },
  createdAt: {
    type: Date, // Timestamp for when the notification was created
    default: Date.now,
  },
});

export default mongoose.model("Notification", notificationSchema);
