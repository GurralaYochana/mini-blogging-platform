import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Tooltip,
  useMediaQuery,
  MenuItem,
  Menu,
  ListItemIcon,
  Box,
} from "@mui/material";
import {
  AccountCircleOutlined,
  GroupOutlined,
  Brightness4,
  BrightnessHigh,
  PostAdd,
  Login,
  Logout,
  PersonAddAlt,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import logo from "../assets/tales-logo.png";

interface Props {
  toggleTheme: () => void;
}
export default function Navbar({ toggleTheme }: Props) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
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
        <Box sx={{ color: "inherit", flexGrow: 1 }}>
          <img
            src={logo}
            alt={"logo"}
            height={50}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Box>

        <Tooltip title="Toggle light/dark">
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            size="large"
            data-testid="theme-icon"
          >
            {/* theme icon swaps automatically via CSS */}
            <Brightness4 sx={{ display: { xs: "none", md: "block" } }} />
            <BrightnessHigh sx={{ display: { xs: "block", md: "none" } }} />
          </IconButton>
        </Tooltip>

        {token ? (
          <>
            <Tooltip title="New Post">
              <IconButton
                component={RouterLink}
                to="/post/new"
                color="inherit"
                data-testid="add-post-icon"
              >
                <PostAdd />
              </IconButton>
            </Tooltip>
            <Tooltip title="Users">
              <IconButton
                component={RouterLink}
                to="/users"
                color="inherit"
                data-testid="users-icon"
              >
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
                  data-testid="profile-icon"
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
                    data-testid="profile-icon"
                  >
                    <ListItemIcon>
                      <AccountCircleOutlined />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => setToken(null)}
                    data-testid="logout-icon"
                  >
                    <ListItemIcon>
                      <Logout />
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
                    data-testid="profile-icon"
                  >
                    <AccountCircleOutlined />
                  </IconButton>
                </Tooltip>
                <Button
                  startIcon={<Logout />}
                  color="inherit"
                  onClick={() => setToken(null)}
                  data-testid="logout-icon"
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
              startIcon={<Login />}
              data-testid="login-icon"
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              color="inherit"
              startIcon={<PersonAddAlt />}
              data-testid="sign-up-icon"
            >
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
