//for encryption password
const bcrypt=require('bcryptjs');
const crypto = require('crypto');

const user = require('../models/UserSchema');
const {generateToken} = require('../utils/GenerateToken');
const passwordResetToken = require('../models/PasswordResetToken');
const sanitizeUser = require('../utils/SanitizeUser');
const sendEmail = require('../utils/SendEmail');



exports.register = async (req, res) => {
    try {
        //Check if required fields are present
        if (!req.body.email || !req.body.password || !req.body.name) {
            return res.status(400).json({ message: "Missing required field" });
        }

        //check if the user exist (mongoose allow duplicate even if unick )
        const existingUser= await  user.findOne({email:req.body.email})
        if(existingUser){
            console.log("User already exist");
            return res.status(400).json({message:"Email already exists"})
        }


        // Hash the password before saving
        req.body.password = await bcrypt.hash(req.body.password, 10);

        // Try to create the user
        const newUser = await user.create(req.body);
        if(newUser){ res.status(201).json({ message: "User registered successfully" });}


    } catch (err) {
        // If error is related to duplicate email, handle it
        if (err.name==="MongoServerError" && err.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // For other errors, return a general error message
        console.log(err.code)
        res.status(500).json({ message: "Fail to create account." });
    }
};
/**
 * 200 OK: Successful login.
 * 400 Bad Request: Missing email or password.
 * 404 Not Found: User not found.
 * 401 Unauthorized: Invalid credentials.
 * */
exports.login = async (req, res) => {
    try{
        if(!req.body.password || !req.body.email){
            return res.status(400).json({ message: "Missing required fields: email and/or password" });
        }
        //check if register
        //the user return as document
        const userData = await user.findOne({email:req.body.email});
        if(!userData){
            return res.status(404).json({ message: "User not found" });
        }
        //validate the password in the body to the one hashed and stored
        const validatePassword = await bcrypt.compare(req.body.password, userData.password);
        if(!validatePassword){
            return res.status(401).json({ message: "Authentication failed"})
        }
        console.log("password valid",req.body.password);
        //generating jwt token
        const token = generateToken(sanitizeUser(userData));
        //set jwt in responds cookie
        res.cookie('token',token, {
            httpOnly: true,
            sameSite: 'Lax',
        })
        return res.status(200).json(sanitizeUser(userData))
    } catch (e) {
        console.log(e)
        return res.status(500).json({message : "Internal server error" })
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token'); // Clear the JWT cookie
    res.status(200).json({ message: 'Logged out successfully' });
}
exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const userData = await user.findById(req.user.id); // req.user is set by the `verifyToken` middleware
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Validate the current password
        const isMatch = await bcrypt.compare(currentPassword, userData.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        userData.password = await bcrypt.hash(newPassword, 10);
        await userData.save();

        res.clearCookie('token'); // Force log in
        res.status(200).json({ message: 'Password changed successfully, please log in again' });
        }  catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.changePasswordResetToken = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        // Hash and find the token
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const resetTokenRecord = await passwordResetToken.findOne({
            token: hashedToken,
            expiresAt: { $gt: Date.now() }, // Ensure the token has not expired
        });
        if (!resetTokenRecord) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Find the user associated with the token
        const userData = await user.findById(resetTokenRecord.userId);  // Fixed to use userData
        if (!userData) {  // Fixed to use userData
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password and update the user's password
        userData.password = await bcrypt.hash(newPassword, 10);  // Fixed to use userData
        await userData.save();  // Fixed to use userData

        // Delete the token record after successful password reset
        await passwordResetToken.deleteOne({ _id: resetTokenRecord._id });

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.resetPassword = async (req, res) => {
    try {
        const userData = await user.findOne({email: req.body.email});
        if (!userData) {
            return res.status(404).json({message: "User not found"});
        }
        console.log(userData._id)
        //remove the old resetpasword tokens of this user . they are unnecessary
        await passwordResetToken.deleteMany({userId:userData._id});

        // Generate a random reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        // Hash the token before storing it
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        //token expired time
        const expiresAt = Date.now() + 10 * 60 * 1000;
        console.log("u here")
        const newToken = new passwordResetToken({
            userId: userData._id,
            token: hashedToken,
            expiresAt
        })
        await newToken.save();

        //prep form mail delivery
        const resetPasswordURL = `${process.env.ORIGIN}/reset-password/confirm/${resetToken}`
        const body =
        `<h1>Password Reset</h1>
        <p>You requested to reset your password. Please click the link below to reset your password:</p>
        <p><a href="${resetPasswordURL}">Reset your password</a></p>
        <p>If you did not request this, please ignore this email.</p>`

        await sendEmail(userData.email,'Password Reset Link for Your Bank Account', body);

        res.status(200).json({
            message: "Password reset token has been sent to your email. Use it to reset your password."});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.checkAuth = async (req, res) => {
    res.status(200).json({ message: 'User is logged in' });
}