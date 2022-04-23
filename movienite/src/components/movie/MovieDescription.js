import React from "react";
import { Box, Chip, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Rating } from "@mui/lab";

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
}) {
  // {...} 这种方式可以取到!

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
            height={330}
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
            <Stack direction="row" spacing={2} sx={{ paddingBottom: 1 }}>
              {genres.map((item) => (
                <Chip key={item} label={item} variant="outlined" />
              ))}
            </Stack>
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
    </Box>
  );
}

export default MovieDescription;
