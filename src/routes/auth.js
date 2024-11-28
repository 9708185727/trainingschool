import { userRegister,userLog,logout, getAllUser,getUserId,getUpdateUser} from "../controllers/userController.js";
import express from "express";

import auth from "../middlewares/auth.js";
import roleBaseAuth from "../middlewares/roleBasedAuth.js";
const router=express.Router();

router.post("/register",userRegister);
router.post("/login",userLog);
router.post("/logout",logout);
router.get("/",[auth,roleBaseAuth("Admin")],getAllUser)
router.get("/:id",auth,getUserId)
router.put("/:id",auth,getUpdateUser)
export default router;
