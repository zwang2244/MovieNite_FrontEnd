import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

export default function ListOfFriend() {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
        m:2
      }}
      subheader={<li />}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <ListItem key={item}>
          <ListItemButton>
            <ListItemText primary={`Movie Name ${item}`} />
            <ListItemText primary={`Vote ${item}`} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}