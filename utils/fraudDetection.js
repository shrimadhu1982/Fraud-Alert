const transactions = require("../models/transactions");

const checkFraud = (user_id, amount, location) => {

    let message = "";

    // Rule 1
    if (amount > 50000) {
        message = "High value transaction detected";
    }

    // Get last transaction of user
    const userTransactions = transactions.filter(
        txn => txn.user_id === user_id
    );

    if (userTransactions.length > 0) {

        const lastTxn = userTransactions[userTransactions.length - 1];

        // Rule 2
        if (lastTxn.location !== location) {
            message = "Transaction from different location detected";
        }
    }

    return message;
};

module.exports = checkFraud;