import express, { RequestHandler } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";
import { mountSwagger } from "./swagger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const health: RequestHandler = (_req, res) => {
  res.json({ status: "ok" });
};

app.get("/api/health", health);

/* routers */
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// 📜 swagger
mountSwagger(app);

export default app;
