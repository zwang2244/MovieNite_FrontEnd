import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import './EventListElement.css';
import moment from 'moment';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import GroupIcon from '@mui/icons-material/Group';
import { Button } from '@mui/material';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function EventListElement(props) {
  return (
    <Paper
      sx={{
        p: 2,
        ml: 'auto',
        mr: 'auto',
        mt: 2,
        mb: 2,
        maxWidth: 800,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 300, height: 300 }}>
            <Img alt="complex" src={props.movie.footage} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
                <div className='row_container'>
                <LiveTvIcon/>
                <Typography variant="h6" component="div">
                    Watch
                </Typography>
                <Box sx={{ bgcolor: 'primary.main', 
                            border: 1, 
                            borderRadius: 10, 
                            color: 'primary.contrastText', 
                            borderColor: 'primary.main',
                            width:'200px',
                            ml:2,
                            typography:'h6'
                            }}>
                        {props.movie.name}
                    </Box>
                </div>    
              <div className='row_container'>
                <GroupIcon/>
                <Typography variant="h6" component="div">
                    With
                </Typography>
                <Box sx={{bgcolor: 'primary.main', 
                            border: 1, 
                            borderRadius: 10, 
                            color: 'primary.contrastText', 
                            borderColor: 'primary.main',
                            width:'200px',
                            ml:4,
                            typography:'h6',
                            }}>
                        {props.invited.map((friend,index)=> <>{friend + (index===props.invited.length -1 ?'':', ')}</>)}
                    </Box>
                </div>

                <div className='row_container'>
                    <MovieFilterIcon/>
                    <Typography variant="h6" component="div">
                        At
                    </Typography>
                    <Box sx={{bgcolor: 'primary.main', 
                                border: 1, 
                                borderRadius: 10, 
                                color: 'primary.contrastText', 
                                borderColor: 'primary.main',
                                width:'200px',
                                ml:7,
                                typography:'h6',
                                }}>
                            {moment(props.time).format("YYYY-MM-DD HH:mm")}
                        </Box>
                </div>
            </Grid>
            <Grid item>
                <Button sx={{mr:3}} variant="outlined">
                    Edit
                </Button>
                <Button sx={{mr:3}} variant="outlined" color='error'>Delete</Button>
                <Button variant="contained" color="success">More</Button>
            </Grid>
          </Grid>
          <Grid item>
              <Typography variant="body2" color="text.secondary">
                EventID:
                <br/>
                1030114
              </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
