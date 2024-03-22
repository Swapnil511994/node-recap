import { ProductService } from "../services/product.service.js";
import logger from "../../../logger.js";
import {
  createResponseJson,
  responseFormatter,
} from "../../../helpers/response/responseFormatter.helper.js";

export class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getProductById = async (req, res) => {
    try {
      const { productId } = req.params;
      if (!productId) throw new Error("Invalid Product Id");

      const product = await this.productService.getProductById(productId);
      if (product) {
        return responseFormatter(
          res,
          200,
          createResponseJson(true, "Product retreived", product)
        );
      }

      responseFormatter(
        res,
        404,
        createResponseJson(false, "Unable to find product by given id", null)
      );
    } catch (error) {
      logger.error(
        "Error while executing getProductById: " + error?.message
          ? error.message
          : "Unknown Error"
      );
      responseFormatter(
        res,
        500,
        createResponseJson(false, "Internal Server Error", null)
      );
    }
  };

  findProductByName = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name || name?.trim()?.length <= 0)
        throw new Error("Invalid product name");

      const searchedProducts = await this.productService.findProductByName(
        name
      );
      if (!searchedProducts)
        return responseFormatter(
          res,
          404,
          createResponseJson(false, "Unable to find products by name")
        );

      responseFormatter(
        res,
        200,
        createResponseJson(
          true,
          "Products fetched successfully",
          searchedProducts
        )
      );
    } catch (error) {
      logger.error(
        "Error while executing findProductByName()" + error?.message
          ? error.message
          : "Unknown Error"
      );

      responseFormatter(
        res,
        500,
        createResponseJson(false, "Internal serrver error", null)
      );
    }
  };

  createProduct = async (req, res) => {
    try {
      const body = req.body;
      const createdProduct = await this.productService.addProduct(body);
      if (!createdProduct)
        return responseFormatter(
          res,
          404,
          createResponseJson(false, "Unable to add product")
        );
      responseFormatter(
        res,
        200,
        createResponseJson(true, "Product added", createdProduct)
      );
    } catch (error) {
      logger.error(
        "Error while executing createProduct()" + error?.message
          ? error.message
          : "Unknown Error"
      );
      responseFormatter(
        res,
        500,
        createResponseJson(false, "Internal server error")
      );
    }
  };

  updateProduct = async (req, res) => {
    try {
      const body = req.body;
      const updatedProduct = await this.productService.updateProduct(body);
      res.json(updatedProduct);
    } catch (error) {
      logger.error(
        "Error while executing createProduct()" + error?.message
          ? error.message
          : "Unknown Error"
      );
      responseFormatter(
        res,
        500,
        createResponseJson(false, "Internal server error")
      );
    }
  };

  deleteProduct = async (req, res) => {
    try {
      console.log("Delete Product: ", req.params);
      const { productId } = req.params;
      if (!productId) throw new Error("Invalid Product Id");
      const deleteResponse = await this.productService.deleteProduct(productId);
      if (!deleteResponse)
        return responseFormatter(
          res,
          200,
          createResponseJson(false, "Unable to delete product")
        );

      responseFormatter(
        res,
        200,
        createResponseJson(true, "Product removed successfully")
      );
    } catch (error) {
      logger.error(
        "Error while executing deleteProduct()" + error?.message
          ? error.message
          : "Unknown Error"
      );
      responseFormatter(
        res,
        500,
        createResponseJson(false, "Internal server error")
      );
    }
  };
}
