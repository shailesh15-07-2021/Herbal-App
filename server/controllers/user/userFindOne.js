const UserDB = require("../../modules/userModel");
module.exports = (req, res) => {
  if (req.params.id) {
    const id = req.params.id;
    UserDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: `User may not present with this ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error while retriving the User" });
      });
  } else {
    UserDB
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  }
};
