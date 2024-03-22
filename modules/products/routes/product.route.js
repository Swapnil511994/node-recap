import expressAsyncHandler from "express-async-handler";
import express from "express";
const router = express.Router();

import { ProductController } from "../controllers/product.controller.js";
import {
  validateCreateProduct,
  validateProductId,
  validateUpdateProduct,
} from "../validations/product.validation.js";

const productController = new ProductController();

router.get(
  "/:productId",
  validateProductId,
  expressAsyncHandler(productController.getProductById)
);

router.post(
  "/find",
  expressAsyncHandler(productController.findProductByName)
);

router.post(
  "/create",
  validateCreateProduct,
  expressAsyncHandler(productController.createProduct)
);

router.patch(
  "/update",
  validateUpdateProduct,
  expressAsyncHandler(productController.updateProduct)
);

router.delete(
  "/delete/:productId",
  validateProductId,
  expressAsyncHandler(productController.deleteProduct)
);

export default router;
