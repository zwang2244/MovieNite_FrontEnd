import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { CircularProgress, Stack, Typography, Rating } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MovieModal from "../components/modal/MovieModal";
import ModalContent from "../Layout/Notification/ModalContent";

export default function ListOfMovies(props) {
  const isLoading = false; // todo
  // console.log(props.movies);
  const [open, setOpen] = useState(false);
  const [movieInfo, setmovieInfo] = useState({});
  const handleOpen = (movieInfo) => {
    // console.log("?>>>>>>");
    // console.log(id);
    setmovieInfo(movieInfo);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <Stack spacing={3}>
        <List
          sx={{
            width: 760,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            minHeight: 200,
            "& ul": { padding: 0 },
            m: 2,
          }}
          subheader={<li />}
        >
          <ListItem key={"colname"}>
            <ListItemText
              sx={{ width: "90%" }}
              primary={"Movies Proposed"}
              primaryTypographyProps={{ fontSize: "18px", fontWeight: 600 }}
              style={{ textAlign: "left" }}
            />
            <ListItemText
              sx={{ width: "10%" }}
              primary={"Votes"}
              primaryTypographyProps={{ fontSize: "18px", fontWeight: 600 }}
              style={{ textAlign: "center" }}
            />
          </ListItem>
          {isLoading && <CircularProgress />}
          {!isLoading &&
            props.movies.map((item, index) => (
              <ListItem key={index}>
                <Rating
                  name="half-rating-read"
                  defaultValue={item.avgRating}
                  precision={1}
                  readOnly
                  size="small"
                />
                <ListItemButton
                  onClick={() => {
                    // console.log(item.movieInfo);
                    handleOpen(item.movieInfo);
                  }}
                  sx={{ width: "90%", borderRadius: "15px" }}
                >
                  <ListItemText
                    primary={item.title}
                    style={{ textAlign: "left" }}
                  />
                </ListItemButton>
                <ListItemText
                  sx={{ width: "5%" }}
                  primary={item.voteCount}
                  style={{ textAlign: "center" }}
                  primaryTypographyProps={{ display: "inline" }}
                />
                <IconButton
                  aria-label="vote"
                  onClick={() => props.handleVote(index)}
                >
                  {item.isVoted ? (
                    <ThumbUpAltIcon sx={{ color: "#212b36" }} />
                  ) : (
                    <ThumbUpOffAltIcon />
                  )}
                </IconButton>
              </ListItem>
            ))}
        </List>
        <MovieModal
          open={open}
          handleClose={handleClose}
          movieInfo={movieInfo}
          goMovie={true}
        />
      </Stack>
    </>
  );
}
