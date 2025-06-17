import { lazy, Suspense, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  CssBaseline,
  createTheme,
  ThemeProvider,
  Snackbar,
  Alert,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "./components/Navbar";
import { useAuth } from "./contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/*  Lazy‑load pages to keep bundle small  */
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const CreateNEditPost = lazy(() => import("./pages/CreateNEditPost"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const PostDetails = lazy(() => import("./pages/PostDetails"));

export default function App() {
  const { token, successMsg, setSuccessMsg, errorMsg, setErrorMsg } = useAuth();
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDark ? "dark" : "light"
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#ef6c00" },
          background: {
            default: mode === "light" ? "whitesmoke" : "#121212",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar
        toggleTheme={() =>
          setMode((prev) => (prev === "light" ? "dark" : "light"))
        }
      />
      <Suspense
        fallback={
          <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />

          {/* auth routes */}
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />

          {/* protected */}
          <Route
            path="/post/new"
            element={token ? <CreateNEditPost /> : <Navigate to="/login" />}
          />
          <Route
            path="/post/edit/:id"
            element={
              token ? <CreateNEditPost edit={true} /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/post/:id"
            element={token ? <PostDetails /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:userId"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={token ? <UsersPage /> : <Navigate to="/login" />}
          />

          {/* catch‑all → home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>

      <Snackbar
        open={!!successMsg}
        autoHideDuration={3000}
        onClose={() => setSuccessMsg("")}
      >
        <Alert
          onClose={() => setSuccessMsg("")}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorMsg}
        autoHideDuration={3000}
        onClose={() => setErrorMsg("")}
      >
        <Alert
          onClose={() => setErrorMsg("")}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
