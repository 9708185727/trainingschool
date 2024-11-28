import getOpportunityStats from "../controllers/reportController.js";
import express from "express"
const router =express.Router();


router.get("/",getOpportunityStats);
export default router