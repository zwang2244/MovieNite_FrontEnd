import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import { Button } from '@mui/material';
import SingleSearch from './SingleSearch';
import MultiSearch from './MultiSearch';
import './EventForm.css';

export default function EventForm() {
  const [movieList,setMovieList] = React.useState([]);
  const [friendList,setFriendList] = React.useState([]);
  const handleChange = (newValue) => {
    
  };

  // const handleSubmit = (event) => {
  //   console.log('A name was submitted: ' + event);
  //   // event.preventDefault();
  // }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        padding: '20px',
        margin:'20px'
      }}
      noValidate
      autoComplete="off"
    >
      {/* <form onSubmit={handleSubmit}> */}
      <div className='container'>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 750 }}
          elevation={1}
        >
          <SingleSearch options={["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5", "Movie 6"]}/>
        </Paper>
      </div>
      <Divider variant="middle" sx={{ p: '10px' }}/>
      <div className='container'>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 750}}
        >
          
          <MultiSearch options={['Oliver Hansen','Van Henry','April Tucker','Ralph Hubbard','Omar Alexander','Carlos Abbott','Miriam Wagner','Bradley Wilkerson','Virginia Andrews','Kelly Snyder']}/>
        </Paper>
      </div>
      <Divider variant="middle" sx={{ p: '10px', m: '5px' }}/>
      
      <div>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800,
          justifyContent: 'space-evenly' }}
          elevation={0}
        >
          <TextField
            id="date"
            label="Date"
            type="date"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="time"
            label="Time"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
        </Paper>
      </div>
      <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800,
          justifyContent: 'space-evenly' }}
          elevation={0}
        >
        <Button sx={{width: 800}} size="large" variant="contained" type="submit">Schedule</Button>
      </Paper>
      {/* </form> */}
    </Box>
  );
}
