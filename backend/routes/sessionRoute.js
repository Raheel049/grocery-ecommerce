import express from "express"
import { getAllSession, logoutAllDevice, logoutDevice } from "../controllers/sessionController.js"
import { authMiddleware } from "../middleware/middleware.js"

const sessionRoute = express.Router()

sessionRoute.get("/get-all-session",authMiddleware, getAllSession);

sessionRoute.delete("/logout-device/:id",authMiddleware, logoutDevice);

sessionRoute.delete("/logout-all-device", logoutAllDevice);

export default sessionRoute