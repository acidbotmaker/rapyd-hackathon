import asyncHandler from "express-async-handler";
import Product from "../models/productModels.js";

//@description___Fetch All Products...
//@route___GET./api/products...
//@access___Public...

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@description___Fetch single Product...
//@route___GET./api/products/:id...
//@access___Public...

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product You Search For is Not Found");
  }
});

//@description___Delete Products...
//@route___DELETE./api/products/:id...
//@access___Private/admin...

const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed Successfully" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@description___Create a new Product...
//@route___POST./api/products/...
//@access___Private/admin...

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Product Name",
    image: "/images/sample.jpg",
    category: "Set Product Category",
    family: "Set Plant Family Name",
    description:"Write the Description of the Product",
    reviews: [],
    numReviews: 0,
    price: 0,
    countInStock: 0,
    user: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@description___Update new Product...
//@route___PUT./api/products/:id...
//@access___Private/admin...

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    category,
    family,
    description,
    price,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.category = category;
    product.family = family;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});
export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
};
