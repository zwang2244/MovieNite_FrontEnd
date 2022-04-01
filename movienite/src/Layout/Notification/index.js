import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { MenuItem, Menu, Collapse } from "@mui/material";
import { Avatar, ListItem, ListItemAvatar, ListItemText, IconButton } from "@mui/material";
import ListContent from './ListContent';
import List from "@mui/material/List";
import notificationData from "../../_mock/json/notification.json";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import ModalContent from './ModalContent';
import {
  decrement,
  increment,
} from "../../redux/feature/notification/NotificationCountSlice";

//transition
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./notifictain.css"; //transition CSS

//animation

function Notification(props) {
  const [items, setItems] = useState(notificationData.notifications.read);
  const [curIndex, setCurIndex] = useState(-1);
  const [anchorEl, setAnchorEl] = React.useState(null);


  //Modal
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const handleOpen = (index) => {
    // console.log(index);
    setModalContent(items[index]);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  //Menu
  const handleOpenMenu = (event, idx) => {
    setAnchorEl(event.currentTarget);
    setCurIndex(idx);
  };
  //click Change Notification count
  const dispatch = useDispatch();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuCloseRead = () => {
    const array = [...items];
    array[curIndex].read = true;
    setItems(array);
    setCurIndex(-1);
    dispatch(decrement());
    handleMenuClose();
  };

  const handleMenuCloseForUnread = () => {
    const array = [...items];
    array[curIndex].read = false;
    setItems(array);
    setCurIndex(-1);
    dispatch(increment());
    handleMenuClose();
  };

  const handleMenuCloseDelete = (flag) => {
    const array = [...items];
    array[curIndex].delete = true;
    setItems(array);
    if (flag) {
      dispatch(decrement());
    }
    setCurIndex(-1);
    handleMenuClose();
  };

  const isLastRead = (index) => {
    for (let i = items.length - 1; i >= 0; i--) {
      if (!items[i].delete) {
        if (!items[i].read) {
          return index === i;
        }
      }
    }
    return false;
  };

  const isLastUnread = (index) => {
    for (let i = items.length - 1; i >= 0; i--) {
      if (!items[i].delete) {
        if (items[i].read) {
          return index === i;
        }
      }
    }
    return false;
  };

  //animation
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
      <List
        sx={{
          width: "100%",
          maxWidth: 1000,
          bgcolor: "background.paper",
          mt: 10,
          borderRadius: "20px",
          boxShadow: "0 1px 2px rgba(0, 0, 0, .2)",
        }}
      >
        <ListItem>
          <Typography>New</Typography>
        </ListItem>

        <TransitionGroup>
          {items.map(
            (item, index) =>
              !item.delete &&
              !item.read && (
                // just use collapse...
                <Collapse key={index}>
                  <Box>
                    <ListItem alignItems="flex-start">
                      <ListContent item={item} index={index} handleOpen={handleOpen}/>

                      <IconButton
                          aria-controls={"menu"}
                          onClick={(e) => handleOpenMenu(e, index)}
                          aria-label="settings"
                      >
                        <MoreVertIcon />
                      </IconButton>
                      {/*Button should be followed by Menu*/}
                      <Menu
                        onClose={handleMenuClose}
                        id={"menu"}
                        anchorEl={anchorEl}
                        open={index === curIndex}
                        onClose={() => {
                          setCurIndex(-1);
                        }}
                      >
                        <MenuItem onClick={handleMenuCloseRead}>
                          Mark as Read
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuCloseDelete(true)}>
                          Delete
                        </MenuItem>
                      </Menu>

                    </ListItem>
                    {!isLastRead(index) && (
                      <Divider variant="inset" component="li" />
                    )}
                  </Box>
                </Collapse>
              )
          )}
        </TransitionGroup>

        <Divider></Divider>
        <ListItem sx={{ mt: 1 }}>Before That</ListItem>
        <TransitionGroup>
        {items.map(
          (item, index) =>
            !item.delete &&
            item.read && (
              <Collapse key={index}>
                <ListItem alignItems="flex-start">
                  <ListContent item={item} index={index} handleOpen={handleOpen}/>
                  <IconButton
                    aria-controls={"menu"}
                    onClick={(e) => handleOpenMenu(e, index)}
                    aria-label="settings"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    onClose={handleMenuClose}
                    id={"menu"}
                    anchorEl={anchorEl}
                    open={index === curIndex}
                    onClose={() => {
                      setCurIndex(-1);
                    }}
                  >
                    {/*Done: TODO Debug for clicking modal which would lead to several modals showing up*/}
                    <MenuItem onClick={handleMenuCloseForUnread}>
                      Mark as Unread
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuCloseDelete(false)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </ListItem>
                {!isLastUnread(index) && (
                  <Divider variant="inset" component="li" />
                )}
              </Collapse>
            )
        )}
        </TransitionGroup>
      </List>

      <ModalContent modalContent={modalContent} open={open} handleClose={handleClose}/>
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






