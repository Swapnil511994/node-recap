import { ProductService } from "../services/product.service";
import logger from "../../../logger";
import {
  createResponseJson,
  responseFormatter,
} from "../../../helpers/response/responseFormatter.helper";

export class ProductController {
  constructor() {
    this.productService = new ProductService();
  }
  
  getProductById = async (req, res) => {
    try {
      const { productId } = req.params;
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
        400,
        createResponseJson(false, "Unable to find product by given id", null)
      );
    } catch (error) {
      logger.error(
        "Error while executing getProductById: ",
        error?.message ? error.message : "Unknown Error"
      );
      responseFormatter(
        res,
        500,
        createResponseJson(false, "Internal Server Error", null)
      );
    }
  };
}
