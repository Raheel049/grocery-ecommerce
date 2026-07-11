import express from 'express'
import { getProfile, updateProfile } from '../controllers/profile/profile.js';
import { authMiddleware } from '../middleware/middleware.js';

const profileRoute = express.Router();

profileRoute.get("/get-profile",authMiddleware, getProfile);

profileRoute.patch("/update-profile",authMiddleware, updateProfile);

export default profileRoute