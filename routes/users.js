var express = require("express");
var router = express.Router();
let db = require("../db/queries");

/* GET users listing. */
router.get("/", db.getAllUsers);

router.get("/:id", db.getSingleUser);

router.post("/", db.addNewUser);

router.patch("/:id", db.updateUser);

router.delete("/:id", db.deleteUser);

module.exports = router;
