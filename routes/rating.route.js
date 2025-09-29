import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { submitRating } from "../controllers/rating.controller.js";

const router = express.Router();

router.post("/submit-rating", isLoggedIn, submitRating);

export default router;
