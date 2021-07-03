const express = require("express");
const app = express();
require("./Connection");

const login = require("./Login");
app.use(express.json());

app.post("/login", (req, res) => {
  console.log(req.body);
  const user = new login(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// app.post("/login", async (req, res) => {
//   try {
//     console.log(req.body)
//     const user = new login(req.body);
//     const craeteuser = await user.save();
//     res.status(201).res.send(craeteuser);
//   } catch (e) {
//     res.status(400).res.send(e);
//   }
// });

app.listen(3001, () => {
  console.log(`server in on 3001`);
});
