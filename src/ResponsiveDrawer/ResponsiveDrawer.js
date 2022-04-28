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
import MovieEvent from "../MovieEvent/MovieEvent";
import ListOfFriend from "../Friends/ListOfFriend";
import {
  createTheme,
  Stack,
  TextField,
  ThemeProvider,
  Collapse,
  Button,
} from "@mui/material";
import "./ResponsiveDrawer.css";
import { Badge } from "@mui/material";
import HighScoreForm from "../HighScoreForm/HighScoreForm";
import { StarBorder } from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventNoteIcon from "@mui/icons-material/EventNote";
// @react-router
import { Outlet, useLocation } from "react-router";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNotificationCount } from "../redux/feature/notification/NotificationCountSlice";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../context/auth-context";
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useQuery, useQueryClient } from "react-query";
import { getNotificationCount } from "../api/notification";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { user, logout } = useAuth();
  const { userID } = user;
  // console.log(user);
  const { window } = props;
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const {
    isLoading: isCountLoading,
    data: notificationCount,
    refetch: refetchCount,
  } = useQuery(
    ["getNotificationCountByUserId", userID],
    () => getNotificationCount(userID),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  if (!isCountLoading) console.log(notificationCount.data);

  // const { data } = useQuery();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  // console.log(pathname);
  // console.log("This is pathname");
  // const queryClient = useQueryClient();
  // console.log(queryClient);
  // const testing = () => {
  //   console.log("Tesing");
  //   queryClient.refetchQueries(["userID", userID]).then((res) => {
  //     console.log(res);
  //     console.log("Tesing结束!!!");
  //   });
  // };

  // const notificationCount = useSelector(selectNotificationCount);
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {/*Testing 成功!!! */}
      {/*<Button onClick={() => testing()}>3232</Button>*/}
      <List sx={{ p: 1 }}>
        <ListItem key={"Home"} disablePadding>
          <ListItemButton
            sx={{ borderRadius: "12px" }}
            component={Link}
            to={"/"}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"Search"} disablePadding>
          <ListItemButton
            sx={{ borderRadius: "12px" }}
            component={Link}
            to={"/search"}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Search Movie"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"Events"} disablePadding>
          <ListItemButton sx={{ borderRadius: "12px" }} onClick={handleClick}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={"Events"} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ borderRadius: "12px", pl: 4}}
              component={Link}
              to={"/events"}
            >
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Hosted" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding>
            <ListItemButton
              sx={{ borderRadius: "12px", pl: 4 }}
              component={Link}
              to={"/eventsParticipated"}
            >
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Participated" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem key={"Notification"} disablePadding>
          <ListItemButton
            sx={{ borderRadius: "12px" }}
            component={Link}
            to={"/notification"}
          >
            <ListItemIcon>
              <Badge
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#38cc8b",
                  },
                }}
                badgeContent={isCountLoading ? 0 : notificationCount.data}
                color={"primary"}
              >
                <CircleNotificationsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={"Notification"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Friends"} disablePadding>
          <ListItemButton component={Link} to={"/friends"}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={"Friends"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"Logout"} disablePadding>
          <ListItemButton sx={{ borderRadius: "12px" }} onClick={logout}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#fff",
        }}
        elevation={0}
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "#212B36" }}
          >
            {pathname.length <= 1
              ? "Home"
              : pathname.startsWith("/search/")
              ? "Movie Detail"
              : pathname === "/events"
              ? "Events Hosted"
              : pathname === "/eventsParticipated"
              ? "Events Participated"
              : pathname.startsWith("/events/")
              ? "Event Detail"
              : pathname.charAt(1).toUpperCase() + pathname.slice(2)}
          </Typography>
        </Toolbar>
        <Divider />
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
        // alignItems: "center",
        flexDirection: "row",
        width: 1,
        minWidth: 1400,
        paddingTop: "20px",
        height: "100vh",
        minHeight: "900px",
        // backgroundColor: "#f0f2f5",
        justifyContent: "space-evenly",
      }}
    >
      <MovieEvent />
      <Stack
        sx={{ height: "100%", padding: 10 }}
        spacing={7}
        justifyContent={"flex-start"}
      >
        <ListOfFriend />
        <HighScoreForm />
      </Stack>
    </Box>
  );
}

//TODO other function

export default ResponsiveDrawer;
