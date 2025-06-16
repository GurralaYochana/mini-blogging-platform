import { Router } from "express";
import { getUsers, getUserDetailsById } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth";

const r = Router();

r.get("/", authenticate, getUsers); // GET /api/users
r.get("/:id", authenticate, getUserDetailsById); // GET /api/users/:id

export default r;
