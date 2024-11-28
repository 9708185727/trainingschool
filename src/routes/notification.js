import { getNotifications } from "../controllers/notificationController.js";
import express from "express"
const router = express.Router();


router.get("/",getNotifications);
export default router;