import Check from "../components/check";
import ListChecks from "../components/listchecks";
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import {useState} from "react"
export default function Select() {
    const list = ["triceps", "biceps", "quads", "traps", "hamstring", "calves", "abs"]
    const list2 = ["barbell", "dumbell", "ropes", "kettlebell"]
    const [muscleSearch, setMuscleSearch] = useState("")
    const [equipmentSearch, setEquipmentSearch] = useState("")

    function handleMuscleChange(event) {
        setMuscleSearch(event.target.value)
    }

    function handleEquipmentChange(event) {
        setEquipmentSearch(event.target.value)
    }

    function handleSubmit() {

    }
    return (
        <>
            <ListChecks name="Muscle Groups" list={["triceps", "biceps", "quads", "traps", "hamstring", "calves", "abs"]}/>
            <ListChecks name="Equipment" list={["barbell", "dumbell", "ropes", "kettlebell"]}/>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>

            {/*
            <Box>
                <Box>Muscle Groups</Box>
                <TextField id="standard-basic" label="Search" variant="standard" onChange={handleMuscleChange}/>
                {list.filter(item => 
                    (item.toLowerCase().includes(muscleSearch.toLowerCase()))
                ).map(muscle =>
                    <Check name={muscle}/>
                )}
                
            </Box>

            <Box>
                <Box>Equipment</Box>
                <TextField id="standard-basic" label="Search" variant="standard" onChange={handleEquipmentChange}/>
                {list.filter(item => 
                    (item.toLowerCase().includes(equipmentSearch.toLowerCase()))
                ).map(muscle =>
                    <Check name={muscle}/>
                )}
                
            </Box>
                */}
            

        </>
    )
}