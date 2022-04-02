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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function EventListElement(props) {
    //dialog for deletion
    const [delopen, setdelOpen] = React.useState(false);

    const handleClickOpenDeleteDialog = () => {
        setdelOpen(true);
    };
  
    const handleCloseDeleteDialog = () => {
        setdelOpen(false);
    };
    //dialog for edition
    const [editopen, seteditOpen] = React.useState(false);

    const handleClickOpenEditDialog = () => {
        seteditOpen(true);
    };
  
    const handleCloseEditDialog = () => {
        seteditOpen(false);
    };
    
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

                <div className='row_container'>
                    <LocationOnIcon/>
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
                            {props.location}
                    </Box>
                </div>
            </Grid>
            <Grid item>
                <Button sx={{mr:3}} variant="outlined" onClick={handleClickOpenEditDialog}>
                    Edit
                </Button>
                
                <Dialog open={editopen} onClose={handleCloseEditDialog}>
                    <DialogTitle>Edit your event</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Edit your choice of a potention movie, friends, time, and location.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id="movie"
                        label="Movie"
                        type="movie"
                        fullWidth
                        variant="standard"
                        value={props.movie.name}
                        sx={{ mb: 2, mt:2 }}
                    />
                    
                    <TextField
                        id="friends"
                        label="Friends"
                        type="friend"
                        fullWidth
                        variant="standard"
                        value={props.invited}
                        sx={{ mb: 2, mt:2 }}
                    />

                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        sx={{ width: 220, mb: 2, mt:2 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        value={moment(props.time).format("YYYY-MM-DD")}
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
                        sx={{ width: 150, mb: 2, mt:2, ml:2 }}
                        value={moment(props.time).format("HH:mm")}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleCloseEditDialog}>Submit</Button>
                    </DialogActions>
                </Dialog>
                
                
                
                <Button sx={{mr:3}} variant="outlined" color='error' 
                  onClick={handleClickOpenDeleteDialog}>
                    Delete
                </Button>
                <Dialog
                    open={delopen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDeleteDialog}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Delete this event?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You were going to watch {props.movie.name} with {props.invited.map((friend,index)=> <>{friend + (index===props.invited.length -1 ?'':', ')}</>)} at time {moment(props.time).format("YYYY-MM-DD HH:mm")}.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => {
                    props.onDelete(props.index);
                    handleCloseDeleteDialog();
                    }}>Delete</Button>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Button variant="contained" color="success">
                    More
                </Button>
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
