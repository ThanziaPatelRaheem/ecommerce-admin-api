import express from "express";
import Product from "../Models/Product.js";
import createError from "../utlis/createError.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();

    if (allProducts.length === 0) {
      return next(createError(400, "No products found"));
    }

    res
      .status(200)
      .json({ message: "All the products are shown here", allProducts });
  } catch (err) {
    next(err);
  }
};

export const getOneProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const oneProduct = await Product.findById(productId);

    if (!oneProduct) {
      return next(createError(400, "No product found"));
    }

    res.status(200).json({ success: true, product: oneProduct });
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  const { name, price, description, imageUrl, category, inStock } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
      category,
      inStock,
      createdBy: req.user._id,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (err) {
    next(err);
  }
};

export const updateProducts = async (req, res, next) => {
  const { productId } = req.params;
  const { name, price, description, imageUrl, category, inStock } = req.body;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return next(createError(404, "No product found"));
    }

    if (name) product.name = name;
    if (price) product.price = price;

    await product.save();
    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct: product,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return next(createError(404, "Product not found"));
    }
    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};
