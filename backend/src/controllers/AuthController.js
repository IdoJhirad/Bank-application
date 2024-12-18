//for encryption password
const bcrypt=require('bcryptjs');
const userSchema = require('../models/UserSchema');

exports.register = async (req, res) => {
    try {
        //construct a salt for password and hash
        //save the pass int user request body
        req.body.password = await bcrypt.hash(req.body.password, 10);


        userSchema.create(req.body).then((account) => {
            if(!account){
                 res.status(500).json({message: "Fail to create account"});
            }
               res.status(201).json({message:"User registered successfully."})
        }).catch((err) => {
            res.status(500).json({message:"Something went wrong"});
        })



    } catch (e) {
        if(e.name === "MongoServerError" && e.code == 11000){
            console.log("its duplicate");
        }
        console.log("hara alica")
          res.status(500).json({"message":"Invalid input"})
    }
}