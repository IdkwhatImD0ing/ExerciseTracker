import {useState} from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Check from "./check"

export default function ListChecks({name, list}) {
    const [search, setSearch] = useState("")

    function handleChange(event) {
        setSearch(event.target.value)
    }
    return (
        <Box>
            <Box>{name}</Box>
            <TextField id="standard-basic" label="Search" variant="standard" onChange={handleChange}/>
            {list.filter(item => 
                (item.toLowerCase().includes(search.toLowerCase()))
            ).map(item =>
                <Check name={item}/>
            )}
            
        </Box>
    )
}