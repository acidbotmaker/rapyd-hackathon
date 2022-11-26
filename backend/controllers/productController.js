import asyncHandler from "express-async-handler";
import Product from "../models/productModels.js";

//@description___Fetch All Products...
//@route___GET./api/products...
//@access___Public...

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
    image: "/images/eclipta-alba.jpg",
    description: "description",
    family: "family",
    category: "Medicinal plants",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    co2Count: 0,
    user: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@description___Update new Product...
//@route___PUT./api/products/:id...
//@access___Private/admin...

const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, category, family, description, price, countInStock,co2Count } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.category = category;
    product.family = family;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;
    product.co2Count = co2Count;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@description___Create a new product review...
//@route___PUT./api/products/:id/reviews...
//@access___Private...

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Product Already Reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review Added Successfully" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@description___Get top rated products...
//@route___GET./api/products/carousel...
//@access___Public...

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
