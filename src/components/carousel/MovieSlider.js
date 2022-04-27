import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import MovieModal from "../modal/MovieModal";
import { useState } from "react";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const defaultURL =
  "https://image.tmdb.org/t/p/original/2BNKxbq4muNcwTjSDNCYnvr1dM8.jpg";
const images = [
  {
    label: "Joker",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

function SwipeableTextMobileStepper({ movieItems }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  console.log("This is movieItems");
  console.log(movieItems);
  const [open, setOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});
  const handleOpen = (movieInfo) => {
    // console.log("?>>>>>>");
    // console.log(id);
    setMovieInfo(movieInfo);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{ width: 1, flexGrow: 1, borderRadius: "12px", overflow: "hidden" }}
    >
      <AutoPlaySwipeableViews
        interval={5000}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {movieItems.map((movie, index) => (
          <div key={movie.imdbID}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  display: "block",
                  height: "300px",
                  overflow: "visible",
                  width: "100%",
                  background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5) ), url(${
                    movie.backdrop_path.length
                      ? movie.backdrop_path
                      : defaultURL
                  })`,
                  backgroundSize: "auto 300px",
                  backgroundPosition: "center 55%",
                  // background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5) ), url(${step.imgPath})`,
                }}
                onClick={() => {
                  handleOpen(movie);
                }}
              >
                <Typography
                  fontSize={18}
                  fontWeight={700}
                  sx={{ position: "absolute", left: "15px", bottom: "15px" }}
                  color={"#fff"}
                  component={"div"}
                >
                  {movie.title}
                </Typography>
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{ height: 0, margin: 0, padding: 0 }}
        steps={0}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            sx={{
              position: "relative",
              top: "-158px",
              color: "#fff",
            }}
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            sx={{
              position: "relative",
              top: "-158px",
              color: "#fff",
            }}
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
          </Button>
        }
      />
      <MovieModal open={open} handleClose={handleClose} movieInfo={movieInfo} />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
