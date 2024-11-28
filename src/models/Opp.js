import mongoose from "mongoose";
const oppSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Hackathon', 'Quiz', 'Job', 'Internship'],
    required: true
  },
  url: String,
  deadline: {
    type: Date,
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type:mongoose.Schema.Types.ObjectId ,
    ref:"User",
    required:true,
  },
});
export default mongoose.model("Opportunity", oppSchema);
