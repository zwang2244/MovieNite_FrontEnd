import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import {CircularProgress, Stack, Typography} from '@mui/material';

export default function ListOfParticipants() {
  const data = [1,2,3,4,5,7,8];
  const isLoading = false; // todo
  return (
    <Stack spacing={3}>
      <Typography sx={{mt: 3}} variant={'h6'}>
      Participants
      </Typography>
    <List
      sx={{
        width: 300,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        // maxHeight: 300,
        height: 500,
        '& ul': { padding: 0 },
        m:2
      }}
      subheader={<li />}
    >
      {isLoading && <CircularProgress/>}
      {!isLoading && data.map((item, index) => (
        <ListItem key={index}>
          <ListItemButton>
            <ListItemText sx={{width: '100%'}} primary={"Friend"}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </Stack>
  );
}
