import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

export default function ListOfMovieGerneScore(props) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', m:2 }}>
      {props.currData.map((value) => (
        <ListItem
          key={value}
          disableGutters
        >
          <ListItemButton>
            <ListItemText primary={value[0]} />
            <ListItemText primary={value[1]} />
            <ListItemText primary={value[2]} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}