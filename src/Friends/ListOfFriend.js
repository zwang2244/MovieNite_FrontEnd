import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useQuery } from "react-query";
import { getTrendAmongFriends } from "../api/friends";
import { dataToArray } from "../utils/dataToArray";
import { CircularProgress, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import MovieSlider from "../components/carousel/MovieSlider";
import { useAuth } from "../context/auth-context";

export default function ListOfFriend() {
  const { user } = useAuth();
  const userId = user.userID;
  // react-query
  const { data, isLoading } = useQuery(
    "trendingAmongFriends",
    () => getTrendAmongFriends(userId),
    {
      retryOnMount: true,
    }
  );
  if (isLoading) {
    return <CircularProgress />;
  }

  const array = dataToArray(data);
  console.log(array);
  const movieArray = [];
  for (let i = 0; i < array.length; i++) {
    movieArray.push(array[i].movieInfo);
  }
  return (
    <Paper elevation={0} sx={{ borderRadius: "15px", height: "auto" }}>
      <Stack>
        <Typography
          fontSize={18}
          fontWeight={700}
          textAlign={"left"}
          component={"div"}
          sx={{ pb: 1.5 }}
        >
          Trending
          <Typography
            fontSize={16}
            textAlign={"left"}
            // color={"#637381"}
            display={"inline"}
          >
            {" "}
            among your friends
          </Typography>
        </Typography>
        <MovieSlider movieItems={movieArray} />

        {/*<Stack alignItems={"center"}>*/}
        {/*  <List*/}
        {/*    sx={{*/}
        {/*      width: "100%",*/}
        {/*      maxWidth: 360,*/}
        {/*      bgcolor: "background.paper",*/}
        {/*      overflow: "auto",*/}
        {/*      maxHeight: 300,*/}
        {/*      height: "auto",*/}
        {/*      "& ul": { padding: 0 },*/}
        {/*      m: 2,*/}
        {/*    }}*/}
        {/*    subheader={<li />}*/}
        {/*  >*/}
        {/*    <ListItem key={"1"} sx={{ padding: 2 }}>*/}
        {/*      <ListItemText*/}
        {/*        sx={{ width: "80%" }}*/}
        {/*        primaryTypographyProps={{*/}
        {/*          fontSize: 16,*/}
        {/*          fontWeight: 700,*/}
        {/*          color: "#212B36",*/}
        {/*        }}*/}
        {/*        primary={"Movie"}*/}
        {/*      />*/}
        {/*      <ListItemText*/}
        {/*        sx={{ width: "20%" }}*/}
        {/*        primary={"Vote"}*/}
        {/*        primaryTypographyProps={{*/}
        {/*          fontSize: 16,*/}
        {/*          fontWeight: 700,*/}
        {/*          color: "#212B36",*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </ListItem>*/}
        {/*    {isLoading && <CircularProgress />}*/}
        {/*    {!isLoading &&*/}
        {/*      dataToArray(data).map((item, index) => (*/}
        {/*        <ListItem key={index}>*/}
        {/*          <ListItemButton>*/}
        {/*            <ListItemText sx={{ width: "80%" }} primary={item.title} />*/}
        {/*            <ListItemText sx={{ width: "20%" }} primary={item.votes} />*/}
        {/*          </ListItemButton>*/}
        {/*        </ListItem>*/}
        {/*      ))}*/}
        {/*  </List>*/}
        {/*</Stack>*/}
      </Stack>
    </Paper>
  );
}
