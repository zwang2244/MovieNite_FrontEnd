import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';
import EventForm from '../EventForm/EventForm';
import movieNiteImg from './movie_night.jpg';
export default function MovieEvent() {
  return (
    <Card sx={{ maxWidth: 1000 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {movieNiteImg}
          alt="Movie Night"
        />
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            Movie Event
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <EventForm />
      </CardActions>
    </Card>
  );
}
