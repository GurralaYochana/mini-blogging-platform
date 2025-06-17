import { ObjectId } from "mongodb";
import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: ObjectId;
}

export interface Post {
  _id: ObjectId;
  blogTitle: string;
  blogContent: string;
  author: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
