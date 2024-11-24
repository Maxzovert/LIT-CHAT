import express from "express";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/users", protectRoute , getUserForSidebar );
router.get("/:id" , protectRoute , getMessages);

export default router