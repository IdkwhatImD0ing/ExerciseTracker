import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { theme } from "../components/theme";
import { ThemeProvider } from "@mui/material";
import MainAppBar from "./components/navbar";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useAuth } from "../auth/UserAuthContext";

export default function Home() {
  const auth = useAuth();
  const url =
    "https://images.unsplash.com/photo-1614292264554-7dca1d6466d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

  return (
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
          height: "100vh",
        }}
      >
        <MainAppBar />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          justifyItems="center"
          spacing={3}
          height="70%"
        >
          <Typography variant="h1" color="white">
            Remote Trainer
          </Typography>
          <Typography variant="h2" color="white">
            The best way to become fit at home
          </Typography>
          <Typography variant="h4" color="white">
            Built by students, for students
          </Typography>
          <Button
            variant="contained"
            size="large"
            component="a"
            href={auth.user ? "/select" : "/signup"}
            sx={{ minWidth: 200 }}
          >
            {auth.user ? "Start Here !" : "Sign Up"}
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
