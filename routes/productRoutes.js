import express from "express";
import {
  updateProducts,
  addProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
} from "../controllers/productController.js";
import auth from "../middleware/auth.js";
import checkAdmin from "../middleware/checkAdmin.js";
import handleValidationErrors from "../middleware/handleValidationErros.js";
import {
  productIdValidator,
  productValidationRules,
} from "../validators/productValidators.js";

const router = express.Router();

router.get("/allProducts", getAllProducts);

router.get(
  "/oneProduct/:productId",
  productIdValidator,
  handleValidationErrors,
  getOneProduct
);

router.post(
  "/addProduct",
  auth,
  checkAdmin,
  productValidationRules,
  handleValidationErrors,
  addProduct
);

router.patch(
  "/updateProduct/:productId",
  auth,
  checkAdmin,
  productValidationRules,
  handleValidationErrors,
  updateProducts
);

router.delete(
  "/deleteProduct/:productId",
  auth,
  checkAdmin,
  productIdValidator,
  handleValidationErrors,
  deleteProduct
);

export default router;
