let express = require("express");
let router = express.Router();

const controller = require("./controller");
const deletecontroller = require("./deletecontroller");
const upadtecontroller = require("./updatecontroller");

router.post("/create", controller.create);
router.post("/create2", controller.create2);
router.delete("/delete/:id", deletecontroller.delete);
router.put("/update/:id", upadtecontroller.update);
router.get("/all",controller.all);
module.exports = router;
