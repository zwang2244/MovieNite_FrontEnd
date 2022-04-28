import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Stack } from "@mui/material";
import EventForm from "../EventForm/EventForm";
import movieNiteImg from "./movie_night.jpg";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import homeImage from "../assets/home-image/home-image.svg";
export default function MovieEvent() {
  return (
    <Stack
      sx={{ maxWidth: 1000 }}
      spacing={6}
      paddingTop={15}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
    >
      {/*<CardMedia*/}
      {/*  component="img"*/}
      {/*  height="140"*/}
      {/*  image= {movieNiteImg}*/}
      {/*  alt="Movie Night"*/}
      {/*/>*/}
      <Paper
        elevation={0}
        sx={{
          paddingRight: 6,
          paddingLeft: 3,
          width: 1,
          height: "230px",
          backgroundColor: "#e1f6e3",
          borderRadius: "16px",
        }}
      >
        <Stack
          sx={{ height: "230px" }}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack
            spacing={0}
            justifyContent={"flex-end"}
            height={"230px"}
            sx={{ paddingBottom: 3, paddingLeft: 1 }}
          >
            <Typography
              fontSize={24}
              fontWeight={700}
              component="div"
              color={"#212B36"}
            >
              Welcome,
            </Typography>
            <Typography
              fontSize={24}
              fontWeight={700}
              component="div"
              color={"#212B36"}
            >
              Set your movie event!
            </Typography>
          </Stack>
          <img src={homeImage} height="85%" />
        </Stack>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "40px",
          p: 6,
          maxWidth: 800,
          minWidth: 700,
          boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.16)",
          borderColor: "#919EAB20",
          borderStyle: "solid",
          borderWidth: 1,
        }}
      >
        <EventForm />
      </Paper>
    </Stack>
  );
}
