import React from 'react';
import Box from '@mui/material/Box';
import MovieEvent from '../../MovieEvent/MovieEvent';
import Typography from '@mui/material/Typography';
import ListOfFriend from '../../Friends/ListOfFriend';
import Divider from '@mui/material/Divider';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import List from '@mui/material/List';
import {v4 as uuidv4} from 'uuid'

function Notification(props) {
  const items = [
    {
      avatar: {
        alt: 'Remy Sharp',
        src: '/static/images/avatar/1.jpg',
      },
      text: {
        primary: 'Brunch this weekend?',
        receiver: 'Ali Connors',
        content: ' — I\'ll be in your neighborhood doing errands this…',
      },
    },
    {
      avatar: {
        alt: 'Remy Sharp',
        src: '/static/images/avatar/1.jpg',
      },
      text: {
        primary: 'Brunch this weekend?',
        receiver: 'Ali Connors',
        content: ' — I\'ll be in your neighborhood doing errands this…',
      },
    },
    {
      avatar: {
        alt: 'Remy Sharp',
        src: '/static/images/avatar/1.jpg',
      },
      text: {
        primary: 'Brunch this weekend?',
        receiver: 'Ali Connors',
        content: ' — I\'ll be in your neighborhood doing errands this…',
      },
    },
  ];
  return (
      <Box component='main' sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        pt: 8,
        width: '100%',
        justifyContent: 'space-evenly',
      }}>
        <List sx={{
          width: '100%',
          maxWidth: 1000,
          bgcolor: 'background.paper',
          mt: 10,
          borderRadius: '20px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, .2)',
        }}>
          <ListItem>
            <Typography>
              New
            </Typography>
          </ListItem>
          {
            items.map((item, index) => (
                <React.Fragment key={uuidv4()}>
                  <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                      <Avatar alt= {item.avatar.alt}
                              src= {item.avatar.src}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary= {item.text.primary}
                        secondary={
                          <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component='span'
                                variant='body2'
                                color='text.primary'
                            >
                              {item.text.receiver}
                            </Typography>
                            {item.text.content}
                          </React.Fragment>
                        }
                    />
                  </ListItem>
                  {items.length > index + 1 && <Divider variant='inset' component='li'/>}
                </React.Fragment>
            ))
          }

          <Divider></Divider>
          <ListItem sx = {{mt: 1}}>
            Before That
          </ListItem>

          {
            items.map((item, index) => (
                <React.Fragment key={uuidv4()}>
                  <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                      <Avatar alt= {item.avatar.alt}
                              src= {item.avatar.src}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary= {item.text.primary}
                        secondary={
                          <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component='span'
                                variant='body2'
                                color='text.primary'
                            >
                              {item.text.receiver}
                            </Typography>
                            {item.text.content}
                          </React.Fragment>
                        }
                    />
                  </ListItem>
                  {items.length > index + 1 && <Divider variant='inset' component='li'/>}
                </React.Fragment>
            ))
          }
        </List>
      </Box>
  );
}

export default Notification;
