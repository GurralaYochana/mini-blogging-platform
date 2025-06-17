import { Avatar, Box, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { PostsSkeleton } from "./PostsSkeleton";

export const ProfileSkeleton = () => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: "1rem" }}>
        <Skeleton variant="circular" height={50} animation="wave">
          <Avatar />
        </Skeleton>
        <Box width={"50%"}>
          <Skeleton width={"100%"} animation="wave">
            <Typography>.</Typography>
          </Skeleton>
          <Skeleton width={"100%"} animation="wave">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
      </Box>
      <Skeleton animation="wave">
        <Tabs value={0}>
          <Tab />
        </Tabs>
      </Skeleton>
      <PostsSkeleton />
    </>
  );
};
