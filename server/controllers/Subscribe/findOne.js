const ContactDB = require("../../modules/SubscribeModel");
module.exports = (req, res) => {
  if (req.params.id) {
    ContactDB.findById(req.params.id)
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: `Email Not Available`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error while retriving the data" });
      });
  } else {
    ContactDB.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  }
};
