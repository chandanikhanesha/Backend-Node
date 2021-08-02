var Secret_Key = process.env.Secret_Key;

const stripe = require("stripe")(Secret_Key);
exports.payment = (req, res) => {
  const token = req.body;
  console.log(token);
  stripe.customers
    .create({
      email: token.email,
      id: token.id,
      name: "jkoladiya",
      address: {
        city: "surat",
        state: "Gujarat",
        country: "India",
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 2500,
        description: "Web Development Product",
        currency: "INR",
        customer: customer.id,
        receiept_email: token.email,
        shipping: {
          name: token.card.name,
        },
      });
    })
    .then((customer) => {
      res.send("Success", customer);
    })
    .catch((err) => {
      res.send(err);
    });
};
