import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

/*  Augment global Express namespace  */
declare global {
  namespace Express {
    interface Request {
      /** id of the authenticated user (added by auth middleware) */
      userId?: ObjectId;
    }
  }
}

export const authenticate: RequestHandler = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing token" });
    return;
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    req.userId = new ObjectId(decoded.id);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
