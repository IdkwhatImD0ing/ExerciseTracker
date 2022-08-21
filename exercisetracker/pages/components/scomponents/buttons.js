import { useAuth } from "../../../auth/UserAuthContext";
import { useRouter } from "next/router";

import { Box, Button } from "@mui/material";

export default function Buttons() {
  const auth = useAuth();
  const router = useRouter();
  return (
    <div>
      <Box alignItems="center">
        <Button
          variant="contained"
          href="#"
          sx={{
            mt: 2,
            mb: 2,
            mr: 3,
            backgroundColor: "#3A3976",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#3A3976",
            },
          }}
        >
          Find Exercises
        </Button>
        <Button
          variant="contained"
          href="#"
          sx={{
            mt: 2,
            mb: 2,
            mr: 3,
            backgroundColor: "#3A3976",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#3A3976",
            },
          }}
        >
          Records
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            auth.logOut();
            router.push("/");
          }}
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: "#3A3976",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#3A3976",
            },
          }}
        >
          Log Out
        </Button>
      </Box>
    </div>
  );
}
