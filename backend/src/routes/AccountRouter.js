const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/VerifyToken');
const accountControllers = require('../controllers/AccountController');

router.use(verifyToken);
router
    .get("/balance", accountControllers.getBalance)
    .get("/transactions", accountControllers.getTransactionHistory)
    .get("/info", accountControllers.getAccountInfo)
    .put("/info", accountControllers.changeAccountInfo);

module.exports = router;