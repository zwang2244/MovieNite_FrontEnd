import React, { useEffect, useState } from "react";
import {useParams} from 'react-router';
import {Button, Box, Paper, Grid, FormControl, Typography, Divider} from '@mui/material';
import moment from "moment";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListOfMovies from "./ListOfMovies";
import ListOfParticipants from "./ListOfParticipants";
import "./EventDetail.css"
import { useForm } from "react-hook-form";
import useDebounce from "../hooks/useDebounce";
import { useSearch } from "../hooks/useSearch";
import { dataToArray } from "../utils/dataToArray";
import { useLocation, useNavigate } from "react-router";
import MovieSearchAutoComplete from "../components/form/MovieSearchAutoComplete";
import {useQuery} from 'react-query';
import MovieDescription from "../components/movie/MovieDescription";
import { getEventInfo, voteForMovie, unvoteForMovie, addParticipant, deleteParticipant } from "../api/event";
import { getUserInfo } from "../api/user";
import { getAllFriends } from "../api/friends";
import AutoCompleteWithMulti from "../components/form/AutoCompleteMultiSelect";

const defaultValues = {
  movie: "",
};

export default function EventDetail() {
  const userId = 20; // hardcoded
  let {eventId} = useParams();
  const [currHost, setCurrHost] = useState(0);
  const [currTopMovie, setCurrTopMovie] = useState({});
  const [currEvent, setCurrEvent] = useState({});
  const [currParticipant, setCurrParticipant] = useState([]); // array of objects
  const [currProposedMovie, setCurrProposedMovie] = useState([]); // array of objects
  const [isMember, setIsMember] = useState(false);
  const {data: FriendsList, isLoading: loadingFriend} = useQuery("Friends", () => getAllFriends(userId), {
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const [refresh, setRefresh] = useState(true);
  
  const getData = async() => {
    var eventInfo = await getEventInfo(eventId, userId)
    const array = dataToArray(eventInfo);
    setCurrHost(array.event.host);
    setCurrTopMovie(array.movieInfo);
    setCurrEvent(array.event);
    setCurrParticipant([...array.participants]);
    setCurrProposedMovie([...array.movies]);
  }

  const getMembership = async() => {
    var userData = await getUserInfo(userId);
    const array = dataToArray(userData);
    setIsMember(array.isMember);
  }

  useEffect(() => {
    getData();
  }, [refresh]);

  useEffect(() => {
    getMembership();
  });


  const handleVote = (index) =>{
    var temp = [...currProposedMovie];
    if(temp[index].isVoted){
      temp[index].isVoted = false;
      var vc = 1;
      if(isMember) vc = 2;
      temp[index].voteCount = temp[index].voteCount - vc;
      unvoteForMovie(eventId,temp[index].imdbID,userId,vc).then(()=>refresh? setRefresh(false):setRefresh(true));
    }else{
      temp[index].isVoted = true;
      var vc = 1;
      if(isMember) vc = 2;
      temp[index].voteCount = temp[index].voteCount + vc;
      voteForMovie(eventId,temp[index].imdbID,userId,vc).then(()=>refresh? setRefresh(false):setRefresh(true));
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
    var vc = 1;
    if(isMember) vc = 2;
    var temp = [...currProposedMovie];
    temp.push({imdbID:imdbNumber, title:data.movie.title, voteCount:vc, isVoted:true});
    setCurrProposedMovie(temp);
    voteForMovie(eventId,imdbNumber,userId,vc).then(()=>refresh? setRefresh(false):setRefresh(true));
    reset();
  };

  const onInvite = (data) => {
    var newfriendlist = data.invitedFriendList;
    newfriendlist.map((friend)=>{addParticipant(eventId,friend.userID).then(()=>refresh? setRefresh(false):setRefresh(true));});
    reset();
  }

  const onKickOut = (userID) => {
    deleteParticipant(eventId,userID).then(()=>refresh? setRefresh(false):setRefresh(true));
  }
  
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
    <Grid container direction="column" justifyContent="space-between" height={80} >
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
      <ListOfParticipants participants={currParticipant} isHost={currHost === userId} onKickOut={onKickOut} host={userId}/>
      <FormControl
        onSubmit={handleSubmit(onInvite)}
        noValidate
        autoComplete="off"
      >
        <div className={"container"}>
          <Paper
              sx={{
                p: "7px 10px",
                display: "flex",
                alignItems: "center",
                width: 300,
              }}
            >
              <AutoCompleteWithMulti
                control={control}
                name={"invitedFriendList"}
                label={"Friend"}
                items={dataToArray(FriendsList).filter(function (el)
                  {return !currParticipant.map((o) => o.userID).includes(el.userID)})}
                placeholder={"Invite your friends"}
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
              width: 300,
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
              Invite
            </Button>
        </Paper>
      </div>
      </FormControl>
  </Paper>
  </div>
  );
}