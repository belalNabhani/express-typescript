import { Router } from "express";
import {
  create,
  findAll,
  findById,
  init,
} from "../controllers/posts.controller";
import authorize from "../middleware/authorize.middleware";
import validate from "../middleware/validate.middleware";
import { createPostSchema } from "../validations/createPost";

const router = Router();

router.get("/", authorize, findAll);
router.get("/init", authorize, init);
router.get("/id/:id", authorize, findById);
router.post("/", authorize, validate(createPostSchema), create);

export default router;
