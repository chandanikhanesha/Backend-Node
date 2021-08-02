const Customer = require("./customer.model").Customer;
const db = require("./database");

exports.delete = (req, res) => {
  try {
    id = req.params.id;
    db.Customer.destroy({ where: { id: id } })

      .then((num) => {
        if (num == 1) {
          res.json({
            success: true,
            message: `your id ${id} record is deleted`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          success: false,
          error: err,
        });
      });
  } catch (err) {
    console.log(err);
    res.status({
      success: false,
      error: Message.err,
    });
  }
};
