const express = require("express");
const { v4: uuidv4 } = require("uuid");

const users = require("../models/users");

const router = express.Router();

router.post("/", (req, res) => {

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    const newUser = {
        user_id: uuidv4(),
        name
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

module.exports = router;