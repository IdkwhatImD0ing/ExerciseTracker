import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useAuth } from "../../auth/UserAuthContext";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import LoginButtons from "./scomponents/loginbuttons";
import Buttons from "./scomponents/buttons";

export default function MainAppBar() {
  const auth = useAuth();
  const router = useRouter();
  const width = useWindowSize();

  return (
    <AppBar position="static" sx={{ backgroundColor: "green" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Box>
              <a href="/">
                <img src="/logo.png" alt="logo" height={50} />
              </a>
            </Box>
            {!auth.user && <LoginButtons />}
            {auth.user && <Buttons />}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

//Hook
function useWindowSize() {
  const [width, setWidth] = useState(undefined);
  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWidth(window.innerWidth);
      }

      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return width;
}
