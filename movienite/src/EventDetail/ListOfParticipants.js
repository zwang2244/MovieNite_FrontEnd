import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import {CircularProgress, Stack, Typography, Avatar} from '@mui/material';

export default function ListOfParticipants(props) {
  const isLoading = false; // todo
  console.log(props.participants);
  return (
    <Stack spacing={3}>
      <Typography sx={{mt: 3}} variant={'h6'} fontSize={23} fontWeight={600} >
      Participants
      </Typography>
    <List
      sx={{
        width: 300,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        height: 500,
        '& ul': { padding: 0 },
        m:2
      }}
      subheader={<li />}
    >
      {isLoading && <CircularProgress/>}
      {!isLoading && props.participants.map((item, index) => (
        <ListItem key={index}>
          <ListItemButton>
            <Avatar alt={item.firstName + " " + item.lastName} src={item.avatar} sx={{m:1.5}}/>
            <ListItemText sx={{width: '100%'}} primary={item.firstName + " " + item.lastName}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </Stack>
  );
}
