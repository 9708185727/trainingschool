
import Submission from "../models/Sub.js";

const createSubmission = async (data) => {
  return await Submission.create(data); // Save all provided fields
};

const checkExistingSubmission = async (userId, opportunityId) => {
  // Check if a submission exists from the same user for the same opportunity
  return await Submission.findOne({ createdBy: userId, opportunityId });
};
const getSubmission = async (query) => {
  const limit = query?.limit || 10;
  const sort = query?.sort ? JSON.parse(query.sort) : {};
  const filters = query?.filters ? JSON.parse(query.filters) : {};
  const page = query?.page || 1;
  const offset = (page - 1) * limit;

  const customQuery = Object.entries(filters).reduce((acc, [key, value]) => {
    const result = { ...acc, [key]: new RegExp(value, "i") };

    return result;
  }, {});

  return await Submission.find(customQuery).limit(limit).sort(sort).skip(offset);
};
const getSubmissionById = async (id) => {
  return await Submission.findById(id);
};

const updateSubmissionById = async (id, data) => {
  return await Submission.findByIdAndUpdate(id, data);
 
};

const getTotalSubmissions=async ()=>{
  return await Submission.countDocuments();
}
export default {
  createSubmission,
  getSubmission,
  getSubmissionById,
  updateSubmissionById,
  getTotalSubmissions,
  checkExistingSubmission 
};
