import * as React from "react";
import Paper from "@mui/material/Paper";
import { Button, Stack, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import ListOfMovieGerneScore from "./ListOfMovieGerneScore";
import Box from "@mui/material/Box";
import AutoCompleteSelect from "../components/form/AutoCompleteSelect";
import { useForm } from "react-hook-form";
import { InputDate } from "../components/form/InputDate";
import { GenreOptions } from "../_mock/genre";
import convertArrayToLabel from "../utils/convertArrayToLabel";
import { getMovieOfGenreWithHighScores } from "../api/genreWithHighScores";
import moment from "moment";
import { dataToArray } from "../utils/dataToArray";
import AuthButton from "../components/auth-form/auth-button";

const defaultValues = {
  genre: {},
  date: null,
};

const items = convertArrayToLabel(GenreOptions);
// console.log(items);

export default function HighScoreForm() {
  const [currData, setCurrData] = React.useState([]);
  const { handleSubmit, control } = useForm({ defaultValues: defaultValues });

  const onSubmit = (data) => {
    // console.log(data);
    getMovieOfGenreWithHighScores(
      data.genre.label,
      moment(data.date).format("YYYY-MM-DD")
    ).then((res) => setCurrData(dataToArray(res)));
  };
  // console.log("This is Current Data");
  // console.log(currData);
  return (
    <Box>
      <Typography
        sx={{ pl: 1, pb: 2 }}
        fontSize={18}
        fontWeight={700}
        textAlign={"left"}
      >
        Movies of a Genre with High Scores
      </Typography>
      <Paper
        elevation={0}
        sx={{
          pt: 4,
          width: "500px",
          borderRadius: "16px",
          boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.16)",
          borderColor: "#919EAB20",
          borderStyle: "solid",
          borderWidth: 1,
          maxHeight: 500,
        }}
      >
        <Stack
          sx={{ width: 1, height: "100%" }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack spacing={3} onSubmit={handleSubmit(onSubmit)}>
            <AutoCompleteSelect
              label={"Genre"}
              control={control}
              placeholder={"Type a genre"}
              items={items}
              name={"genre"}
            />

            <InputDate name={"date"} control={control} label={"From Date"} />

            <AuthButton>See the results</AuthButton>
            {/*<Box component={"form"}>*/}
            {/*  <Button sx={{ width: "100%" }} variant="contained" type={"submit"}>*/}
            {/*    */}
            {/*  </Button>*/}
            {/*</Box>*/}
          </Stack>
          <ListOfMovieGerneScore currData={currData} />
        </Stack>
      </Paper>
    </Box>
  );
}
