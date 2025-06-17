import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Avatar,
  Card,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getPost } from "../api/post";
import { useAuth } from "../contexts/AuthContext";
import { PostActions } from "../components/PostActions";
import { stringAvatar } from "../utils/avatarColor";
import { formatDate } from "../utils/formatDate";
import { PostDetailsSkeleton } from "../components/Skeletons/PostDetailsSkeleton";

export default function PostDetails() {
  const { id } = useParams();
  const { userId } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getPost(id)
        .then((res) => {
          setPost(res.data.data);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <PostDetailsSkeleton />;
  }

  if (!post) return <Typography>Post not found.</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card
        sx={{
          p: 4,
          borderRadius: 2,
          mb: 3,
        }}
      >
        <Typography variant="h3" fontWeight={700} gutterBottom>
          {post.blogTitle}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            component={RouterLink}
            to={`/profile/${post.authorId}`}
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
            <Avatar {...stringAvatar(post.author.username)} />
            <Typography variant="subtitle2">{post.author.username}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ textAlign: "right", mr: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Created: {formatDate(post.createdAt)}
              </Typography>
            </Box>

            {userId === post?.author?._id && <PostActions postId={post?._id} />}
          </Box>
        </Box>
      </Card>
      <Divider sx={{ mb: 3 }} />

      {/* 📄 Full Blog Content */}
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
        {post.blogContent}
      </Typography>
    </Container>
  );
}
