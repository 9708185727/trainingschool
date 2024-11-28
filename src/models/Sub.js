import mongoose from "mongoose";
const subSchema = new mongoose.Schema({
    opportunityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity',
        required: true
      },
      createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      fileUrl: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Approved', 'Rejected'],
        default: 'Pending'
      },
      feedback: {
        type: String,
        default: ''
      },
        createdAt: {
    type: Date,
    default: Date.now(),
  },

});
export default mongoose.model("Submission", subSchema);
