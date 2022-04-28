import React from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import MovieDescription from "../movie/MovieDescription";

const MovieModal = ({
  open,
  handleClose,
  movieInfo,
  goMovie,
  goEvent,
  eventId,
}) => {
  const modalContent = null;
  // const {} = movieInfo;
  return (
    <>
      <Modal
        keepMounted={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            width: "1000px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            // border: "2px solid #000",
            boxShadow: 24,
          }}
        >
          <MovieDescription
            {...movieInfo}
            goMovie={goMovie}
            goEvent={goEvent}
            eventId={eventId}
          />
          {/*<Box*/}
          {/*  sx={{ width: "600px", height: "500px", backgroundColor: "#eee" }}*/}
          {/*>*/}
          {/*  <Box>{movieId}</Box>*/}
          {/*</Box>*/}
          {/*<CardMedia*/}
          {/*  component="img"*/}
          {/*  height="140"*/}
          {/*  image={Boolean(modalContent) ? modalContent.movie.footage : ""}*/}
          {/*  alt={Boolean(modalContent) ? modalContent.movie.name : ""}*/}
          {/*/>*/}
          {/*<CardContent>*/}
          {/*  <Typography gutterBottom variant="h5" component="div">*/}
          {/*    {Boolean(modalContent) ? modalContent.movie.name : ""}*/}
          {/*  </Typography>*/}
          {/*  <Typography variant="body2" color="text.secondary">*/}
          {/*    {Boolean(modalContent) ? modalContent.movie.description : ""}*/}
          {/*  </Typography>*/}
          {/*</CardContent>*/}
          {/*<CardActions>*/}
          {/*  /!*<Button size="small">Share</Button>*!/*/}
          {/*  <Button size="small">Learn More</Button>*/}
          {/*</CardActions>*/}
          {/*<Box>{movieId}</Box>*/}
        </Card>
      </Modal>
    </>
  );
};

export default MovieModal;
