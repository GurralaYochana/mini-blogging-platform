import { Router } from "express";
import * as postCtrl from "../controllers/post.controller";
import { authenticate } from "../middlewares/auth";

const router = Router();
router.post("/", authenticate, postCtrl.create);
router.put("/:id", authenticate, postCtrl.update);
router.get("/:id", authenticate, postCtrl.get);
router.delete("/:id", authenticate, postCtrl.deletePostById);
router.get("/user/:userId", authenticate, postCtrl.getPostsByUser);
router.get("/", authenticate, postCtrl.getPosts);

export default router;
