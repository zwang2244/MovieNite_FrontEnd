import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";

import { MenuItem, Menu, Button, CardActions } from "@mui/material";

import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import List from "@mui/material/List";
import notificationData from "../../_mock/json/notification.json";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

function Notification(props) {
  const [items, setItems] = useState(notificationData.notifications.read);
  const [curIndex, setCurIndex] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  //Modal
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const handleOpen = (index) => {
    console.log(index);
    setModalContent(items[index]);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  //Menu
  const handleOpenMenu = (event, idx) => {
    setAnchorEl(event.currentTarget);
    setCurIndex(idx);
  };

  const handleMenuClose = () => {
    console.log(curIndex);
    setAnchorEl(null);
  };

  const handleMenuCloseRead = () => {
    const array = [...items];
    array[curIndex].read = true;
    setItems(array);
    handleMenuClose();
  };

  const handleMenuCloseDelete = () => {
    const array = [...items];
    array[curIndex].delete = true;
    setItems(array);
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
      {/*TODO: Modal*/}

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
        {items.map(
          (item, index) =>
            !item.delete &&
            !item.read && (
              <Box key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={item.sender.name} src={item.sender.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.sender.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline", pr: "5px" }}
                          component=""
                          variant="body1"
                          color="text.primary"
                          onClick={() => handleOpen(index)}
                        >
                          {`Movie: ${item.movie.name}`}
                        </Typography>
                        <br />
                        {item.movie.description}
                      </>
                    }
                  />
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
                    open={Boolean(anchorEl)}
                  >
                    <MenuItem onClick={handleMenuCloseRead}>
                      Mark as Read
                    </MenuItem>
                    <MenuItem onClick={handleMenuCloseDelete}>Delete</MenuItem>
                  </Menu>
                </ListItem>
                {!isLastRead(index) && (
                  <Divider variant="inset" component="li" />
                )}
              </Box>
            )
        )}

        <Divider></Divider>
        <ListItem sx={{ mt: 1 }}>Before That</ListItem>

        {items.map(
          (item, index) =>
            !item.delete &&
            item.read && (
              <Box key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={item.sender.name} src={item.sender.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.sender.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline", pr: "5px" }}
                          component=""
                          variant="body1"
                          color="text.primary"
                          onClick={() => handleOpen(index)}
                        >
                          {`Movie: ${item.movie.name}`}
                        </Typography>
                        <br />
                        {item.movie.description}
                      </>
                    }
                  />
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
                    open={Boolean(anchorEl)}
                  >
                    {/*TODO Debug for clicking modal which would lead to several modals showing up*/}
                    <MenuItem onClick={handleMenuCloseRead}>
                      Mark as Read
                    </MenuItem>
                    <MenuItem onClick={handleMenuCloseDelete}>Delete</MenuItem>
                  </Menu>
                </ListItem>
                {!isLastUnread(index) && (
                  <Divider variant="inset" component="li" />
                )}
              </Box>
            )
        )}
      </List>

      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card
            sx={{
              maxWidth: 345,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              // border: "2px solid #000",
              boxShadow: 24,
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={Boolean(modalContent) ? modalContent.movie.footage : ""}
              alt={Boolean(modalContent) ? modalContent.movie.name : ""}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {Boolean(modalContent) ? modalContent.movie.name : ""}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Boolean(modalContent) ? modalContent.movie.description : ""}
              </Typography>
            </CardContent>
            <CardActions>
              {/*<Button size="small">Share</Button>*/}
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Modal>
      </>
    </Box>
  );
}

export default Notification;

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   // border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };
