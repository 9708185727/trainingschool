import express from "express";
import auth from "../middlewares/auth.js";
import {addOpportunity, getAllOpportunity, getOpportunityById, updateOpportunity,deleteOpportunity, getAllType, getTotalSumOpportunity} from "../controllers/oppController.js";
import roleBaseAuth from "../middlewares/roleBasedAuth.js";
const router = express.Router();


router.get("/",getAllOpportunity);
router.get("/type",getAllType);
router.get("/total",getTotalSumOpportunity);
router.get("/:id",getOpportunityById);
router.post("/",auth,addOpportunity);
router.put("/:id",auth,updateOpportunity);
router.delete("/:id",[auth,roleBaseAuth("Admin")],deleteOpportunity);
export default router;
