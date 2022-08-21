import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import { useAuth } from "../auth/UserAuthContext";
import { setErrorMessage } from "../auth/setErrorMessage";

import { addStats, addTimeStats } from "../helperFunctions/firebaseHelper";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { calculateBMI, calculateBodyFat } from "../helperFunctions/apiCalls";
import MainAppBar from "./components/navbar";
import { theme } from "../components/theme";
const axios = require("axios");

export default function DataEntry() {
  const auth = useAuth();

  const [value, setValue] = useState(new Date());
  const [bmi, setBMI] = useState(0);
  const [bodyFat, setBodyFat] = useState(0);
  const [calculated, setCalculated] = useState(false);

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
        console.log(response.data.data);
        setBMI(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    let options2 = {
      method: "GET",
      url: "https://fitness-calculator.p.rapidapi.com/bodyfat",
      params: {
        age: data.get("age"),
        gender: data.get("gender"),
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
      .then(function (response) {
        console.log(response.data.data);
        setBodyFat(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    addTimeStats(auth, [value, bmi.bmi, bodyFat["Body Fat (BMI method)"]]);
    setCalculated(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MainAppBar />
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            overflow: "auto",
            flexDirection: "column",
            minHeight: "90vh",
            backgroundColor: "lightgray",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="age"
                  name="age"
                  defaultValue="18"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="gender"
                  label="gender"
                  name="gender"
                  defaultValue="male"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="weight"
                  label="weight"
                  name="weight"
                  defaultValue="80"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="height"
                  label="height"
                  name="height"
                  defaultValue="180"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="neck"
                  label="neck"
                  name="neck"
                  defaultValue="20"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="waist"
                  label="waist"
                  name="waist"
                  defaultValue="50"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="hip"
                  label="hip"
                  name="hip"
                  defaultValue="50"
                />
              </Grid>
              <Grid item xs={6}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </Box>
          {calculated && (
            <Typography color="black">
              BMI: {bmi.bmi} Health or not: {bmi.health} Healthy BMI range:{" "}
              {bmi.healthy_bmi_range} Body Fat using BMI Method:
              {bodyFat["Body Fat (BMI method)"]}% Body Fat using US Navy Method:{" "}
              {bodyFat["Body Fat (U.S. Navy Method)"] * 100}% Body Fat Mass:{" "}
              {bodyFat["Body Fat Mass"] * 100}% Lean Body Mass:{" "}
              {bodyFat["Lean Body Mass"]}%
            </Typography>
          )}
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
