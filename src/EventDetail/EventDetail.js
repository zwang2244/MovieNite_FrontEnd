import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Button,
  Box,
  Paper,
  Grid,
  FormControl,
  Typography,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import moment from "moment";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListOfMovies from "./ListOfMovies";
import ListOfParticipants from "./ListOfParticipants";
import "./EventDetail.css";
import { useForm } from "react-hook-form";
import useDebounce from "../hooks/useDebounce";
import { useSearch } from "../hooks/useSearch";
import { dataToArray } from "../utils/dataToArray";
import { useLocation, useNavigate } from "react-router";
import MovieSearchAutoComplete from "../components/form/MovieSearchAutoComplete";
import { useQuery } from "react-query";
import MovieDescription from "../components/movie/MovieDescription";
import {
  getEventInfo,
  voteForMovie,
  unvoteForMovie,
  addParticipant,
  deleteParticipant,
} from "../api/event";
import { getUserInfo } from "../api/user";
import { getAllFriends } from "../api/friends";
import AutoCompleteWithMulti from "../components/form/AutoCompleteMultiSelect";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { useAuth } from "../context/auth-context";
import { useSnackbar } from "notistack";

const defaultValues = {
  movie: "",
  invitedFriendList: [],
};

export default function EventDetail() {
  const { user } = useAuth();
  const userId = user.userID;
  // const userId = 20; // hardcoded
  let { eventId } = useParams();
  // const [currHost, setCurrHost] = useState(0);
  // const [currTopMovie, setCurrTopMovie] = useState({});
  // const [currEvent, setCurrEvent] = useState({});
  // const [currParticipant, setCurrParticipant] = useState([]); // array of objects
  // const [currProposedMovie, setCurrProposedMovie] = useState([]); // array of objects
  // const [isMember, setIsMember] = useState(false);
  const { data: FriendsList, isLoading: loadingFriend } = useQuery(
    "Friends",
    () => getAllFriends(userId),
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
  const { enqueueSnackbar } = useSnackbar();
  const {
    data: eventInfo,
    refetch: refetchData,
    isLoading: isLoadingEvent,
  } = useQuery(["eventInfo", eventId], () => getEventInfo(eventId, userId));
  const {
    data: memberShip,
    refetch: refetchMember,
    isLoading: isLoadingMember,
  } = useQuery(["member", userId], () => getUserInfo(userId));

  const { handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: defaultValues,
  });

  let navigate = useNavigate();
  let { pathname } = useLocation();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const { data: movieList, isLoading } = useSearch(debounceSearch);
  // user null,
  if (isLoadingEvent || isLoadingMember || loadingFriend) {
    return <CircularProgress />;
  }

  const arrayMem = dataToArray(memberShip);
  const isMember = arrayMem.isMember;

  // const getMembership = async () => {
  //   var userData = await getUserInfo(userId);
  //   setIsMember(array.isMember);
  // };

  // const [refresh, setRefresh] = useState(true);

  // ================= after loading

  const array = dataToArray(eventInfo);
  const currHost = array.event.host;
  const currTopMovie = array.movieInfo;
  const currEvent = array.event;
  const currParticipant = [...array.participants];
  const currProposedMovie = [...array.movies];

  const isHost = currHost === userId;
  // const getData = async () => {
  // refetch event info
  //   let eventInfo = await getEventInfo(eventId, userId);
  //   const array = dataToArray(eventInfo);
  //   setCurrHost(array.event.host);
  //   setCurrTopMovie(array.movieInfo);
  //   setCurrEvent(array.event);
  //   setCurrParticipant([...array.participants]);
  //   setCurrProposedMovie([...array.movies]);
  // };

  // useEffect(() => {
  //   getData(); // refetch event info
  // }, [refresh]);
  //
  // useEffect(() => {
  //   getMembership();
  // });

  const handleVote = (index) => {
    var temp = [...currProposedMovie];
    if (temp[index].isVoted) {
      temp[index].isVoted = false;
      var vc = 1;
      if (isMember) vc = 2;
      temp[index].voteCount = temp[index].voteCount - vc;
      unvoteForMovie(eventId, temp[index].imdbID, userId, vc).then(() =>
        refetchData()
      );
    } else {
      temp[index].isVoted = true;
      var vc = 1;
      if (isMember) vc = 2;
      temp[index].voteCount = temp[index].voteCount + vc;
      voteForMovie(eventId, temp[index].imdbID, userId, vc).then(() => {
        refetchData();
      });
    }
    // setCurrProposedMovie(temp);
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (data) => {
    // console.log(data);
    if (data.movie === "" || data.movie === null) return;
    const imdbNumber = data.movie.imdbNumber;
    if (!imdbNumber) return;
    var vc = 1;
    if (isMember) vc = 2;
    voteForMovie(eventId, imdbNumber, userId, vc).then(() => refetchData());
    reset();
  };

  const onInvite = (data) => {
    var newfriendlist = data.invitedFriendList;
    newfriendlist.map((friend) => {
      // [] 遍历一遍
      addParticipant(eventId, friend.userID).then(() => {
        refetchData();
        reset();
      });
    });
  };

  const onKickOut = (userID) => {
    deleteParticipant(eventId, userID).then(() => refetchData());
  };

  return (
    <Stack
      direction={"row"}
      spacing={5}
      sx={{
        width: 1,
        minHeight: "100vh",
        maxHeight: "auto",
        paddingBottom: 10,
        paddingTop: 6,
        paddingLeft: 4,
        backgroundColor: "#f0f2f5",
      }}
      justifyContent={"space-evenly"}
    >
      <Stack sx={{ width: 1000 }} spacing={4}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "12px",
            marginTop: "64px",
            overflow: "hidden",
            marginBottom: "20px",
            boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.16)",
            mb: 2,
            width: 1000,
            maxWidth: 1000,
          }}
        >
          {/* time & location */}
          <Stack
            direction="row"
            justifyContent="flex-start"
            height={90}
            spacing={8}
            sx={{
              paddingLeft: 5,
              paddingRight: 3,
            }}
          >
            <Stack
              justifyContent={"flex-start"}
              alignItems={"center"}
              direction={"row"}
            >
              <MovieFilterIcon color={"#212B36"} />
              <Typography
                color={"#212B36"}
                variant="h6"
                display={"inline"}
                sx={{ pr: 3 }}
              >
                Time
              </Typography>
              <Typography
                display={"inline"}
                color={"#212B36"}
                sx={{
                  borderRadius: "8px",
                  borderStyle: "solid",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  borderColor: "#919EAB48",
                  width: "270px",
                }}
              >
                {moment(currEvent.dateTime).format("YYYY-MM-DD HH:mm")}
              </Typography>
            </Stack>
            <Stack
              justifyContent={"flex-start"}
              alignItems={"center"}
              direction={"row"}
            >
              <LocationOnIcon color={"#212B36"} />
              <Typography
                color={"#212B36"}
                variant="h6"
                display={"inline"}
                sx={{ pr: 3 }}
              >
                Location
              </Typography>
              <Typography
                display={"inline"}
                color={"#212B36"}
                sx={{
                  borderRadius: "8px",
                  borderStyle: "solid",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  borderColor: "#919EAB48",
                  width: "270px",
                }}
              >
                {currEvent.location}
              </Typography>
            </Stack>
          </Stack>
          <Divider variant="middle" />
          {/* Movie Description */}
          <MovieDescription {...currTopMovie} mode="event" />
        </Paper>

        <Paper
          elevation={0}
          sx={{
            paddingTop: 3.5,
            paddingBottom: 4,
            borderRadius: "12px",
            boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.16)",
          }}
        >
          <Typography
            fontSize={22}
            fontWeight={600}
            display={"inline"}
            sx={{ paddingLeft: "70px" }}
          >
            Movie Vote
          </Typography>
          <Stack sx={{ alignItems: "center" }}>
            <ListOfMovies movies={currProposedMovie} handleVote={handleVote} />
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
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
                        p: "0px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: 750,
                      }}
                      elevation={0}
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
                        sx={{
                          width: "100%",
                          backgroundColor: "#212B36",
                          borderRadius: "8px",
                          height: "45px",
                          textTransform: "capitalize",
                          fontWeight: 700,
                          fontSize: "0.92rem",
                          "&:hover": {
                            backgroundColor: "#1f3148",
                          },
                        }}
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
          </Stack>
        </Paper>
      </Stack>
      {/* Movie Proposed & Voting */}

      <Stack sx={{ paddingTop: 8.1, paddingRight: "45px" }}>
        <Paper
          elevation={0}
          sx={{
            // width: 320,
            boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.16)",
            position: "relative",
            maxHeight: "auto",
            minHeight: 750,
            pt: 3,
            pl: 3,
            pr: 3,
            pb: 3,
            borderRadius: "12px",
          }}
        >
          <ListOfParticipants
            participants={currParticipant}
            isHost={currHost === userId}
            onKickOut={onKickOut}
            host={currEvent.host}
            delete={false}
          />
          {isHost && (
            <FormControl
              sx={{ paddingTop: "30px" }}
              onSubmit={handleSubmit(onInvite)}
              noValidate
              autoComplete="off"
            >
              <div className={"container"}>
                <Paper
                  elevation={0}
                  sx={{
                    p: "0px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 300,
                  }}
                >
                  <AutoCompleteWithMulti
                    control={control}
                    name={"invitedFriendList"}
                    label={"Friend"}
                    items={dataToArray(FriendsList).filter(function (el) {
                      return !currParticipant
                        .map((o) => o.userID)
                        .includes(el.userID);
                    })}
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
                    sx={{
                      width: "100%",
                      backgroundColor: "#212B36",
                      borderRadius: "8px",
                      height: "45px",
                      textTransform: "capitalize",
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      "&:hover": {
                        backgroundColor: "#1f3148",
                      },
                    }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Invite
                  </Button>
                </Paper>
              </div>
            </FormControl>
          )}
        </Paper>
      </Stack>
    </Stack>
  );
}
