const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- 1. USER INLINE SCHEMA & MODEL DEFINITION ---
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true } // Password integrated here
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// --- 2. BASE ROUTE ---
app.get('/', (req, res) => {
    res.send('SkillBridge Backend Server is Running Smoothly with DB!');
});

// --- 3. REGISTRATION API ENDPOINT ---
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered!" });
        }

        // Create new user instance
        const newUser = new User({ name, email, phone, password });
        await newUser.save();

        res.status(201).json({ 
            success: true, 
            message: "User registered successfully!", 
            user: { name: newUser.name, email: newUser.email } 
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "Server error during registration." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});