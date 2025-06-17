import React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Post } from "../pages/Home";
import { useAuth } from "../contexts/AuthContext";
import { PostActions } from "./PostActions";
import { stringAvatar } from "../utils/avatarColor";
import { formatDate } from "../utils/formatDate";

interface Props {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export const Posts: React.FC<Props> = ({ posts, setPosts }) => {
  const { userId } = useAuth();

  return (
    <>
      {posts.map((p) => (
        <Card key={p._id} sx={{ mb: 2, boxShadow: 2 }}>
          <CardContent>
            {/* clickable blog title */}
            <Typography
              variant="h6"
              gutterBottom
              to={`/post/${p._id}`}
              component={RouterLink}
              sx={{
                textDecoration: "none",
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {p.blogTitle}
            </Typography>

            {/* clamped blog content (7–8 lines) */}
            <Typography
              variant="body1"
              marginTop={1}
              sx={{
                whiteSpace: "pre-wrap",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 8, // ≤ 8 lines, then "…"
              }}
              gutterBottom
            >
              {p.blogContent}
            </Typography>

            {/* footer: author + dates + actions */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 2,
                justifyContent: "space-between",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                component={RouterLink}
                to={`/profile/${p?.author?._id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "none",
                    color: "inherit",
                  },
                }}
              >
                <Avatar {...stringAvatar(p.author.username)} />
                <Typography variant="subtitle2">{p.author.username}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ textAlign: "right", mr: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Created: {formatDate(p.createdAt)}
                  </Typography>
                </Box>

                {userId === p.author._id && (
                  <PostActions postId={p._id} setPosts={setPosts} />
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
