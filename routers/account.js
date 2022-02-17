const express = require("express");
const router = express.Router();
const authorise = require("../middleware/check_auth");

const { getAllAccount, getAddAccount, addAccount, getUpdateAccount, updateAccount, deleteAccount } = require("../contollers/account");

router.get("/", authorise, getAllAccount);

router.get("/addAccount", authorise, getAddAccount);

router.post("/addAccount", authorise, addAccount);

router.get("/updateAccount/:id", authorise, getUpdateAccount);

router.post("/updateAccount", authorise, updateAccount);

router.get("/deleteAccount/:id", authorise , deleteAccount)

module.exports = router;