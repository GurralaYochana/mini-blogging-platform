import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type FormValues = { email: string; password: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const initialVals: FormValues = { email: "", password: "" };
const initialErrs: FormErrors = {};

export default function Login() {
  const nav = useNavigate();
  const { setToken, setSuccessMsg, setErrorMsg } = useAuth();

  const [values, setVals] = useState<FormValues>(initialVals);
  const [errors, setErrors] = useState<FormErrors>(initialErrs);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const validateField = (name: keyof FormValues, value: string): string => {
    switch (name) {
      case "email":
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value)) return "Enter a valid email";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        break;
    }
    return "";
  };

  const validateAll = (): FormErrors => {
    const result: FormErrors = {};
    (Object.keys(values) as (keyof FormValues)[]).forEach((k) => {
      const err = validateField(k, values[k]);
      if (err) result[k] = err;
    });
    return result;
  };

  const handle =
    (k: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      // update value
      setVals((p) => ({ ...p, [k]: val }));
      // live‑validate this field
      setErrors((p) => ({ ...p, [k]: validateField(k, val) }));
    };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateAll();
    setErrors(errs);
    if (Object.keys(errs).length) return; // prevent submit

    try {
      setLoading(true);
      const res = await login(values);
      setToken(res.data.data?.token);
      setSuccessMsg("Welcome back!");
      setTimeout(() => nav("/"), 800);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const disableSubmitBtn =
    loading ||
    (Object.keys(errors).length > 0 &&
      Object.values(errors).some(
        (v) => v !== undefined && v !== null && v !== ""
      ));

  return (
    <Container maxWidth="xs">
      <Paper sx={{ p: 3, mt: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Login</Typography>

          <Box
            component="form"
            noValidate
            onSubmit={submit}
            sx={{ mt: 2, width: "100%" }}
          >
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={values.email}
              onChange={handle("email")}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type={showPwd ? "text" : "password"}
              value={values.password}
              onChange={handle("password")}
              error={!!errors.password}
              helperText={errors.password}
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPwd((p) => !p)}
                        aria-label={showPwd ? "Hide password" : "Show password"}
                        edge="end"
                      >
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={disableSubmitBtn}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
