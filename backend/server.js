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

// --- CORS CONFIGURATION (FIXED FOR VERCEL) ---
app.use(cors({
    origin: '*', // Allow all origins for testing/production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Middlewares
app.use(express.json());

// --- 1. USER INLINE SCHEMA & MODEL DEFINITION ---
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Prevent model overwrite error in Vercel hot reloads
const User = mongoose.models.User || mongoose.model('User', userSchema);

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

// Export app for Vercel Serverless Function
module.exports = app;

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}