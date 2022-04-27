import React, { useState } from "react";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import MovieModal from "../../components/modal/MovieModal";

const ListContent = ({ item, index, handleOpen }) => {
  // console.log("This is listContent");
  // console.log(item)
  console.log(item);

  return (
    <>
      <ListItemAvatar>
        <Avatar alt={"TODOName"} src={item.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={"Sender"}
        secondary={
          <>
            <Box
              component={"span"}
              sx={{
                cursor: "pointer",
                display: "inline",
                pr: "5px",
                color: "black",
                fontSize: "1rem",
              }}
              onClick={() => handleOpen(item.movieInfo, item.eventID)}
            >
              {`Movie: ${item.movieInfo.title}`}
            </Box>
            <br />
            {item.movieInfo.overview}
          </>
        }
      />
    </>
  );
};

export default ListContent;
