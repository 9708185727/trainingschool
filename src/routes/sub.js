

import express from "express";
import auth from "../middlewares/auth.js";
import { getAllSubmission,addSubmission,getSubmissionById,getTotalSumSubmission,updateSubmission } from '../controllers/subController.js'
import upload from "../middlewares/uploads.js";

const router = express.Router();
// POST /api/submissions – Submit a file for an opportunity.
router.post('/',auth,upload.single('file'),addSubmission)

// GET /api/submissions – List all submissions (Recruiter/Admin).
router.get('/',getAllSubmission,
)

// GET /api/submissions/:id – View specific submission details.
router.get("/:id",auth,getSubmissionById)

// PUT /api/submissions/:id – Update submission status (Recruiter/Admin).
router.put("/:id",auth,updateSubmission)
//gettotalsubmission/api/submissions/totalsubmission
router.get("/totalsubmission",auth,getTotalSumSubmission)
export default router