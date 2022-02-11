const express = require("express");
const router = express.Router();
const { signUp, showUser, loginUser, deleteUser } = require("../contollers/user");
 
router.post("/signup", signUp);

router.get("/:userId", showUser)

router.post("/login", loginUser)

router.delete("/:userId", deleteUser)

module.exports = router;
