import { useAuth } from "../auth/UserAuthContext";
import { useRouter } from "next/router";
import { Box, Container, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import MainAppBar from "./components/navbar";

export default function ShowExercise() {
  const auth = useAuth();
  const router = useRouter();
  const { id, name, bodyPart, equipment, target, gifUrl } = router.query;

  return (
    <>
      <MainAppBar />
      <Box
        component="section"
        sx={{
          display: "flex",
          overflow: "auto",
          flexDirection: "column",
          justifyContent: "center",
          height: "90vh",
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
