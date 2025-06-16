import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import { AccountCircleOutlined, GroupOutlined } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  toggleTheme: () => void;
}
export default function Navbar({ toggleTheme }: Props) {
  const { token, setToken } = useAuth();

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 1 }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
        >
          MiniBlog
        </Typography>

        <Tooltip title="Toggle light/dark">
          <IconButton color="inherit" onClick={toggleTheme} size="large">
            {/* theme icon swaps automatically via CSS */}
            <Brightness4Icon sx={{ display: { xs: "none", md: "block" } }} />
            <BrightnessHighIcon sx={{ display: { xs: "block", md: "none" } }} />
          </IconButton>
        </Tooltip>

        {token ? (
          <>
            <Tooltip title="New Post">
              <IconButton component={RouterLink} to="/post/new" color="inherit">
                <PostAddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Users">
              <IconButton component={RouterLink} to="/users" color="inherit">
                <GroupOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton component={RouterLink} to="/profile" color="inherit">
                <AccountCircleOutlined />
              </IconButton>
            </Tooltip>
            <Button
              startIcon={<LogoutIcon />}
              color="inherit"
              onClick={() => setToken(null)}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              color="inherit"
              startIcon={<PersonAddAltIcon />}
            >
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
