import React from "react";
import { Box, Button, Chip, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { LoadingButton, Rating } from "@mui/lab";
import ClickButton from "../button/ClickButton";
import { useNavigate } from "react-router";

function MovieDescription({
  actors,
  director,
  genres,
  official_rating,
  overview,
  poster_path,
  release_date,
  title,
  writer,
  imdbID,
  mode,
  goMovie,
  goEvent,
  eventId,
}) {
  // {...} 这种方式可以取到!
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: 1,
        height: "auto",
        padding: 5,
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      <Box position={"absolute"} sx={{ right: 20, top: 20 }}>
        <Box sx={{ pb: "0px" }}>
          <Typography fontFamily={"Roboto"} component={"div"}>
            <Typography fontSize={20} fontWeight={600} display={"inline"}>
              {official_rating}{" "}
            </Typography>
            /10
          </Typography>
        </Box>
        <Rating
          sx={{ color: "#212b36" }}
          size={"small"}
          name="read-only"
          value={3.6}
          precision={0.1}
          readOnly
        />
      </Box>
      {/*http://img.omdbapi.com/?apikey=fba51be6&i=tt0372784*/}
      <Grid
        container
        justifyContent={"space-between"}
        sx={{ width: 1, height: "100%" }}
        alignItems={"center"}
      >
        <Grid item xs={4} alignItems={"center"}>
          <Paper
            component={"img"}
            elevation={4}
            height={mode == "event" ? 450 : 330}
            // src={
            //   "https://image.tmdb.org/t/p/original/8RW2runSEc34IwKN2D1aPcJd2UL.jpg"
            // }
            src={poster_path}
            // src={`http://img.omdbapi.com/?apikey=fba51be6&i=${imdbID}`}
          ></Paper>
        </Grid>
        <Grid item xs={7.5} justifyContent={"flex-start"} sx={{ pr: 5 }}>
          <Stack spacing={2} justifyContent={"center"}>
            {/*Tag*/}
            {mode === "event" ? (
              <Stack
                direction="row"
                spacing={2}
                sx={{ paddingBottom: 1, width: "500px" }}
              >
                <Typography fontSize={25} fontWeight={600} display={"inline"}>
                  {title}
                </Typography>
                {/* <Stack> */}
                <Box>
                  {genres
                    ? genres.map((item) => (
                        <Chip key={item} label={item} variant="outlined" />
                      ))
                    : ""}
                  {/* </Stack> */}
                </Box>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2} sx={{ paddingBottom: 1 }}>
                {genres
                  ? genres.map((item) => (
                      <Chip key={item} label={item} variant="outlined" />
                    ))
                  : ""}
              </Stack>
            )}
            {/*Description*/}
            <Box>
              <Typography
                textAlign={"left"}
                fontSize={16}
                sx={{ paddingBottom: 1 }}
              >
                {overview}
              </Typography>
            </Box>
            <Divider />
            {/*Director*/}
            <Box sx={{ paddingTop: 0.5 }}>
              <Typography
                textAlign={"left"}
                fontWeight={"600"}
                fontSize={17}
                component={"div"}
              >
                Director
                <Typography sx={{ pl: 0.8 }} display={"inline"} />
                {director?.map((item) => (
                  <Typography key={item} sx={{ pl: 1.3 }} display={"inline"}>
                    {item}
                  </Typography>
                ))}
              </Typography>
            </Box>
            {/*Writors*/}
            <Box>
              <Typography
                textAlign={"left"}
                fontWeight={"600"}
                component={"div"}
              >
                Writers
                <Typography sx={{ pl: 0.8 }} display={"inline"} />
                {writer?.map((item) => (
                  <Typography key={item} sx={{ pl: 1.3 }} display={"inline"}>
                    {item}
                  </Typography>
                ))}
              </Typography>
            </Box>
            <Box>
              <Typography
                textAlign={"left"}
                fontWeight={"600"}
                component={"div"}
              >
                Star
                <Typography sx={{ pl: 0.8 }} display={"inline"} />
                {actors?.map((item) => (
                  <Typography key={item} sx={{ pl: 1.3 }} display={"inline"}>
                    {item}
                  </Typography>
                ))}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      {!goMovie ? null : (
        <>
          <Divider sx={{ mt: 2 }} />
          <Stack
            sx={{ position: "relative", top: "18px" }}
            direction={"row"}
            justifyContent={"flex-end"}
            spacing={2.5}
          >
            {goEvent && (
              <ClickButton
                backgroundColor={"#DFE3E8"}
                backgroundColorAfterHover={"#d7d9e0"}
                color={"#212B36"}
                onClick={() => {
                  navigate(`/events/${eventId}`, { replace: false });
                }}
              >
                Go Event
              </ClickButton>
            )}
            {goMovie && (
              <ClickButton
                backgroundColor={"#212B36"}
                backgroundColorAfterHover={"#1f3148"}
                onClick={() => {
                  navigate(`/search/${imdbID}`, { replace: false });
                }}
              >
                Go Movie
              </ClickButton>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
}

export default MovieDescription;
