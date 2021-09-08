const Order = require("../../modules/OrderModel");

//getOrders
module.exports = (req, res) => {
  var user = req.body.userResult.id;
  console.log(req.body.userResult.id);

  // const orders = Order.find(user);
  // res.json(orders);

  Order.find({ user: user })
    .then((orders) => {
      res.status(201).json({ orders });
      // console.log(orders);
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};
