/**
 * defines routes for user authentication-related operations.*/
const express = require("express");
const authController = require("../controllers/AuthController");
// router instance that define routes as middleware handlers for different HTTP requests.
const router = express.Router();

router.post("/register",authController.register)


module.exports = router;