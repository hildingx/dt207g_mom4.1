/**
 * Applikation för registrering och inloggning
 */

//Importera nödvändiga moduler
const express = require("express");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

//Init express
const app = express();
const port = process.env.PORT || 3000;

//För att tolka JSON-formaterad inkommande anropskropp
app.use(express.json());

//Routes
app.use("/api", authRoutes);

//Starta applikation
app.listen(port, () => {
    console.log(`Server running att http://localhost:${port}`);
});
