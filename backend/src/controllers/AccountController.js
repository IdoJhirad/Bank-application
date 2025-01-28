const UserModel = require(`../models/UserSchema`);
const TransactionModel = require(`../models/TransactionModel`);
const sanitizeUser = require('../utils/SanitizeUser');

exports.getBalance = async (req, res) => {
    try{
        //console.log(req);
        const userID = req.user._id;
        const user = await UserModel.findById(userID);
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json({balance:user.balance});
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
}
exports.getTransactionHistory = async (req, res) => {
    try{
        const userID = req.user._id;
        const transaction = await TransactionModel.find({
            $or:[{sender:userID},{receiver:userID}]
        }).sort({timestamp:-1});
        console.log("find the transaction ",transaction);
        res.status(200).json({transaction});
    } catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.getAccountInfo = async (req, res) => {
    try {
        const userID = req.user._id;
        const user = await UserModel.findById(userID);
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        const userToReturn = sanitizeUser(user)
        res.status(200).json(userToReturn);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' });
    }



}
exports.changeAccountInfo = async (req, res) => {
    //TODO
}
