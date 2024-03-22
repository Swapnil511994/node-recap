import Joi from "joi";
import {
  createResponseJson,
  responseFormatter,
} from "../../../helpers/response/responseFormatter.helper.js";

const createProductSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(400).optional().allow(null),
  active: Joi.number().allow(0,1).optional(),
  price: Joi.number().min(0).required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(400).optional().allow(null),
  active: Joi.number().allow(0,1).optional(),
  price: Joi.number().min(0).optional(),
});

const productIdSchema = Joi.object({
  productId: Joi.number().min(1).required(),
});

export const validateProductId = (req, res, next) => {
  const { error } = productIdSchema.validate(req.params);
  if (error) {
    return responseFormatter(
      res,
      400,
      createResponseJson(false, error.details[0].message)
    );
  }
  next();
};

export const validateCreateProduct = (req, res, next) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    return responseFormatter(
      res,
      400,
      createResponseJson(false, error.details[0].message)
    );
  }
  next();
};

export const validateUpdateProduct = (req, res, next) => {
  const { error } = updateProductSchema.validate(req.body);
  if (error) {
    return responseFormatter(
      res,
      400,
      createResponseJson(false, error.details[0].message)
    );
  }
  next();
};
