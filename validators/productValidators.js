import { body, param } from "express-validator";

export const productValidationRules = [
  body("name").trim().notEmpty().withMessage("Product name is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("inStock")
    .notEmpty()
    .withMessage("Stock status is required")
    .isBoolean()
    .withMessage("inStock must be true or false"),
];

export const productIdValidator = [
  param("productId").isMongoId().withMessage("Invalid product ID"),
];
