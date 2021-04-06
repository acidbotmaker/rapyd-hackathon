import asyncHandler from  'express-async-handler';
import Product from "../models/productModels.js";

//@description___Fetch All Products...
//@route___GET./api/products...
//@access___Public...

const getProducts = asyncHandler (async (req,res) => {
    const products = await Product.find({});
    res.json(products);
})


//@description___Fetch single Product...
//@route___GET./api/products/:id...
//@access___Public...

const getProductById = asyncHandler ( async (req,res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product You Search For is Not Found");
    }

})

export { getProducts, getProductById}