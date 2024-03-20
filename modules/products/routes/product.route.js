import expressAsyncHandler from "express-async-handler";
import express from "express";
const router = express.Router();

import { ProductController } from "../controllers/product.controller.js";


const productController = new ProductController();

router.get(
  "/:productId",
  expressAsyncHandler(productController.getProductById)
);

router.post("/find", expressAsyncHandler(productController.findProductByName));

export default router;
