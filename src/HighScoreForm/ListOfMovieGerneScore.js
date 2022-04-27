import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import MovieModal from "../components/modal/MovieModal";
import { useState } from "react";

export default function ListOfMovieGerneScore(props) {
  console.log(props);
  const [open, setOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});
  const handleOpen = (movieInfo) => {
    // console.log("?>>>>>>");
    // console.log(id);
    setMovieInfo(movieInfo);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "background.paper",
          m: 2,
          position: "relative",
          overflow: "auto",
          height: "auto",
          "& ul": { padding: 0 },
        }}
      >
        {props.currData.length > 0 &&
          props.currData.map((value, index) => (
            <ListItem key={index.imdbNumber} disableGutters>
              <ListItemButton
                onClick={() => {
                  handleOpen(value.movieInfo);
                }}
                sx={{
                  padding: 0,
                  margin: 0,
                  borderRadius: "10px",
                  width: "70%",
                }}
              >
                <ListItemText
                  primaryTypographyProps={{ textAlign: "center" }}
                  key={index + value.title}
                  sx={{ width: "90%" }}
                  primary={value.title}
                />
              </ListItemButton>
              {/*<ListItemText*/}
              {/*  key={index + value.genre}*/}
              {/*  sx={{ width: "60%" }}*/}
              {/*  primary={value.genre}*/}
              {/*/>*/}
              <ListItemText
                primaryTypographyProps={{ textAlign: "center" }}
                key={index + value.score}
                sx={{ width: "20%" }}
                primary={value.score}
              />
              {/*</ListItemButton>*/}
            </ListItem>
          ))}
      </List>
      <MovieModal open={open} handleClose={handleClose} movieInfo={movieInfo} />
    </>
  );
}
