import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import EventForm from '../EventForm/EventForm';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieEvent from '../MovieEvent/MovieEvent';
import ListOfFriend from '../Friends/ListOfFriend';
import './ResponsiveDrawer.css';
import {Badge} from '@mui/material';

// @react-router
import {Router, Route, Outlet, Navigate} from 'react-router';
import ListItemButton from '@mui/material/ListItemButton';
import {Link} from 'react-router-dom';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const {window} = props;
  // console.log(props);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
      <div>
        <Toolbar/>
        <Divider/>
        <List>
            <ListItem key={'Home'} disablePadding>
              <ListItemButton component={Link} to={'/'}>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary={'Home'}/>
              </ListItemButton>
            </ListItem>

          <ListItem button key={'Events'}>
            <ListItemIcon><EventIcon/></ListItemIcon>
            <ListItemText primary={'Events'}/>
          </ListItem>

          <ListItem button key={'Notification'} disablePadding>
            <ListItemButton component={Link} to={'/notification'}>
              <ListItemIcon>
                <Badge badgeContent={4} color={'primary'}>
                  <CircleNotificationsIcon/>
                </Badge>
              </ListItemIcon>
              <ListItemText primary={'Notification'}/>
            </ListItemButton>
          </ListItem>

          <ListItem button key={'Favorites'}>
            <ListItemIcon><FavoriteIcon/></ListItemIcon>
            <ListItemText primary={'Favorites'}/>
          </ListItem>

          <ListItem button key={'Profile'}>
            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
            <ListItemText primary={'Profile'}/>
          </ListItem>

        </List>
      </div>
  );

  const container = window !== undefined
      ? () => window().document.body
      : undefined;

  return (
      <Box sx={{display: 'flex'}}>
        <CssBaseline/>
        <AppBar
            position='fixed'
            sx={{
              width: {sm: `calc(100% - ${drawerWidth}px)`},
              ml: {sm: `${drawerWidth}px`},
            }}
        >
          <Toolbar>
            <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{mr: 2, display: {sm: 'none'}}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant='h6' noWrap component='div'>
              Home
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
            component='nav'
            sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
            aria-label='mailbox folders'
        >
          <Drawer
              variant='permanent'
              sx={{ display: {xs: 'none', sm: 'block'}, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, }}}
              open
          >
            {drawer}
          </Drawer>
        </Box>
        <Outlet/>
      </Box>
  );
}

export function Home() {
  return (
      <Box component='main' sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        pt: 8,
        width: '100%',
        justifyContent: 'space-evenly',
      }} >
        <MovieEvent/>
        <div className='container'>
          <Typography gutterBottom variant='h5'>
            Friends
          </Typography>
          <ListOfFriend/>
        </div>
      </Box>
  );
}

//TODO other function


ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
