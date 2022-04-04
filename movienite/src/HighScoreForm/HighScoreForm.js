import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { TextField } from "@mui/material";
import ListOfMovieGerneScore from './ListOfMovieGerneScore';
export default function HighScoreForm() {
    const [currData, setCurrData] = React.useState([]);
    const handleClick = () => {
        setCurrData([["Movie Name1", "Genre1", "Score1"],["Movie Name2", "Genre2", "Score2"]]); //api call data inputed here
    }
    return (
      <div>
            <Paper
                sx={{ p: '7px 10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: 500,
                    flexDirection: "column",
                    }}
                elevation={1}
                >
                    <TextField
                        autoFocus
                        id="genre"
                        label="Genre"
                        type="genre"
                        fullWidth
                        variant="standard"
                        // value={props.movie.name}
                        sx={{ mb: 2, mt:2 }}
                    />
                <Paper
                    sx={{ display: 'flex', flexDirection: "row", boxShadow: "none"  }}
                >
                    <TextField
                        id="date"
                        label="Start Date"
                        type="date"
                        sx={{ width: 220, mb: 2, mt:2 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        // value={moment(props.time).format("YYYY-MM-DD")}
                    />
                    
                    <TextField
                        id="time"
                        label="Start Time"
                        type="time"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                        sx={{ width: 150, mb: 2, mt:2, ml:2 }}
                        // value={moment(props.time).format("HH:mm")}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Paper>
                <Button sx={{width: '100%'}} variant="contained" onClick={handleClick}>See the results</Button>
                <ListOfMovieGerneScore currData={currData}/>
            </Paper>
      </div>
  );
}
