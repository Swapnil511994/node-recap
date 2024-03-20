import db from "../../../db.singleton";
import logger from "../../../logger";

export const getProductById = async (productId) => {
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


