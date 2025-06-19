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

type FormValues = { blogTitle: string; blogContent: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialBlogDetails: FormValues = { blogTitle: "", blogContent: "" };
const initialErrs: FormErrors = {};

export default function CreateNEditPost({ edit = false }: { edit?: boolean }) {
  const { id } = useParams();
  const nav = useNavigate();
  const { setSuccessMsg, setErrorMsg } = useAuth();
  const [blogDetails, setBlogDetails] = useState(initialBlogDetails);
  const [loading, setLoad] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialErrs);

  useEffect(() => {
    if (id && edit) {
      setLoad(true);
      getPost(id)
        .then((res) => {
          const { blogTitle, blogContent } = res.data.data;
          setBlogDetails({ blogTitle, blogContent });
        })
        .finally(() => setLoad(false));
    }
  }, [id]);

  const validateField = (name: keyof FormValues, value: string): string => {
    switch (name) {
      case "blogTitle":
        if (!value.trim()) return "Blog title is required";
        break;
      case "blogContent":
        if (!value.trim()) return "Blog Content is required";
        break;
    }
    return "";
  };

  const validateAll = (): FormErrors => {
    const result: FormErrors = {};
    (Object.keys(blogDetails) as (keyof FormValues)[]).forEach((k) => {
      const err = validateField(k, blogDetails[k]);
      if (err) result[k] = err;
    });
    return result;
  };

  const handle =
    (k: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      // update value
      setBlogDetails((p) => ({ ...p, [k]: val }));
      // live‑validate this field
      setErrors((p) => ({ ...p, [k]: validateField(k, val) }));
    };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateAll();
    setErrors(errs);
    if (Object.keys(errs).length) return; // prevent submit

    if (edit && id) {
      try {
        await updatePost(id, blogDetails);
        setSuccessMsg("Post updated successfully!");
        setTimeout(() => nav(-1), 800);
      } catch (err) {
        setErrorMsg("Error while updating post");
        console.error(err);
      }
    } else {
      try {
        await createPost(blogDetails);
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
        <Box component="form" onSubmit={submit} sx={{ mt: 2, width: "100%" }}>
          <TextField
            label={"Blog title"}
            value={blogDetails.blogTitle}
            onChange={handle("blogTitle")}
            fullWidth
            error={!!errors.blogTitle}
            helperText={errors.blogTitle}
            required
          />
          <TextField
            label={"What's happening?"}
            value={blogDetails.blogContent}
            onChange={handle("blogContent")}
            multiline
            rows={4}
            fullWidth
            error={!!errors.blogContent}
            helperText={errors.blogContent}
            required
            sx={{ mt: 2 }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {edit ? "Save" : "Publish Post"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
