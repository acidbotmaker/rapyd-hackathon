import express from "express";

import {
  userAuth,
  getUserProfile,
  newUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
} from "../controllers/userController.js";
import { protect , admin} from "../middlewares/authMiddleware.js";

const router = express.Router();
router.route("/").post(newUser).get(protect,admin, getUsers)
router.post("/login", userAuth);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)

export default router;
