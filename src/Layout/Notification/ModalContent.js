import React from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";

const ModalContent = ({ open, handleClose, modalContent }) => {
  if (modalContent === null) {
    return <></>;
  }
  return (
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
  );
};

export default ModalContent;
