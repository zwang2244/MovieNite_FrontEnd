import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import {useQuery} from 'react-query';
import {getTrendAmongFriends} from '../api/friends';
import {dataToArray} from '../utils/dataToArray';
import {CircularProgress} from '@mui/material';

export default function ListOfFriend() {
  // react-query
  const {data, isLoading} = useQuery("trendingAmongFriends", () => getTrendAmongFriends(20));
  // if (!isLoading) {
  //   console.log(dataToArray(data));
  // }
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
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
      {isLoading && <CircularProgress/>}
      {!isLoading && dataToArray(data).map((item, index) => (
        <ListItem key={index}>
          <ListItemButton>
            <ListItemText sx={{width: '80%'}} primary={item.title}/>
            <ListItemText sx={{width: '20%'}} primary={item.votes} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
