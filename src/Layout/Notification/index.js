import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  MenuItem,
  Menu,
  Collapse,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import ListContent from "./ListContent";
import List from "@mui/material/List";
import notificationData from "../../_mock/json/notification.json";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import {
  decrement,
  increment,
} from "../../redux/feature/notification/NotificationCountSlice";

//transition
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./notifictain.css";
import { useQuery, useQueryClient } from "react-query";
import { useAuth } from "../../context/auth-context";
import {
  deleteNotification,
  getNotification,
  readToUnread,
  unreadToRead,
} from "../../api/notification";
import MovieModal from "../../components/modal/MovieModal"; //transition CSS

//animation

function Notification(props) {
  const [items, setItems] = useState(notificationData.notifications.read);
  const [currentId, setCurrentId] = useState(-1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useAuth();
  const { userID } = user;
  const [jumpEventId, setJumpEventId] = useState(0);
  // console.log("Nkjdksajdklsa");
  //Modal

  const {
    data: noti,
    isLoading: isLoadingNotifications,
    refetch: refetchNotifications,
  } = useQuery(
    ["getAllNotificationByUserID", userID],
    () => getNotification(userID),
    {
      retryOnMount: true,
    }
  );
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});
  const handleOpen = (movieInfo, eventId) => {
    setJumpEventId(eventId);
    setMovieInfo(movieInfo);
    setOpen(true);
  };

  if (isLoadingNotifications) {
    return <CircularProgress />;
  }

  const notifications = JSON.parse(noti.data);

  const unReadNotifications = notifications.filter((item) => !item.isRead);
  const readNotifications = notifications.filter((item) => item.isRead);

  const refetchNotificationCount = () => {
    queryClient.refetchQueries(["getNotificationCountByUserId", userID]);
  };

  const handleClose = () => setOpen(false);

  //Menu
  const handleOpenMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentId(id);
  };
  const handleMenuClose = () => {
    setCurrentId(-1);
    setAnchorEl(null);
  };

  const handleMenuCloseRead = (id) => {
    unreadToRead(id).then((res) => {
      refetchNotifications();
      refetchNotificationCount();
    });
    handleMenuClose();
  };

  const handleMenuCloseForUnread = (id) => {
    readToUnread(id).then((res) => {
      refetchNotifications();
      refetchNotificationCount();
    });
    handleMenuClose();
  };

  const handleMenuCloseDelete = (id) => {
    deleteNotification(id).then((res) => {
      refetchNotifications();
      refetchNotificationCount();
    });
    handleMenuClose();
  };

  //animation
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        maxHeight: "auto",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "row",
        pt: 8,
        width: "100%",
        justifyContent: "center",
      }}
    >
      <List
        sx={{
          width: "100%",
          maxWidth: 1000,
          bgcolor: "background.paper",
          mt: 10,
          borderRadius: "20px",
          boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.16)",
        }}
      >
        <ListItem>
          <Typography fontSize={18} fontWeight={700}>
            New
          </Typography>
        </ListItem>

        <TransitionGroup>
          {unReadNotifications.map((item, index) => (
            // just use collapse...
            <Collapse key={item.id}>
              <Box>
                <ListItem alignItems="flex-start">
                  <ListContent
                    item={item}
                    index={index}
                    handleOpen={handleOpen}
                  />

                  <IconButton
                    aria-controls={"menu"}
                    onClick={(e) => handleOpenMenu(e, item.id)}
                    aria-label="settings"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  {/*Button should be followed by Menu*/}
                  <Menu
                    id={"menu"}
                    onClose={handleMenuClose}
                    anchorEl={anchorEl}
                    open={item.id === currentId}
                  >
                    <MenuItem onClick={() => handleMenuCloseRead(item.id)}>
                      Mark as Read
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuCloseDelete(item.id)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </ListItem>
                {index + 1 < unReadNotifications.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </Box>
            </Collapse>
          ))}
        </TransitionGroup>

        <Divider></Divider>
        <ListItem sx={{ mt: 1 }}>
          <Typography fontSize={16}>Before That</Typography>
        </ListItem>
        <TransitionGroup>
          {readNotifications.map((item, index) => (
            <Collapse key={index}>
              <ListItem alignItems="flex-start">
                <ListContent
                  item={item}
                  index={index}
                  handleOpen={handleOpen}
                />
                <IconButton
                  aria-controls={"menu"}
                  onClick={(e) => handleOpenMenu(e, item.id)}
                  aria-label="settings"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id={"menu"}
                  onClose={handleMenuClose}
                  anchorEl={anchorEl}
                  open={currentId === item.id}
                >
                  {/*Done: TODO Debug for clicking modal which would lead to several modals showing up*/}
                  <MenuItem onClick={() => handleMenuCloseForUnread(item.id)}>
                    Mark as Unread
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuCloseDelete(item.id)}>
                    Delete
                  </MenuItem>
                </Menu>
              </ListItem>
              {index + 1 < readNotifications.length && (
                <Divider variant="inset" component="li" />
              )}
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
      <MovieModal
        movieInfo={movieInfo}
        open={open && Object.keys(movieInfo).length !== 0 && jumpEventId !== 0}
        handleClose={handleClose}
        goMovie={true}
        goEvent={true}
        eventId={jumpEventId}
      />
    </Box>
  );
}

export default Notification;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
