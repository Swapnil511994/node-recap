import { Op } from "sequelize";
import db from "../../../db.singleton.js";
import logger from "../../../logger.js";

export class ProductService {
  getProductById = async (productId) => {
    try {
      const { Product } = db.models;
      const searchedProduct = await Product.findOne({
        where: {
          pid: productId,
        },
      });
      if (searchedProduct && searchedProduct.pid > 0) {
        return searchedProduct;
      } else {
        throw new Error("Product does not exist");
      }
    } catch (error) {
      logger.error(
        "Error while fetching product by Id: ",
        error?.message ? error.message : "Unknown Error"
      );
      return null;
    }
  };

  searchProductByName = async (productName) => {
    try {
      const { Product } = db.models;

      const searchedProducts = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${productName}%`,
          },
        },
      });

      if (searchedProducts && searchedProducts.length > 0) {
        return searchedProducts;
      } else {
        throw new Error("No Products exist by the given name");
      }
    } catch (error) {
      logger.error(
        "Error while fetching product by Name: ",
        error?.message ? error.message : "Unknown Error"
      );
      return null;
    }
  };
}
