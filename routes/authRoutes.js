/**
 * Rutter för autentisering
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Ansluta till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Ansluten till MongoDB Atlas"))
.catch(err => console.error("Kunde inte ansluta till MongoDB", err));

//Användarmodell
const User = require("../models/user.js");

//Lägg till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password, firstname, lastname } = req.body;
        
        //Validera input och ge specifika felmeddelanden
        if (!username) {
            return res.status(400).json({ error: "Username is required." });
        }
        if (!password) {
            return res.status(400).json({ error: "Password is required." });
        }
        if (!firstname) {
            return res.status(400).json({ error: "First name is required." });
        }
        if (!lastname) {
            return res.status(400).json({ error: "Last name is required." });
        }

        //Rätt angivet - spara användare
        const user = new User({ username, password, firstname, lastname });
        await user.save();
        res.status(201).json({ message: "User created successfully." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to register user due to an internal server error." });
    }
});

//Login användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Both username and password are required to log in." });
        }

        //Användarverifiering
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid login credentials provided." });
        } else {
            //Skapa JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});
            //Skicka med token
            const response = {
                message: "User logged in",
                token: token
            }
            res.status(200).json({ message: response });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during login." });
    }
});

module.exports = router;