import express from "express";
import {
  signup,
  login,
  getAllUsers,
  updatePassword,
  addUser,
} from "../controllers/user.controller.js";
import { getAdminDashboard } from "../controllers/dashboard.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
const router = express.Router();

//public routes
router.post("/signup", signup);
router.post("/login", login);
//admin routes
router.get("/", isLoggedIn, authorizeRoles("admin"), getAllUsers);
router.post("/addUser", isLoggedIn, authorizeRoles("admin"), addUser);
router.get("/stats", isLoggedIn, authorizeRoles("admin"), getAdminDashboard);
//All users
router.put("/update-password", isLoggedIn, updatePassword, getAdminDashboard);
export default router;
