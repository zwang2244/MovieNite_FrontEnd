import React, { useEffect, useState } from "react";
import {useParams} from 'react-router';
import {Button, Box, Paper, Grid, ButtonBase, FormControl, Typography, Divider} from '@mui/material';
import moment from "moment";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListOfMovies from "./ListOfMovies";
import ListOfParticipants from "./ListOfParticipants";
import { styled } from "@mui/material/styles";
import "./EventDetail.css"
import { useForm } from "react-hook-form";
import useDebounce from "../hooks/useDebounce";
import { useSearch } from "../hooks/useSearch";
import { dataToArray } from "../utils/dataToArray";
import { useLocation, useNavigate } from "react-router";
import MovieSearchAutoComplete from "../components/form/MovieSearchAutoComplete";
import {useQuery} from 'react-query';
import {formatDataToForm} from '../utils/formatForm';
import MovieDescription from "../components/movie/MovieDescription";
import { getEventInfo } from "../api/event";
const defaultValues = {
  movie: "",
};

export default function EventDetail() {
  const userId = 20; // hardcoded
  let {eventId} = useParams();
  const [currTopMovie, setCurrTopMovie] = useState({});
  const [currEvent, setCurrEvent] = useState({});
  const [currParticipant, setCurrParticipant] = useState([]); // array of objects
  const [currProposedMovie, setCurrProposedMovie] = useState([]); // array of objects
  const {data: eventInfo, isLoading: eventInfoLoading} = useQuery(['eventInfo', userId, eventId], 
  () => getEventInfo(eventId, userId), {});

  useEffect(() => {
    if (eventInfo && !eventInfoLoading) {
      const array = dataToArray(eventInfo)
      // const dataCopy = [...array];
      // setCurrData(formatDataToForm(dataCopy));
      console.log(array);
      console.log(array.movieInfo);
      setCurrTopMovie(array.movieInfo);
      setCurrEvent(array.event);
      setCurrParticipant([...array.participants]);
      setCurrProposedMovie([...array.movies]);
      // console.log("===============");
      // console.log("Current top movie for this event:");
      // console.log(currTopMovie);
      // console.log("Current participants for this event:");
      // console.log(currParticipant);
      // console.log("Current proposed movies for this event:");
      // console.log(currProposedMovie);
      // console.log("Current event for this event:");
      // console.log(currEvent);
      // console.log("===============");
    }
  }, [eventInfo]);

  const handleVote = (index) =>{
    var temp = [...currProposedMovie];
    if(temp[index].isVoted){
      temp[index].isVoted = false;
      temp[index].voteCount--;
    }else{
      temp[index].isVoted = true;
      temp[index].voteCount++;
    }
    setCurrProposedMovie(temp);
  }

  const { handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: defaultValues,
  });

  let navigate = useNavigate();
  let { pathname } = useLocation();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const { data: movieList, isLoading } = useSearch(debounceSearch);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (data.movie === "" || data.movie === null) return;
    const imdbNumber = data.movie.imdbNumber;
    if (!imdbNumber) return;
    console.log("========");
    console.log(imdbNumber);
    var temp = [...currProposedMovie];
    temp.push({imdbID:imdbNumber, title:data.movie.title, voteCount:1, isVoted:true});
    setCurrProposedMovie(temp);
    reset();
  };

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
    {/* time & location */}
    <Grid xs container direction="column" justifyContent="space-between" height={80} >
        <div className="time_location">
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
            {moment(currEvent.dateTime).format("YYYY-MM-DD HH:mm")}
          </Box>
        </div>

        <div className="time_location">
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
            {currEvent.location}
          </Box>
        </div>
    </Grid>
    <Divider variant="middle" sx={{p:2}}/>
    {/* Movie Description */}
    <MovieDescription {...currTopMovie} mode="event"/>
    <Divider variant="middle" sx={{mb:2}}/>
    {/* Movie Proposed & Voting */}
    <Grid container  direction="row" justifyContent="center" alignItems="center">
      <ListOfMovies movies={currProposedMovie} handleVote={handleVote}/>
      <Box
      sx={{
        alignItems: "center",
        width: 1,
        display: "flex",
        justifyContent: "center",
      }}
      >
      <FormControl
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <div className={"container"}>
          <Paper
            sx={{
              p: "7px 10px",
              display: "flex",
              alignItems: "center",
              width: 750,
            }}
            elevation={1}
          >
            <MovieSearchAutoComplete
              loading={isLoading}
              items={dataToArray(movieList)}
              label={"Movie Search"}
              name={"movie"}
              control={control}
              placeholder={"Movie"}
              onChange={onChange}
              readOnly={false}
            />
          </Paper>
        </div>

        <div className={"container"}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 750,
              justifyContent: "space-evenly",
            }}
            elevation={0}
          >
            <Button
              sx={{ width: "100%" }}
              size="large"
              variant="contained"
              type="submit"
            >
              Insert
            </Button>
          </Paper>
        </div>
      </FormControl>
      </Box>
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
      <ListOfParticipants participants={currParticipant}/>
  </Paper>
  </div>
  );
}