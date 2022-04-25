import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function EventCard(props) {
  return (
    <Card sx={{ width: 1000, pt:'100px', display:'flex', }}>
      <CardActionArea>
        <CardContent>
        <div>
          <Typography variant="h4" component="div">
            EventID: {props.evetID}
          </Typography>
          {/* <Typography variant="h4" component="div">
            Movie: {props.movie}
          </Typography> */}
          <Typography variant="h6" color="text.secondary">
            Friends: {props.friends}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Time: {props.time}
          </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
