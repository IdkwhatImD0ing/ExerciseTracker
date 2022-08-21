import { useState } from "react";
import Head from "next/head";
import { useAuth } from "../auth/UserAuthContext";
import { addStats, addTimeStats } from "../helperFunctions/firebaseHelper";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Stack, Paper } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import MainAppBar from "./components/navbar";
import { theme } from "../components/theme";
const axios = require("axios");

const url =
  "https://images.unsplash.com/photo-1506143925201-0252c51780b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

export default function DataEntry() {
  const auth = useAuth();

  const [value, setValue] = useState(new Date());
  const [gender, setGender] = useState("male");
  const [bmi, setBMI] = useState(0);
  const [bodyFat, setBodyFat] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let options = {
      method: "GET",
      url: "https://fitness-calculator.p.rapidapi.com/bmi",
      params: {
        age: data.get("age"),
        weight: data.get("weight"),
        height: data.get("height"),
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI,
        "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setBMI(response.data.data);
        let options2 = {
          method: "GET",
          url: "https://fitness-calculator.p.rapidapi.com/bodyfat",
          params: {
            age: data.get("age"),
            gender: gender,
            weight: data.get("weight"),
            height: data.get("height"),
            neck: data.get("neck"),
            waist: data.get("waist"),
            hip: data.get("hip"),
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI,
            "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
          },
        };

        addStats(auth, options2.params);
        axios
          .request(options2)
          .then(function (response2) {
            setBodyFat(response2.data.data);
            addTimeStats(auth, [
              value,
              response.data.data.bmi,
              response2.data.data["Body Fat (BMI method)"],
            ]);
            setCalculated(true);
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Records</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <MainAppBar />

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            width="50%"
            sx={{
              mt: 5,
              textAlign: "center",
            }}
          >
            <Grid container spacing={2} sx={{ mt: 5, mb: 5 }}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  defaultValue="18"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    labelId="gender"
                    id="gender"
                    value={gender}
                    label="gender"
                    onChange={handleGender}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="weight"
                  label="Weight (kg)"
                  name="weight"
                  defaultValue="80"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="height"
                  label="Height (cm)"
                  name="height"
                  defaultValue="180"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="neck"
                  label="Neck (cm)"
                  name="neck"
                  defaultValue="20"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="waist"
                  label="Waist (cm)"
                  name="waist"
                  defaultValue="50"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="hip"
                  label="Hip (cm)"
                  name="hip"
                  defaultValue="50"
                />
              </Grid>
              <Grid item xs={6}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>

          {calculated && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <Typography color="black" variant="h3">
                Calculations
              </Typography>
              <Typography color="black">BMI: {bmi.bmi}</Typography>
              <Typography color="black">
                Healthy or not: {bmi.health}
              </Typography>
              <Typography color="black">
                Healthy BMI range: {bmi.healthy_bmi_range}
              </Typography>
              <Typography color="black">
                Body Fat using BMI Method: {bodyFat["Body Fat (BMI method)"]}%
              </Typography>
              <Typography color="black">
                Body Fat using US Navy Method:{" "}
                {bodyFat["Body Fat (U.S. Navy Method)"] * 100}%
              </Typography>
              <Typography color="black">
                Body Fat Mass: {bodyFat["Body Fat Mass"] * 100}%
              </Typography>
              <Typography color="black">
                Lean Body Mass: {bodyFat["Lean Body Mass"]}%
              </Typography>
            </Stack>
          )}
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
