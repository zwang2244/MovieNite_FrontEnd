import React, { useState } from "react";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import MovieModal from "../../components/modal/MovieModal";

const ListContent = ({ item, index, handleOpen }) => {
  // console.log("This is listContent");
  // console.log(item)
  // console.log(item);

  return (
    <>
      <ListItemAvatar>
        <Avatar alt={item.firstName + " " + item.lastName} src={item.avatar} />
      </ListItemAvatar>
      <ListItemText
        sx={{ cursor: "pointer" }}
        onClick={() => handleOpen(item.movieInfo, item.eventID)}
        primary={item.firstName + " " + item.lastName}
        secondary={
          <Box sx={{ cursor: "pointer" }} component={"span"}>
            <Box
              component={"span"}
              sx={{
                display: "inline",
                pr: "5px",
                color: "black",
                fontSize: "1rem",
              }}
            >
              {`Movie: ${item.movieInfo.title}`}
            </Box>
            <br />
            {item.movieInfo.overview}
          </Box>
        }
      />
    </>
  );
};

export default ListContent;
