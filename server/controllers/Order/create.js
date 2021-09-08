const Order = require("../../modules/OrderModel");

module.exports = (req, res, next) => {
  const order = new Order({
    user: req.body.userResult.id,
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });

  order
    .save()
    .then((data) => {
      res.status(201).json({
        msg: "Order Genrated successfully",
        data: data,
      });
      // console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        mesaage: err.message || "some error occured while creating order",
      });
      console.log(err);
    });
};
