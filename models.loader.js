import productModelInititator from "./modules/products/models/product.model.js";

export const initiateModels = (sequelize) => {
  productModelInititator(sequelize);

  for (const key of Object.keys(sequelize.models)) {
    if(sequelize.models[key].associate) sequelize.models[key].associate();
  }
};
