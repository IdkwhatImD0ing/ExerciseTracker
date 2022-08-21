import { useAuth } from "../auth/UserAuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Container, Stack } from "@mui/system";
import { ThemeProvider, Typography, Paper } from "@mui/material";
import MainAppBar from "./components/navbar";
import { theme } from "../components/theme";

export default function ShowExercise() {
  const auth = useAuth();
  const router = useRouter();
  const { id, name, bodyPart, equipment, target, gifUrl } = router.query;

  const url =
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          component="section"
          sx={{
            display: "flex",
            overflow: "auto",
            backgroundImage: `url(${url})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            flexDirection: "column",
            alignContent: "center",
            height: "100vh",
          }}
        >
          <MainAppBar />
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: "5%" }}
          >
            <Paper sx={{ opacity: 0.7 }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ mt: 5, mb: 5 }}
              >
                <Typography>{name}</Typography>
                <Typography>ID: {id}</Typography>
                <Image
                  src={gifUrl}
                  alt="Exercise gif"
                  width={500}
                  height={500}
                />
                <Typography>Body Part: {bodyPart}</Typography>
                <Typography>Equipment: {equipment}</Typography>
                <Typography>Target: {target}</Typography>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
}
