import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import IconButton from "@mui/material/IconButton";
import { CircularProgress, Stack, Typography, Avatar } from "@mui/material";
import { getUserInfo } from "../api/user";
import { dataToArray } from "../utils/dataToArray";
export default function ListOfParticipants(props) {
  const isHost = props.isHost;
  const [currHost, setCurrHost] = useState({});
  const isLoading = false; // todo
  const gethost = async () => {
    var host = await getUserInfo(props.host);
    setCurrHost(dataToArray(host).user);
  };
  useEffect(() => {
    gethost();
  }, [props.host]);

  return (
    <Stack spacing={3}>
      <Typography sx={{ mt: 3, ml: 1 }} fontSize={22} fontWeight={600}>
        Participants
      </Typography>
      {/*Mode for what?*/}
      <List
        sx={{
          width: props.mode === "Friends" ? 600 : 300,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          height: isHost ? 450 : 600,
          "& ul": { padding: 0 },
          m: 2,
        }}
        subheader={<li />}
      >
        {isLoading && <CircularProgress />}
        <ListItem key={"Host"}>
          <ListItemButton sx={{ borderRadius: "14px" }}>
            <Avatar
              alt={currHost.firstName + " " + currHost.lastName}
              src={currHost.avatar}
              sx={{ m: 1.5 }}
            />
            <ListItemText
              sx={{ width: "100%" }}
              primary={currHost.firstName + " " + currHost.lastName + " (Host)"}
            />
          </ListItemButton>
        </ListItem>
        {!isLoading &&
          props.participants.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton sx={{ borderRadius: "14px" }}>
                <Avatar
                  alt={item.firstName + " " + item.lastName}
                  src={item.avatar}
                  sx={{ m: 1.5 }}
                />
                <ListItemText
                  sx={{ width: "100%" }}
                  primary={item.firstName + " " + item.lastName}
                />
              </ListItemButton>
              <IconButton
                aria-label="kickout"
                onClick={() => props.onKickOut(item.userID)}
              >
                {props.isHost ? <PersonRemoveIcon /> : ""}
              </IconButton>
            </ListItem>
          ))}
      </List>
    </Stack>
  );
}
