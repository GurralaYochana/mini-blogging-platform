import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";

export const PostsSkeleton = () => {
  return (
    <Stack spacing={2}>
      {[...Array(3)].map((_, i) => (
        <>
          <Skeleton key={i} variant="rectangular" height={70} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ margin: 1 }}>
              <Skeleton key={i} variant="circular" height={50}>
                <Avatar></Avatar>
              </Skeleton>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Skeleton key={i} width={"100%"}>
                <Typography>.</Typography>
              </Skeleton>
            </Box>
          </Box>
        </>
      ))}
    </Stack>
  );
};
