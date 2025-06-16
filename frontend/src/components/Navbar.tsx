import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Tooltip,
  useMediaQuery,
  MenuItem,
  Menu,
  ListItemIcon,
} from "@mui/material";
import { AccountCircleOutlined, GroupOutlined } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

interface Props {
  toggleTheme: () => void;
}
export default function Navbar({ toggleTheme }: Props) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { token, setToken } = useAuth();
  const [profileMenu, setProfileMenu] = useState<null | HTMLElement>(null);
  const open = Boolean(profileMenu);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenu(event.currentTarget);
  };
  const handleClose = () => {
    setProfileMenu(null);
  };

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

            {isMobile ? (
              <>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "profile-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  color="inherit"
                >
                  <AccountCircleOutlined />
                </IconButton>
                <Menu
                  anchorEl={profileMenu}
                  id="profile-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/profile"
                    color="inherit"
                  >
                    <ListItemIcon>
                      <AccountCircleOutlined />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => setToken(null)}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Tooltip title="Profile">
                  <IconButton
                    component={RouterLink}
                    to="/profile"
                    color="inherit"
                  >
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
            )}
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
