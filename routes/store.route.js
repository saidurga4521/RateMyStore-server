import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import {
  addStore,
  getStores,
  getStoreRatings,
} from "../controllers/store.controller.js";

const router = express.Router();

//Admin routes
router.post("/addStore", isLoggedIn, authorizeRoles("admin"), addStore);
router.get("/getStores", isLoggedIn, getStores);

//store owner routes
router.get(
  "/ratings",
  isLoggedIn,
  authorizeRoles("store_owner"),
  getStoreRatings
);

export default router;
