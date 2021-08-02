const db = require("./database");
const Customer = db.Customer;
const Product = db.Product;

exports.create = async (req, res) => {
  try {
    db.Customer.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      age: req.body.age,
    }).then((result) => {
      res.status(200).json({
        message: "Upload Successfully a Customer with",
        customers: [result],
        error: "",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Fail!",
      customers: [],
      error: error.message,
    });
  }
};
exports.create2 = async (req, res) => {
  try {
    db.Product.create({
      productdetails: req.body.productdetails,
      prize: req.body.prize,
    }).then((result) => {
      res.status(200).json({
        message: "Upload Successfully a Product with",
        Products: [result],
        error: "",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Fail!",
      Products: [],
      error: error.message,
    });
  }
};

exports.all = async (req, res) => {
  try {
    db.Customer.findAll({
      // include: [db.Product],
      include: [
        {
          model: db.Product,
          as: "product",
        },
      ],
    }).then((result) => {
      res.status(200).json({
        message: "you get your all data",
        result: [result],
      });
    });
  } catch (err) {
    conolse.log(err);
    res.json({ message: err });
  }
};
