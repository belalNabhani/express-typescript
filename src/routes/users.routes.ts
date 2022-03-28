import { Router } from "express";
import {
  findAll,
  findById,
  findByName,
  init,
} from "../controllers/user.controller";
import authorize from "../middleware/authorize.middleware";

const router = Router();

router.get("/", authorize, findAll);
router.get("/init", authorize, init);
router.get("/id/:id", authorize, findById);
router.get("/name/:name", authorize, findByName);

export default router;
