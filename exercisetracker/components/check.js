import {useState} from 'react'
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"
export default function Check({name}) {
    const [checked, setChecked] = useState(false)
    const info = name

    function toggleCheck(event) {
        setChecked(event.target.checked)
    } 
    return (
        <Box>
            <Checkbox checked= {checked} onChange={toggleCheck}/>
            {info}
        </Box>
    )
}