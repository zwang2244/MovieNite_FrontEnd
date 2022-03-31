import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import { Button } from '@mui/material';
import './EventForm.css';

export default function EventForm() {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
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
      <div className='container'>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 750 }}
          elevation={1}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, p: 2}}
            placeholder="Search for a movie"
            inputProps={{ 'aria-label': 'Search for a movie' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          
        </Paper>
        <Button variant="contained">ADD</Button>
      </div>
      <Divider variant="middle" sx={{ p: '10px' }}/>
      <div className='container'>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 750}}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 , p: 2}}
            placeholder="Invite friends"
            inputProps={{ 'aria-label': 'Invite friends' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button variant="contained">ADD</Button>
      </div>
      <Divider variant="middle" sx={{ p: '10px', m: '5px' }}/>
      <div>
        {/* <Stack component="form" noValidate spacing={3}> */}
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
            // defaultValue="2017-05-24"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="time"
            label="Time"
            type="time"
            // defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
        {/* </Stack> */}
        </Paper>
      </div>
      <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800,
          justifyContent: 'space-evenly' }}
          elevation={0}
        >
        <Button sx={{width: 800}} size="large" variant="contained">Schedule</Button>
      </Paper>
    </Box>
  );
}