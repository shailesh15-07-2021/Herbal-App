const ContacDB = require("../../modules/ContactUsModel");

module.exports = (req, res) => {
  if (req.query.id) {
    ContacDB.findById(req.query.id)
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: `Message Not Available`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error while retriving the data" });
      });
  } else {
    ContacDB.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  }
};
