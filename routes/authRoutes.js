/**
 * Rutter för autentisering
 */

const express = require("express");
const router = express.Router();


//Lägg till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input !! VIDAREUTVECKLA (ex fem tecken långt osv)
        //Tydligare felmeddelanden vilket av inputen som är fel username / pw
        if(!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password"});
        }

        //Rätt angivet - spara användare
        res.status(201).json({ message: "User created" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//Login användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input !! 
        if(!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password"});
        }

        //Kontrollera credentials
        if(username === "alex" && password === "password") {
            res.status(200).json({ message: "Login successful"});
        } else {
            res.status(401).json({ error: "Invalid username/password"});
        }
    } catch(error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;