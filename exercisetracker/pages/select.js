import { useRouter } from "next/router";
import {
  Grid,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Box,
  Paper,
  IconButton,
  TextField,
  Container,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { bodyParts, equipment } from "../helperFunctions/lists";
import { DataGrid } from "@mui/x-data-grid";
import MainAppBar from "./components/navbar";
import { theme } from "../components/theme";
import { ThemeProvider } from "@mui/system";

const axios = require("axios");

const filterData = (query, list) => {
  //Filter Function
  if (!query) {
    return list;
  } else {
    return list.filter((d) => d.toLowerCase().includes(query.toLowerCase()));
  }
};

const SearchBar = ({ setSearchQuery }) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Search Target"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
);

export default function Select() {
  const [searchQueryEquip, setSearchQueryEquip] = useState("");
  const [searchQueryBody, setSearchQueryBody] = useState("");
  const equipmentFiltered = filterData(searchQueryEquip, equipment);
  const bodyPartsFiltered = filterData(searchQueryBody, bodyParts);
  const [equipmentIndex, setEquipmentIndex] = useState([]);
  const [bodyIndex, setBodyIndex] = useState([]);
  const [exerciseObject, setExerciseObject] = useState(null);
  const router = useRouter();

  const columns = [
    { field: "name", headerName: "Name", width: 500 },
    { field: "bodyPart", headerName: "Body Part", wwidth: 100 },
    { field: "equipment", headerName: "Equipment", width: 100 },
    { field: "target", headerName: "Target", width: 100 },
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = () => {
          /*
          console.log(params.row.id);
          console.log(params.row.name);
          console.log(params.row.bodyPart);
          console.log(params.row.equipment);
          console.log(params.row.target);
          console.log(params.row.gifUrl);
          */
          router.push({
            pathname: "/showexercise",
            query: {
              id: params.row.id,
              name: params.row.name,
              bodyPart: params.row.bodyPart,
              equipment: params.row.equipment,
              target: params.row.target,
              gifUrl: params.row.gifUrl,
            },
          });
        };

        return <Button onClick={onClick}>Select</Button>;
      },
    },
    { field: "gifUrl", headerName: "Gif", width: 100 },
  ];

  const handleEquipChange = (event, equipment) => {
    if (event.target.checked) {
      setEquipmentIndex([...equipmentIndex, equipment]);
    } else {
      setEquipmentIndex(equipmentIndex.filter((i) => i !== equipment));
    }
  };

  const handleBodyChange = (event, part) => {
    if (event.target.checked) {
      setBodyIndex([...bodyIndex, part]);
    } else {
      setBodyIndex(bodyIndex.filter((i) => i !== part));
    }
  };

  function handleSubmit() {
    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };
    let data = undefined;
    let returnData = [];

    console.log(bodyIndex);
    console.log(equipmentIndex);

    axios
      .request(options)
      .then(function (response) {
        data = response.data;
        console.log(response.data);
        for (let i = 0; i < 1327; i++) {
          if (
            bodyIndex.includes(data[i].bodyPart) &&
            equipmentIndex.includes(data[i].equipment)
          ) {
            console.log(data[i]);
            returnData.push(data[i]);
          }
        }
        setExerciseObject(returnData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //RETURN DATA FORMAT
  // Case Sensitive
  //A list of objects with the following properties:
  // bodyPart
  // equipment
  //gifUrl
  //id
  //name
  //target

  return (
    <>
      <ThemeProvider theme={theme}>
        <MainAppBar />
        <Box
          component="section"
          sx={{
            display: "flex",
            overflow: "auto",
            flexDirection: "column",
            height: "80vh",
            mt: "5%",
          }}
        >
          <Container maxWidth="xl" sx={{ textAlign: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper>
                  <SearchBar setSearchQuery={setSearchQueryBody} />
                  <List
                    sx={{ maxHeight: 300, overflow: "auto" }}
                    subheader={<ListSubheader inset>Body Parts</ListSubheader>}
                  >
                    {bodyPartsFiltered.map((item, index) => {
                      return (
                        <ListItem key={item} role={undefined} divider dense>
                          <Checkbox
                            onChange={(e) => {
                              handleBodyChange(e, item);
                            }}
                          />
                          <ListItemText id={item} primary={item} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <SearchBar setSearchQuery={setSearchQueryEquip} />
                  <List
                    sx={{ maxHeight: 300, overflow: "auto" }}
                    subheader={<ListSubheader inset>Equipment</ListSubheader>}
                  >
                    {equipmentFiltered.map((item, index) => {
                      return (
                        <ListItem key={item} role={undefined} divider dense>
                          <Checkbox
                            onChange={(e) => {
                              handleEquipChange(e, item);
                            }}
                          />
                          <ListItemText id={item} primary={item} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              </Grid>
            </Grid>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            {exerciseObject && (
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={exerciseObject}
                  columns={columns}
                  columnVisibilityModel={{ gifUrl: false }}
                />
              </div>
            )}
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}
