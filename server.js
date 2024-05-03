/**
 * Applikation för registrering och inloggning
 */

//Importera nödvändiga moduler
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
const cors = require('cors');
require("dotenv").config();

//Init express
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

//För att tolka JSON-formaterad inkommande anropskropp
app.use(express.json());

//Routes
app.use("/api", authRoutes);

//Skyddad routes
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route. " });
});

//Validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) res.status(401).json({ message: "Not authorized for this route. Token missing. "});
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Invalid JWT. "});

        req.username = username;
        next();
    });
}

//Starta applikation
app.listen(port, () => {
    console.log(`Server running on MongoDB at collection ${process.env.MONGO_URI.split('/').pop()}`);
});