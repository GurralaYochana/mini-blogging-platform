import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { OpenInFull } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import type { Author } from "./Home";
import { stringAvatar } from "../utils/avatarColor";
import { getUsers } from "../api/auth";

export default function UsersPage() {
  const { setErrorMsg } = useAuth();
  const [users, setUsers] = useState<Author[] | null>(null);

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data.data))
      .catch(() => setErrorMsg("Error while fetching Users"));
  }, []);

  if (!users) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom data-testid="all-users-title">
        All Users
      </Typography>

      <List>
        {users.map((user) => (
          <ListItem
            key={user._id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="open-posts"
                component={RouterLink}
                to={`/profile/${user._id}`}
                color="inherit"
              >
                <OpenInFull />
              </IconButton>
            }
            sx={{
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
            divider
          >
            <ListItemAvatar>
              <Avatar {...stringAvatar(user.username)} />
            </ListItemAvatar>
            <ListItemText primary={user.username} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
