import { NextFunction, RequestHandler, Request, Response } from "express";
import * as postSvc from "../services/post.service";
import { getDB, ObjectId } from "../db";
import { User } from "../types/User";
import { AuthRequest, Post } from "../types/Post";
import { findUserById } from "../services/user.service";

type PostWithAuthor = Post & { author: User };

/* POST /api/posts  (auth) */
export const create: RequestHandler = async (req: AuthRequest, res) => {
  const blogContent = req.body.blogContent;
  if (!blogContent) {
    res.status(400).json({ error: "Blog content required" });
    return;
  }

  const post = await postSvc.create({
    authorId: req.userId!,
    blogContent,
  } as any);

  res.status(200).json({
    message: "Post created successfully",
    data: post,
  });
};

/* PUT /api/posts/:id  (auth) */
export const update: RequestHandler = async (req: AuthRequest, res) => {
  const id = new ObjectId(req.params.id);
  const blogContent = req.body.blogContent;

  const post = await postSvc.update(id, req?.userId!, blogContent);
  if (!post) {
    res.status(404).json({ error: "Not found or not owner" });
    return;
  }
  res.status(200).json({
    message: "Post updated successfully",
    data: post,
  });
};

export const deletePostById: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id.trim();

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid post id" });
      return;
    }

    const db = await getDB();
    const { deletedCount } = await db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

/* GET /api/posts/:id  */
export const get: RequestHandler = async (req, res) => {
  const post = await postSvc.findById(new ObjectId(req.params.id));
  if (!post) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.status(200).json({
    message: "Successfully fetched the post",
    data: post,
  });
};

/* GET /api/posts/user/:userId */
export const getPostsByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    // validate the id before touching the DB
    if (!ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid userId" } as any);
    }

    const user = await findUserById(new ObjectId(userId));
    const posts = await postSvc.postsByUser(new ObjectId(userId));

    res.status(200).json({
      message: "Successfully fetched the posts created by user",
      data: { posts, user },
    });
  } catch (err) {
    next(err);
  }
};

/* GET /api/posts/ */
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = await getDB();

    const posts = (await db
      .collection("posts")
      .aggregate<PostWithAuthor>([
        { $sort: { createdAt: -1 } },

        // -- look up the matching user
        {
          $lookup: {
            from: "users",
            localField: "authorId", // ObjectId stored in each post
            foreignField: "_id", // _id field in users collection
            as: "authorDetails",
          },
        },
        { $unwind: "$authorDetails" },

        // -- tidy up the shape the frontend expects
        {
          $project: {
            _id: 1,
            blogContent: 1,
            createdAt: 1,
            updatedAt: 1,

            author: {
              _id: "$authorDetails._id",
              name: "$authorDetails.name",
              username: "$authorDetails.username",
            },
          },
        },
      ])
      .toArray()) as PostWithAuthor[];

    res.status(200).json({
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};
