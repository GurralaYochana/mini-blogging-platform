import { Container, Divider, Skeleton } from "@mui/material";

export const PostDetailsSkeleton = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Skeleton variant="rectangular" animation="wave" height={150} />
      <Skeleton>
        <Divider sx={{ mb: 3 }} />
      </Skeleton>
      <Skeleton variant="rectangular" animation="wave" height={80} />
    </Container>
  );
};
