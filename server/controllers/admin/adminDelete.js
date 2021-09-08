const AdminDB = require("../../modules/adminModel");

module.exports = (req, res) => {
  const id = req.params.id;

  AdminDB.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Admin was deleted successfully!",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Admin with id=" + id,
      });
    });
};
