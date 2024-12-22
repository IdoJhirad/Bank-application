/**
 * defines routes for user authentication-related operations.*/
const express = require("express");
const authController = require("../controllers/AuthController");
const verifyToken=require("../middleware/VerifyToken");
// router instance that define routes as middleware handlers for different HTTP requests.
const router = express.Router();
router
    .post("/register",authController.register)
    .post("/login", authController.login)
    .post("/logout", authController.logout)
    .post("/reset-password", authController.resetPassword)
    .post("/change-password", verifyToken ,authController.changePassword)
    .post("/reset-password/confirm", authController.changePasswordResetToken)
    .get("/check-auth", verifyToken, authController.checkAuth);
module.exports = router;