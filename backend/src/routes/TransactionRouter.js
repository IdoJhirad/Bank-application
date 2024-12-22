const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/VerifyToken');
const transactionController = require('../controllers/TransactionController');


router.use(verifyToken);
router
    .post("/transfer",transactionController.transfer)
    .post("/deposit",transactionController.deposit)
    .post("/withdraw",transactionController.withdrawal);

module.exports = router;