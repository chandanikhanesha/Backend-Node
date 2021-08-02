const Customer = require("./customer.model").Customer;
const db = require("./database");

exports.update = (req, res) => {
  try {
    id = req.params.id;
    db.Customer.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json({
            success: true,
            message: `your id ${id} has been upadted`,
          });
        }
      })
      .catch((err) => {
        res.json({ success: false, message: err });
      });
  } catch (err) {
    console.log(err);
    res.json({ data: false, message: err });
  }
};
