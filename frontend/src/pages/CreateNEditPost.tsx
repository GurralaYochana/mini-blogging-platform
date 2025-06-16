import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { createPost, getPost, updatePost } from "../api/post";
import { useAuth } from "../contexts/AuthContext";

export default function CreateNEditPost({ edit = false }: { edit?: boolean }) {
  const { id } = useParams();
  const nav = useNavigate();
  const { setSuccessMsg, setErrorMsg } = useAuth();
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoad] = useState(false);

  useEffect(() => {
    if (id && edit) {
      setLoad(true);
      getPost(id)
        .then((res) => setBlogContent(res.data.data?.blogContent))
        .finally(() => setLoad(false));
    }
  }, [id]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (edit && id) {
      try {
        await updatePost(id, blogContent);
        setSuccessMsg("Post updated successfully!");
        setTimeout(() => nav("/"), 800);
      } catch (err) {
        setErrorMsg("Error while updating post");
        console.error(err);
      }
    } else {
      try {
        await createPost(blogContent);
        setSuccessMsg("Post created successfully!");
        setTimeout(() => nav("/"), 800);
      } catch (err) {
        setErrorMsg("Error while creating post");
        console.error(err);
      }
    }
  }

  if (loading)
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {edit ? "Edit Post" : "New Post"}
        </Typography>
        <Box component="form" onSubmit={submit}>
          <TextField
            label={edit ? "Edit your post" : "What's happening?"}
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            multiline
            rows={4}
            fullWidth
            required
            error={!blogContent}
            helperText={"Blog content is required"}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {edit ? "Save" : "Publish Post"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
