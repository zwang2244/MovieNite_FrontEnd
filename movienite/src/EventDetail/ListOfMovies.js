import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {CircularProgress, Stack, Typography} from '@mui/material';

export default function ListOfMovies() {
  const data = [1,2,3,4,5,7,8];
  const isLoading = false; // todo
  return (
    <Stack spacing={3}>
      <Typography sx={{mt: 3}} variant={'h4'}>
        Movie Vote
      </Typography>
    <List
      sx={{
        width: 700,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        height: 300,
        '& ul': { padding: 0 },
        m:2
      }}
      subheader={<li />}
    >
        <ListItem key={"1"}>
          <ListItemButton>
            <ListItemText sx={{width: '80%'}} primary={"Movies Proposed"}/>
            <ListItemText sx={{width: '20%'}} primary={"Num Votes"} />
          </ListItemButton>
        </ListItem>
      {isLoading && <CircularProgress/>}
      {!isLoading && data.map((item, index) => (
        <ListItem key={index}>
          <ListItemButton>
            <ListItemText sx={{width: '80%'}} primary={"MovieTitle"}/>
            <ListItemText sx={{width: '20%'}} primary={"MovieVote"} />
            <ThumbUpOffAltIcon/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </Stack>
  );
}
