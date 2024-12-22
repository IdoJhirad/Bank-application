const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

const verifyToken = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        //didnt find token user isn't log in
        if(!token){
            return res.status(401).json({message:"Token missing, please login again"});
        }
        // verifies the token
        const decodedInfo = jwt.verify(token, process.env.SECRET_KEY);
        // checks if decoded info contains legit details, then set that info in req.user and calls next
        //console.log(decodedInfo);
        if(decodedInfo && decodedInfo._id){
            req.user = await User.findOne({_id: decodedInfo._id});
            next();
        } else {
            console.log("Invalid Token, please login again");
            return res.status(401).json({message:"Invalid Token, please login again"});
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.log(error);
            return res.status(401).json({ message: "Token expired, please login again" });
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            console.log(error)
            return res.status(401).json({ message: "Invalid Token, please login again" });
        }
        else {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
module.exports = verifyToken;