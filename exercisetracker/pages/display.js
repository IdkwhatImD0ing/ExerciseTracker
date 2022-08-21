import { useAuth } from "../auth/UserAuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Container, Stack } from "@mui/system";
import { ThemeProvider, Typography, Paper } from "@mui/material";
import MainAppBar from "./components/navbar";
import { theme } from "../components/theme";
import { useState } from "react";
import { Button } from "@mui/material";
import { getTime } from "../helperFunctions/firebaseHelper";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const url =
  "https://images.unsplash.com/photo-1515549832467-8783363e19b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80";

export default function ViewData() {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState([]);
  const [bmi, setBMI] = useState([]);
  const [bodyFat, setBodyFat] = useState([]);
  const [data, setData] = useState([]);

  const view = async (event) => {
    event.preventDefault();
    let obj = await getTime(auth);
    for (let i = 0; i < obj.at(0).length; i++) {
      let temp = {
        time: obj.at(0).at(i),
        bmi: obj.at(1).at(i),
        bodyFat: obj.at(2).at(i),
      };
      setData((data) => [...data, temp]);
    }
    setLoading(false);
  };

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
            spacing={3}
            sx={{ mt: "5%" }}
          >
            <Typography variant="h2" color="Black">
              View Records
            </Typography>
            {loading ? (
              <Button variant="contained" size="large" onClick={view}>
                View
              </Button>
            ) : (
              <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data} margin={{ right: 300 }}>
                  <CartesianGrid />
                  <XAxis dataKey="time" interval={"preserveStartEnd"} />
                  <YAxis></YAxis>
                  <Legend />
                  <Tooltip />
                  <Line dataKey="bmi" stroke="black" activeDot={{ r: 8 }} />
                  <Line dataKey="bodyFat" stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
}
