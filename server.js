/**
 * Applikation för registrering och inloggning
 */

//Importera nödvändiga moduler
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
const cors = require('cors');
require("dotenv").config();

//Användarmodell
const User = require("./models/user.js");

//Init express
const app = express();
const port = process.env.PORT || 3000;

//Aktivera CORS för alla domäner
app.use(cors());

//För att tolka JSON-formaterad inkommande anropskropp
app.use(express.json());

//Routes
app.use("/api", authRoutes);

//Skyddad routes
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route. " });
});

//Middleware för att validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: "Not authorized for this route. Token missing. "});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) return res.status(403).json({ message: "Invalid JWT. "});

        //Om token giltig, extrahera användarnamnet från den dekrypterade tokenen
        req.username = decodedToken.username; // Spara användarnamnet från decodedToken
        next();
    });
}

//Rouite för att hämta användardata
app.get("/api/userdata", authenticateToken, async (req, res) => {
    try {
        //Hämta användardata från databasen baserat på inloggad användares användarnamn
        const user = await User.findOne({ username: req.username });

        if (!user) {
            return res.status(404).json({ error: "Användare hittades inte." });
        }

        //Skicka tillbaka användardata som svar
        res.json({
            firstname: user.firstname,
            lastname: user.lastname
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Serverfel vid hämtning av användardata." });
    }
});

//Starta applikation
app.listen(port, () => {
    console.log(`Server running on MongoDB at collection ${process.env.MONGO_URI.split('/').pop()}`);
});