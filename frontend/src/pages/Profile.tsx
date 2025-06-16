import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Container,
  Skeleton,
  Stack,
  Box,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { listUserPosts } from "../api/post";
import type { Author, Post } from "./Home";
import { Posts } from "../components/Post";
import { stringAvatar } from "../utils/avatarColor";

const initialStateUser = {
  _id: "",
  username: "",
  email: "",
};

export default function Profile() {
  const { userId } = useParams();
  const { userId: loginUserId } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<Author>(initialStateUser);
  const [loading, setLoad] = useState(true);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (userId ?? loginUserId)
      listUserPosts(userId ?? loginUserId)
        .then((res) => {
          setPosts(res.data.data.posts);
          setUser(res.data.data.user);
        })
        .finally(() => setLoad(false));
  }, [userId, loginUserId]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* --- header section (always visible) --- */}
      {!loading && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: "1rem" }}>
          <Avatar {...stringAvatar(user.username)} />
          <Box>
            <Typography variant="h5">{user.username}</Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              component={"i"}
            >
              {user.email}
            </Typography>
          </Box>
        </Box>
      )}

      {loading && (
        <Stack spacing={2}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={100} />
          ))}
        </Stack>
      )}

      <Tabs
        value={tab}
        onChange={(_e, v) => setTab(v)}
        aria-label="user tabs"
        sx={{ mb: 3 }}
      >
        <Tab label="Posts" />
      </Tabs>

      {tab === 0 && (
        <Box>
          {posts === null ? (
            <CircularProgress />
          ) : posts.length === 0 ? (
            <Typography>
              You haven’t written any posts yet. Start sharing your thoughts!
            </Typography>
          ) : (
            <Posts posts={posts} setPosts={setPosts} />
          )}
        </Box>
      )}
    </Container>
  );
}
