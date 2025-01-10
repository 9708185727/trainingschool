import subService from "../services/subService.js";
import mongoose from "mongoose";
const getAllSubmission = async (req, res) => {
  // const user = req.user;
  // console.log(user)

  try {
    // if (!user.role.includes("Admin")&&!user.role.includes("Recruiter")) {
    //   return res.status(404).send("Access Denied");
    // }
    const getData = await subService.getSubmission(req.query);
    res.status(201).json(getData);
    console.log(req.query);
  } catch (error) {
    res.status(400).send(error.message);
  }
   
};

const getSubmissionById = async (req, res) => {
  // console.log(req.query);
  console.log(req.params.id);

  const id = req.params.id;
  try {
    const Submission = await subService.getSubmissionById(id);
    if (!Submission) res.status(404).send("Submission not found");

    res.json(Submission);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const addSubmission = async (req, res) => {
  const user = req.user; // Authenticated user
  const data = req.body; // Submission data from request body

  // Validate required fields
  if (!user) return res.status(422).send("User authentication is required.");
  if (!data.fileUrl) return res.status(422).send("Submission fileUrl is required.");

  // Restrict certain roles
  // if (user.role.includes("Admin") && user.role.includes("Recruiter")) {
  //   return res.status(403).send("Access Denied.");
  // }

  try {
    // Example: Fetch the opportunity associated with the request
    const opportunity = await mongoose.model("Opportunity").findById(data.opportunityId);
    if (!opportunity) {
      return res.status(404).send("Opportunity not found.");
    }

    // Check if the user has already submitted for the same opportunity
    const existingSubmission = await subService.checkExistingSubmission(user._id, opportunity._id);
    if (existingSubmission) {
      return res.status(400).send("You have already submitted for this opportunity.");
    }

    // Create the submission with the provided opportunityId
    const createdSubmission = await subService.createSubmission({
      ...data,
      opportunityId: opportunity._id, // Link to the provided opportunity
      createdBy: user._id, // Link submission to the authenticated user
    });

    res.status(201).json(createdSubmission);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateSubmission = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const user = req.user;
  console.log(user);

  try {
    const Submission = await subService.getSubmissionById(id);
    if (!Submission) return res.status(404).send("Submission not Found");
    if (Submission.createdBy != user._id && !user.role.includes("Admin")&&!user.role.includes("Recruiter")) {
      return res.status(404).send("Access Denied");
    }
    const updatedSubmission = await subService.updateSubmissionById(id, data);
    res.status(201).json(updatedSubmission);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getTotalSumSubmission = async (req, res) => {
  try {
    const totalSubmission = await subService.getTotalSubmissions();
    res.status(201).json(totalSubmission);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export {
  getAllSubmission,
  getSubmissionById,
  addSubmission,
  updateSubmission,
  getTotalSumSubmission,
};
