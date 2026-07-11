import express from 'express';
import './config/env.js';
import { dbConnect } from './config/db.js';
import authRoute from './routes/authRoute.js';
import cookieParser from "cookie-parser";
import passport from './config/passport.js';
import sessionRoute from './routes/sessionRoute.js';
import profileRoute from './routes/profileRoute.js';
import cors from 'cors';

const app = express();
const port = process.env.APP_PORT || 5000;

// 🚀 1. CORS Configuration (Strictly Added Credentials Clearance)
app.use(cors({
    origin: "http://localhost:5173", // 👈 Aapke frontend ka exact port URL (Check kar lein agar 3000 hai ya 5173)
    credentials: true // 👈 Yeh browser ko cookie transmission explicitly allow karta hai
}));

// 🚀 2. Middlewares Standard Sequencing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // 👈 Routes aur sessions se pehle safe place par set kiya
app.use(passport.initialize());

// Database Connection
dbConnect();

// API Routing Table
app.use('/api/auth', authRoute);
app.use('/api/session', sessionRoute);
app.use('/api/profile', profileRoute);

// Base Route
app.get('/', (req, res) => {
    res.send("Reel Forge Backend is running successfully!");
});

// Server Initialization
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;