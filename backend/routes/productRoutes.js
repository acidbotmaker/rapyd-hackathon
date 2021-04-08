import express from 'express';
import {
  getProductById,
  getProducts,
  deleteProductById,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts
} from "../controllers/productController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.route("/").get(getProducts).post(protect,admin, createProduct);
router.route("/:id/reviews").post(protect,createProductReview);
router.get('/carousel', getTopProducts);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProductById).put(protect, admin, updateProduct);

export default router;