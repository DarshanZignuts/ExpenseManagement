const express = require("express");
const router = express.Router();
const authorise = require("../middleware/check_auth");
const { getAllTransaction, getAddTransaction, addTransaction, getUpdateTransaction, updateTransaction, deleteTransaction } = require("../contollers/transaction");


router.get("/id/:accountId", authorise, getAllTransaction);

router.get("/addTransaction/id/:accountId",authorise, getAddTransaction);

router.post("/addTransaction/id/:accountId", authorise, addTransaction);

router.get("/updateTransaction", authorise, getUpdateTransaction);

router.patch("/updateTransaction", authorise, updateTransaction);

router.delete("/deleteTransaction", authorise , deleteTransaction);

module.exports = router;