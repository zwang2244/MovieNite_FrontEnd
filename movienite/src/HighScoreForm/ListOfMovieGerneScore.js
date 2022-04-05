import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

export default function ListOfMovieGerneScore(props) {
  return (
    <List sx={{ width: '100%',
                maxWidth: 400,
                bgcolor: 'background.paper',
                m:2,
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                height: 300,
                '& ul': { padding: 0 },
                }}>
      {props.currData.length > 0 && props.currData.map((value, index) => (
        <ListItem
          key={index}
          disableGutters
        >
          <ListItemButton>
            <ListItemText key={index + value.title} sx={{width:'30%'}} primary={value.title} />
            <ListItemText key={index + value.genre} sx={{width:'60%'}} primary={value.genre} />
            <ListItemText key={index +value.score} sx={{width:'10%'}} primary={value.score} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
