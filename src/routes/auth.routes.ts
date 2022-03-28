import { Router } from "express";
import { findByEmail } from "../controllers/user.controller";
const router = Router();

router.post("/login", findByEmail);

export default router;
