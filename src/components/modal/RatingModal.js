import React, { useState } from "react";
import Card from "@mui/material/Card";
import MovieDescription from "../movie/MovieDescription";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Slider, Stack } from "@mui/material";
import GoSlider from "../slider/GoSlider";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import ClickButton from "../button/ClickButton";
import { ratingMovie } from "../../api/rating";
import { useQueryClient } from "react-query";

function RatingModal({
  open,
  handleClose,
  initialValue,
  onChange,
  imdbId,
  userId,
}) {
  const queryClient = useQueryClient();
  const rateMovie = () => {
    //"imdbId": "tt0371746",
    //   "score": 90,
    //   "userId": 1007
    const data = {
      imdbId: imdbId,
      score: initialValue,
      userId: userId,
    };
    ratingMovie(data).then((res) => {
      if (res?.code === 1) {
        queryClient
          .refetchQueries(["getMovieInfoByUserId", userId])
          .then(() => {
            handleClose();
          });
      }
    });
  };
  return (
    <Modal
      keepMounted={false}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          width: "500px",
          height: "400px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          // border: "2px solid #000",
          boxShadow: 24,
        }}
      >
        <Stack
          sx={{
            width: 500,
            height: "100%",
            paddingLeft: "60px",
            paddingRight: "60px",
          }}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={5.5}
        >
          <Typography
            width={1}
            fontSize={18}
            fontWeight={700}
            textAlign={"left"}
            component={"div"}
          >
            Your Rating
          </Typography>
          <Typography variant={"h3"} component={"div"}>
            {initialValue} / 100
          </Typography>
          <PrettoSlider
            value={initialValue}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            onChange={onChange}
            // defaultValue={initialValue}
          />
          <Box width={1}>
            <Stack
              sx={{ position: "absolute", left: "-20px" }}
              width={1}
              direction={"row"}
              justifyContent={"flex-end"}
              spacing={2}
            >
              <ClickButton
                onClick={handleClose}
                height={"40px"}
                color={"#212B36"}
                backgroundColor={"#DFE3E8"}
                backgroundColorAfterHover={"#d6d9de"}
              >
                Cancel
              </ClickButton>

              <ClickButton
                color={"white"}
                backgroundColor={"#212B36"}
                backgroundColorAfterHover={"#353d4d"}
                height={"40px"}
                onClick={() => {
                  rateMovie();
                }}
              >
                Rating
              </ClickButton>
            </Stack>
          </Box>
        </Stack>
      </Card>
    </Modal>
  );
}

export default RatingModal;

const PrettoSlider = styled(Slider)({
  color: "#383232",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#3e4240",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
