import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Typography,
  Container,
  Skeleton,
  Stack,
  Box,
  Avatar,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Posts } from "../components/Post";

export type Author = {
  _id: string;
  username: string;
  email: string;
};

export interface Post {
  _id: string;
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
    axios
      .get("/posts")
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Latest Posts
      </Typography>

      {loading && (
        <Stack spacing={2}>
          {[...Array(3)].map((_, i) => (
            <>
              <Skeleton key={i} variant="rectangular" height={70} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ margin: 1 }}>
                  <Skeleton key={i} variant="circular" height={50}>
                    <Avatar></Avatar>
                  </Skeleton>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Skeleton key={i} width={"100%"}>
                    <Typography>.</Typography>
                  </Skeleton>
                </Box>
              </Box>
            </>
          ))}
        </Stack>
      )}
      {posts.length === 0 ? (
        <Typography>
          You haven’t written any posts yet. Start sharing your thoughts!
        </Typography>
      ) : (
        <Posts posts={posts} setPosts={setPosts} />
      )}
      {!loading && (
        <>
          {posts.length === 0 ? (
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
