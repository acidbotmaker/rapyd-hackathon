import asyncHandler from "express-async-handler";
import Order from "../models/orderModels.js";

//@description___Create New Order...
//@route___POST./api/orders...
//@access___Private...

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems === 0) {
    res.status(404);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@description___Getting Orders by Id...
//@route___GET./api/orders/:id...
//@access___Private...

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});




//@description___Update Order to Paid...
//@route___GET./api/orders/:id/pay...
//@access___Private...

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid =  true
    order.paidAt =  Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);

  } else {
    res.status(404);
    throw new Error("Payment Failed");
  }
});



//@description___Getting All Orders from LoggedIn User...
//@route___GET./api/orders/myorders...
//@access___Private...

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  res.json(orders)
});




//@description___Getting All Orders ...
//@route___GET./api/orders...
//@access___Private/Admin...

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders)
});


//@description___Update Order to be Delivered...
//@route___GET./api/orders/:id/delivered...
//@access___Private/Admin...

const updateOrderToBeDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Payment Failed");
  }
});



export { addOrderItems, getOrderById, updateOrderToPaid , getMyOrders, getOrders, updateOrderToBeDelivered};
