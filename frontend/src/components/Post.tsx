import React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import type { Post } from "../pages/Home";
import { useAuth } from "../contexts/AuthContext";
import { PostActions } from "./PostActions";
import { stringAvatar } from "../utils/avatarColor";

type PostType = {
  posts: Array<Post>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const Posts = ({ posts, setPosts }: PostType) => {
  const { userId } = useAuth();

  return (
    <>
      {posts.map((p) => (
        <Card key={p._id} sx={{ mb: 2, boxShadow: 2 }}>
          <CardContent>
            {/* Blog Content */}
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-wrap" }}
              gutterBottom
            >
              {p.blogContent}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 2,
                justifyContent: "space-between",
              }}
            >
              {/* Avatar and Username */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Avatar {...stringAvatar(p.author.username)} />
                <Typography variant="subtitle2">{p.author.username}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Created / Updated At */}
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component={"i"}
                  >
                    Created: {new Date(p.createdAt).toLocaleString()}
                  </Typography>
                  {p.updatedAt && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      component={"i"}
                    >
                      Updated: {new Date(p.updatedAt).toLocaleString()}
                    </Typography>
                  )}
                </Box>
                {userId === p.author._id && (
                  <PostActions
                    postId={p._id}
                    posts={posts}
                    setPosts={setPosts}
                  />
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
