require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const Note =require("./models/note.model")
const { authenticateToken } = require("./utilities");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Connessione al Database
mongoose.connect(config.connectionString)
    .then(() => console.log("✅ Connesso al Database"))
    .catch((err) => console.log("❌ Errore di connessione:", err));

// Rotta di prova
app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

// Registrazione Account
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({ error: true, message: "Full Name is required" });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exist",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
});

app.post("/login", async (req, res) =>{
    const { email, password } = req.body;

        if (!email) {
        return res.status(400).json({ message: "Email is required" });
        }

        if (!password) {
        return res.status(400).json({ message: "Password is required" });
        }

        const userInfo = await User.findOne({ email: email });
        if (!userInfo){
        return res.status(400).json({ message: "User not found" });
        }

        if (userInfo.email == email && userInfo.password ==password) {
        const user ={user:userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
        });
        return res.json({
        error: false,
        message: "Login Successful",
        email,
        accessToken,
        });
        }else{
        return res.status(400).json({
        error: true,
        message: "Invalid Credentials",
        })
    }
});

app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    // Estraiamo l'utente che è stato aggiunto dal middleware authenticateToken
    const { user } = req.user; 

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [], // Array vuoto se non ci sono tag
            userId: user._id, // Colleghiamo la nota all'ID dell'utente loggato
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        });
    } catch (error) {
        console.log(error); // Utile per fare debug se qualcosa fallisce
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});





// Avvio Server (usiamo la 8000 come nel video)
app.listen(5000, () => {
    console.log("🚀 Server in ascolto sulla porta 8000");
});

module.exports = app;