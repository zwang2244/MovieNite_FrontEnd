import React, { useState } from "react";
import { useParams } from "react-router";
import {
  Avatar,
  Box,
  CircularProgress,
  Collapse,
  FormControl,
  IconButton,
  TextField,
  Zoom,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";
import MovieDescription from "../../components/movie/MovieDescription";
import MovieInputSearch from "../../components/movie/MovieInputSearch";
import { useForm } from "react-hook-form";
import UserComment from "../../components/movie/UserComment";
import commentData from "../../_mock/json/comments.json";
import { isNullOrWhitespace } from "../../utils/checkIfStringIsValid";
import { TransitionGroup } from "react-transition-group";
import { useQuery } from "react-query";
import { getMovieEvents } from "../../api/event";
import { getMovieById } from "../../api/movie";

const URL = "https://image.tmdb.org/t/p/original/";

// batman url:
const defaultValues = {
  comment: "",
};

const buildData = (comment) => {
  const userId = "30";
  const userAvatar = "";
  const userName = "Mike Pop";
  const time = new Date();
  const imdbId = "";
  return {
    userId,
    userAvatar,
    userName,
    time,
    imdbId,
    comment,
  };
};

function MovieDetail(props) {
  let params = useParams();
  // console.log("Detail==============");
  // console.log(params);
  const { imdbId } = params;
  const [comments, setComments] = useState(commentData.comments);

  const { data: movieInfo, isLoading: isMovieInfoLoading } = useQuery(
    ["movieId", imdbId],
    () => getMovieById(imdbId),
    {
      retry: false,
    }
  );
  const { handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: defaultValues,
  });

  if (isMovieInfoLoading) {
    return <CircularProgress />;
  }
  console.log(JSON.parse(movieInfo.data));
  const movieDetail = JSON.parse(movieInfo.data);
  const { backdrop_path, title } = movieDetail;
  //{actors,backdrop_path,director, genres, official_rating,overview,poster_path,release_date,title,writer, imdbID}
  const onSubmit = (data) => {
    // TODO SnackBar
    console.log(data);
    const { comment } = data;
    if (isNullOrWhitespace(comment)) {
      console.log(comment);
      return; // TODO tell users to input something
    }
    // get new data
    /**
     * UserId
     * User Avatar
     * UserName
     * Time
     * Comments
     * ImdbId
     */
    const newItem = buildData(comment);
    reset(defaultValues);
    addOneComment(newItem);
  };

  const addOneComment = (newItem) => {
    setComments((prevState) => {
      return [newItem, ...prevState];
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: 15,
        backgroundColor: "#f0f2f5",
        width: 1,
        height: "auto",
        paddingBottom: 10,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          borderWidth: 10,
          // width: 1200,
          width: 1000,
          height: 400,
          borderColor: "#000",
          position: "relative",
          background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5) ), url(${backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center 55%",
          opacity: 1,
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            left: 20,
            bottom: 0,
            color: "#FFFEFE",
            fontWeight: "500",
          }}
          variant="h3"
          component="div"
          gutterBottom
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 5,
          paddingBottom: 8,
          width: 1000,
          height: "auto",
          overflow: "hidden",
          borderRadius: 3,
          backgroundColor: "#ffffff",
          // p: 5,
        }}
      >
        <MovieDescription {...movieDetail} />
        {/*<MovieDetail />*/}
        <Divider sx={{ marginTop: 0.5 }} />
        <Box sx={{ paddingTop: 4, pl: 10, pr: 10, width: 1 }}>
          <Box>
            <Typography textAlign={"left"} fontSize={19} fontWeight={600}>
              Comments
            </Typography>
          </Box>
          {/*Comments Input*/}
          <FormControl
            sx={{ width: 1, paddingBottom: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box sx={{ mt: 3 }}>
              <Grid
                container
                wrap="nowrap"
                spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid item>
                  <Avatar alt="Remy Sharp" />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <Box
                    sx={{
                      padding: "3px 0 0 0",
                      borderWidth: 1,
                      borderRadius: 4,
                    }}
                  >
                    <MovieInputSearch
                      control={control}
                      placeholder={"Write a comment..."}
                      name={"comment"}
                      label={"Comment"}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box component={"form"}>
                    <IconButton type={"submit"} sx={{ m: 0 }}>
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </FormControl>
          <TransitionGroup>
            {comments?.map((item) => (
              <Collapse key={item.userId + item.time}>
                <UserComment {...item} />
              </Collapse>
            ))}
          </TransitionGroup>
        </Box>
      </Box>
    </Box>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
}));

const styles = {
  backdropContainer: {
    // background: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5) ), url(${URL}8RW2runSEc34IwKN2D1aPcJd2UL.jpg)`,
    // backgroundSize: "cover",
    // backgroundPosition: "center 55%",
    // opacity: 1,
  },
};

export default MovieDetail;
