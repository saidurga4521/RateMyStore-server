import express from "express";
import userRoutes from "../routes/user.route.js";
import storeRoutes from "../routes/store.route.js";
import ratingRoutes from "../routes/rating.route.js";
const router = express.Router();

router.use("/auth", userRoutes);
router.use("/store", storeRoutes);
router.use("/rating", ratingRoutes);
export default router;
