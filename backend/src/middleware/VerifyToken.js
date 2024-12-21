const jwt = require('jsonwebtoken');

const verifyToken = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        //didnt find token user isn't log in
        if(!token){
            return res.status(401).json({message:"Token missing, please login again"});
        }
        // verifies the token
        const decodedInfo = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        // checks if decoded info contains legit details, then set that info in req.user and calls next
        if(decodedInfo && decodedInfo.email){
            req.user = await User.findOne({email: decodedInfo.email});
            next();
        } else {
            return res.status(401).json({message:"Invalid Token, please login again"});
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired, please login again" });
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid Token, please login again" });
        }
        else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
module.exports = verifyToken;