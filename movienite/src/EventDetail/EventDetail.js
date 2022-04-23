import React, { useEffect, useState } from "react";
import {useParams} from 'react-router';
import {CardActionArea, Typography, Card, Box, CardContent, Paper, Grid, ButtonBase} from '@mui/material';
import moment from "moment";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListOfMovies from "./ListOfMovies";
import { styled } from "@mui/material/styles";
import ListOfParticipants from "./ListOfParticipants";
import MovieSearchAutoComplete from "../components/form/MovieSearchAutoComplete";
import "./EventDetail.css"
export default function EventDetail() {
  let {id} = useParams();
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "relative"
  });
  
  return(
    <div className="row_container">
    <Paper
    sx={{
      pt: 10,
      pl:2,
      pr:2,
      pb:2,
      mt: 2,
      mb: 2,
      maxWidth: 1000,
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    }}
  >
    <Grid container spacing={2}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <div className="row_container">
              <AccessTimeFilledIcon />
              <Typography variant="h6" component="div">
                Time:
              </Typography>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  border: 1,
                  borderRadius: 10,
                  color: "primary.contrastText",
                  borderColor: "primary.main",
                  width: "500px",
                  ml: 7,
                  typography: "h6",
                }}
              >
                {/* {moment(props.dateTime).format("YYYY-MM-DD HH:mm")} */}
                Time
              </Box>
            </div>

            <div className="row_container">
              <LocationOnIcon />
              <Typography variant="h6" component="div">
                Location:
              </Typography>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  border: 1,
                  borderRadius: 10,
                  color: "primary.contrastText",
                  borderColor: "primary.main",
                  width: "500px",
                  ml: 3,
                  typography: "h6",
                }}
              >
                {/* {props.location} */}
                Location
              </Box>
            </div>
          </Grid>
        </Grid>
        <Grid item>

        </Grid>
      </Grid>
    </Grid>

    <Grid container sx={{p:2,m:2}} spacing={2} direction="row" justifyContent="center" alignItems="center">
      <Grid item>
        <ButtonBase sx={{ width: 400, height: 400 }}>
          <Img alt="complex" /> 
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <div className="row_container">
              <LiveTvIcon />
              <Typography variant="h6" component="div">
                Movie To Watch
              </Typography>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  border: 1,
                  borderRadius: 10,
                  color: "primary.contrastText",
                  borderColor: "primary.main",
                  width: "200px",
                  ml: 2,
                  typography: "h6",
                }}
              >
                Movie
              </Box>
            </div>
            <div>
              <Box
                sx={{
                  // width: "400px",
                  ml: 4,
                  typography: "h6",
                }}
              >
                The Little Tramp goes prospecting for gold in the Klondike. Conditions are harsh, there is little in the way of comfort or food and even less it seems in the way of gold. Thanksgiving dinner for himself and Big Jim Mckay consists of a boiled boot. Once in town, he meets the beautiful Georgia at the Monte Carlo dance hall. He finds himself in competition with the ladies man who has his eyes on Georgia as well. Meanwhile, Black Larsen - wanted by the police - tries to steal Big Jim McKay's claim. Big Jim tries to stop him but knocked unconscious, he loses his memory. Back in town, the little tramp tries to impress Georgia. When Big Jim arrives, he regains his memory and he and the Little Tramp set off to make their fortune. Sailing home as rich men, the Little Tramp has one more chance to unite with Georgia.
              </Box>
            </div>
          </Grid>
        </Grid>
        <Grid item>

        </Grid>
      </Grid>
      <Grid>
      <ListOfMovies/>
      {/* <MovieSearchAutoComplete
            // loading={isLoading}
            // items={dataToArray(movieList)}
            // label={"Movie"}
            // name={"movie"}
            // control={control}
            // placeholder={"Movie"}
            // onChange={onChange}
          /> */}
      </Grid>
    </Grid>
  </Paper>
  <Paper sx={{
      pt: 10,
      pl:2,
      pr:2,
      pb:2,
      mt: 2,
      mb: 2,
      maxWidth: 1000,
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    }}>
  <ListOfParticipants/>
  </Paper>
  </div>

  );
}