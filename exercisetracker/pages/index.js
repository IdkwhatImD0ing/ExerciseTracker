import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import { theme } from "../components/theme";
import { ThemeProvider } from "@mui/material";
import MainAppBar from "./components/navbar";
import {makeStyles} from "@material-ui/core/styles"
import { ClassNames } from "@emotion/react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url($../public/fitness.jpeg)`,
  }
}))

export default function Home() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <MainAppBar />
      <div className={classes.root}></div>
    </ThemeProvider>
  );
}
