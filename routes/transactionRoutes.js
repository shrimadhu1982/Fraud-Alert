const express = require("express");
const { v4: uuidv4 } = require("uuid");

const users = require("../models/users");
const transactions = require("../models/transactions");
const alerts = require("../models/alerts");

const checkFraud = require("../utils/fraudDetection");

const router = express.Router();

router.post("/", (req, res) => {

    const io = req.app.get("io");

    const { user_id, amount, location } = req.body;

    // Validate user
    const user = users.find(u => u.user_id === user_id);

    if (!user) {
        return res.status(404).json({
            message: "Invalid user_id"
        });
    }

    const newTransaction = {
        txn_id: uuidv4(),
        user_id,
        amount,
        location,
        timestamp: new Date()
    };

    transactions.push(newTransaction);

    // Fraud Detection
    const fraudMessage = checkFraud(
        user_id,
        amount,
        location
    );

    if (fraudMessage) {

        const alert = {
            alert_id: uuidv4(),
            txn_id: newTransaction.txn_id,
            message: fraudMessage
        };

        alerts.push(alert);

        // Emit to user room
        io.to(user_id).emit("fraud_alert", {
            txn_id: newTransaction.txn_id,
            message: fraudMessage,
            amount,
            location
        });

        return res.status(201).json({
            transaction: newTransaction,
            fraud: true,
            alert
        });
    }

    res.status(201).json({
        transaction: newTransaction,
        fraud: false
    });
});

module.exports = router;