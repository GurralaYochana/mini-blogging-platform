import { useEffect, useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Posts } from "../components/Post";
import { PostsSkeleton } from "../components/Skeletons/PostsSkeleton";
import { getPostsList } from "../api/post";

export type Author = {
  _id: string;
  username: string;
  email: string;
};

export interface Post {
  _id: string;
  blogTitle: string;
  blogContent: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export default function Home() {
  const { token, setErrorMsg } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    if (token)
      getPostsList()
        .then((res) => setPosts(res.data.data))
        .catch(() => setErrorMsg("Error while fetching Posts"))
        .finally(() => setLoad(false));
  }, []);

  if (!token) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Please login to explore more in MiniBlog.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom data-testid="posts-title">
        Latest Posts
      </Typography>

      {loading && <PostsSkeleton />}

      {!loading && (
        <>
          {posts?.length === 0 ? (
            <Typography>
              You haven’t written any posts yet. Start sharing your thoughts!
            </Typography>
          ) : (
            <Posts posts={posts} setPosts={setPosts} />
          )}
        </>
      )}
    </Container>
  );
}
