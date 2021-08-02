const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_LOCAL_CONN_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to mongo.");
  })
  .catch((err) => {
    console.log("Error connecting to mongo.", err);
  });
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", require("./api/router/router.js"));

app.listen(3002, () => {
  console.log(`server in on 3002`);
});
