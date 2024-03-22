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
        "Error while fetching product by Id: " + error?.message
          ? error.message
          : "Unknown Error"
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
        "Error while fetching product by Name: " + error?.message
          ? error.message
          : "Unknown Error"
      );
      return null;
    }
  };

  addProduct = async (productBody) => {
    try {
      const { Product } = db.models;
      const addedProduct = await Product.create(productBody);
      return addedProduct;
    } catch (error) {
      logger.error(
        "Error while adding product: " + error?.message
          ? error.message
          : "Unknown Error"
      );
      return null;
    }
  };

  updateProduct = async (productBody) => {
    try {
      const { Product } = db.models;
      const pid = productBody.pid;

      delete productBody.pid;

      const updatedProduct = await Product.update(productBody, {
        where: {
          pid: pid,
        },
      });

      if (updatedProduct > 0) {
        return await this.getProductById(pid);
      } else return null;
    } catch (error) {
      logger.error(
        "Error while updating product: " + error?.message
          ? error.message
          : "Unknown Error"
      );
      return null;
    }
  };

  deleteProduct = async (pid) => {
    try {
      const { Product } = db.models;
      const deletedStatus = await Product.destroy({
        where: {
          pid: pid,
        },
      });
      if(deletedStatus>0) return true;
      else return null;
    } catch (error) {
      logger.error(
        "Unable to delete product by id: " + error?.message
          ? error.message
          : "Unknown Error"
      );
      return null;
    }
  };
}
