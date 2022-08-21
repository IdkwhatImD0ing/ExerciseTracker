import { Box, Button } from "@mui/material";

export default function LoginButtons() {
  return (
    <div>
      <Box alignItems="center">
        <Button
          color="inherit"
          variant="h6"
          underline="none"
          href="/signin"
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
          {"Sign In"}
        </Button>
        <Button
          variant="h6"
          underline="none"
          href="/signup"
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
          {"Sign Up"}
        </Button>
      </Box>
    </div>
  );
}
