import { useAuth } from "../auth/UserAuthContext";
import { useRouter } from "next/router";
import { Box, Container, Stack } from "@mui/system";
import { Typography } from "@mui/material";

export default function ShowExercise() {
  const auth = useAuth();
  const router = useRouter();
  const { id, name, bodyPart, equipment, target, gifUrl } = router.query;

  return (
    <>
      <Box
        component="section"
        sx={{
          display: "flex",
          overflow: "auto",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Container maxWIdth="xl" sx={{ textAlign: "center" }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography>{name}</Typography>
            <Typography>ID: {id}</Typography>
            <img src={gifUrl} alt="Exercise gif" />
            <Typography>Body Part: {bodyPart}</Typography>
            <Typography>Equipment: {equipment}</Typography>
            <Typography>Target: {target}</Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
