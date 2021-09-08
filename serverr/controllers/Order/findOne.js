const asyncHandler = require("express-async-handler");
const Order = require("../../modules/OrderModel");

//getOrderByID
module.exports = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.params.id });
  if (order) {
    res.json(order);
    // console.log(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});
