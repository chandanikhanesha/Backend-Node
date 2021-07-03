const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/login-api", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect success");
  })
  .catch(() => {
    console.log("not connect");
  });
