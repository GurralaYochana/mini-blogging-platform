import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { register } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";
import { emailRegex } from "./Login";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormValues | "form", string>>;

const initialVals: FormValues = {
  username: "",
  email: "",
  password: "",
};

export default function Register() {
  const nav = useNavigate();
  const { setToken, setSuccessMsg, setErrorMsg } = useAuth();

  const [values, setVals] = useState<FormValues>(initialVals);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const validateField = (name: keyof FormValues, value: string): string => {
    switch (name) {
      case "username":
        if (!value.trim()) return "Username is required";
        if (value.length < 3) return "Username must be at least 3 characters";
        break;
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
    const errs: FormErrors = {};
    (Object.keys(values) as (keyof FormValues)[]).forEach((k) => {
      const err = validateField(k, values[k]);
      if (err) errs[k] = err;
    });
    return errs;
  };

  const handle =
    (k: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      setVals((p) => ({ ...p, [k]: val }));
      setErrors((p) => ({ ...p, [k]: validateField(k, val) }));
    };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateAll();
    setErrors(errs);

    if (Object.keys(errs).length) return;

    try {
      setLoading(true);
      const res = await register(values);
      setToken(res.data.data?.token);
      setSuccessMsg("Account created. Welcome back!");
      setTimeout(() => nav("/"), 800);
    } catch (err: any) {
      setErrors({ form: err.response?.data?.error || "Registration failed" });
      setErrorMsg("Registration failed");
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
            <PersonAddAltIcon />
          </Avatar>
          <Typography variant="h5">Sign Up</Typography>

          <Box
            component="form"
            noValidate
            onSubmit={submit}
            sx={{ mt: 2, width: "100%" }}
          >
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={values.username}
              onChange={handle("username")}
              error={!!errors.username}
              helperText={errors.username}
              required
            />
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
              type="password"
              fullWidth
              margin="normal"
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
            {errors.form && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.form}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={disableSubmitBtn}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
