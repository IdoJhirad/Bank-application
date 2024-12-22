const UserModel = require(`../models/UserSchema`);
const TransactionModel = require(`../models/TransactionModel`);
const sanitizeUser = require('../utils/SanitizeUser');
const mongoose = require("mongoose");
exports.deposit = async (req, res) => {
    try {
        const userId = req.user._id;
        let amount = req.body.amount;

        amount = parseFloat(amount);
        if(isNaN(amount) || amount <= 0 ) {
            return res.status(400).json({ message: 'Amount must be greater than zero.' });
        }
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(400).json({ message: 'User does not exist' });
        }
        user.balance += amount;
        await user.save();
        //record the transaction
        await TransactionModel.create ({
            sender: userId,
            receiver: userId,
            senderName: user.name,
            receiverName: user.name,
            amount : amount,
            type: "Deposit"
        })
        res.status(200).json({ message: 'Deposit successfully created!' ,balance: user.balance});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
}
exports.withdrawal = async (req, res) => {
    try {
        const userId = req.user._id;
        let amount = req.body.amount;

        amount = parseFloat(amount);
        if(isNaN(amount) || amount <= 0 ) {
            return res.status(400).json({ message: 'Amount must be greater than zero.' });
        }
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(400).json({ message: 'User does not exist' });
        }
        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance.' });
        }

        user.balance -= amount;
        await user.save();
        //record the transaction
        await TransactionModel.create ({
            sender: userId,
            receiver: userId,
            senderName: user.name,
            receiverName: user.name,
            amount : amount,
            type: "Withdrawal"
        })
        res.status(200).json({ message: 'Withdrawal successfully created!' ,balance: user.balance});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
}
exports.transfer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const senderID = req.user._id;
        const senderEmail = req.user.email;
        let { receiverEmail , amount} = req.body;
        amount = parseFloat(amount);

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero.' });
        }

        if (senderEmail === receiverEmail) {
            return res.status(400).json({ message: 'Cannot transfer money to your bank account' });
        }

        const sender = await UserModel.findById(senderID).session(session);
        if(!sender){
            return res.status(404).json({ message: 'Sender not found.' });
        }
        if(sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance.' });
        }
        const receiver =await UserModel.findOne({email: receiverEmail}).session(session);
        if(!receiver){
            return res.status(404).json({ message: 'Receiver not found.' });
        }
        sender.balance -= amount;
        receiver.balance += amount;
        await sender.save({ session });
        await receiver.save({ session });

        await TransactionModel.create({
            sender: senderID,
            receiver: receiver._id,
            senderName: sender.name,
            receiverName: receiver.name,
            amount : amount,
            type : "Transfer"
        },{session});
        // commit the transaction
        await session.commitTransaction();
        await session.endSession();
        res.status(200).json({ message: 'Transfer successful.', balance: sender.balance });

    } catch (error) {
        // Abort transaction in case of error
        await session.abortTransaction();
        await session.endSession();
        console.error(error);
        res.status(500).json({ message: error.message });
    }

}