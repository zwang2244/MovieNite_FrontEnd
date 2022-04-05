import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieEvent from "../MovieEvent/MovieEvent";
import ListOfFriend from "../Friends/ListOfFriend";
import { Stack, TextField } from "@mui/material";
import "./ResponsiveDrawer.css";
import { Badge } from "@mui/material";
import HighScoreForm from "../HighScoreForm/HighScoreForm";

// @react-router
import { Outlet, useLocation } from "react-router";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNotificationCount } from "../redux/feature/notification/NotificationCountSlice";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const { pathname } = useLocation();
  // console.log(pathname.charAt(1).toUpperCase() + pathname.slice(2));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const notificationCount = useSelector(selectNotificationCount);
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"Home"} disablePadding>
          <ListItemButton component={Link} to={"/"}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>

        <ListItem button key={"Events"} disablePadding>
          <ListItemButton component={Link} to={"/events"}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={"Events"} />
          </ListItemButton>
        </ListItem>

        <ListItem button key={"Notification"} disablePadding>
          <ListItemButton component={Link} to={"/notification"}>
            <ListItemIcon>
              <Badge badgeContent={notificationCount} color={"primary"}>
                <CircleNotificationsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={"Notification"} />
          </ListItemButton>
        </ListItem>

        <ListItem button key={"Favorites"}>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary={"Favorites"} />
        </ListItem>

        <ListItem button key={"Profile"}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pathname.length > 1
              ? pathname.charAt(1).toUpperCase() + pathname.slice(2)
              : "Home"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Outlet />
    </Box>
  );
}

export function Home() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        pt: 8,
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <MovieEvent />
      <Stack spacing={6}>
        <Paper>
          <div className="container">
            <ListOfFriend />
          </div>
        </Paper>
        <Paper>
          <div className="container">
            <HighScoreForm />
          </div>
        </Paper>
      </Stack>
    </Box>
  );
}

//TODO other function

export default ResponsiveDrawer;
