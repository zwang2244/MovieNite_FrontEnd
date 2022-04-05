import * as React from "react";
import Paper from "@mui/material/Paper";
import { Button, Stack } from "@mui/material";
import { TextField } from "@mui/material";
import ListOfMovieGerneScore from "./ListOfMovieGerneScore";
import Box from "@mui/material/Box";
import AutoCompleteSelect from "../components/form/AutoCompleteSelect";
import { useForm } from "react-hook-form";
import { InputDate } from "../components/form/InputDate";
import { GenreOptions } from "../_mock/genre";
import convertArrayToLabel from '../utils/convertArrayToLabel';
import { getMovieOfGenreWithHighScores } from "../api/genreWithHighScores";
import moment from "moment";
import { dataToArray } from "../utils/dataToArray";

const defaultValues = {
  genre: {},
  date: null
};

const items = convertArrayToLabel(GenreOptions);
console.log(items);

export default function HighScoreForm() {
  const [currData, setCurrData] = React.useState([]);
  const { handleSubmit, control } = useForm({ defaultValues: defaultValues });

  const onSubmit = (data) => {
    console.log(data);
    getMovieOfGenreWithHighScores(data.genre.label,moment(data.date).format("YYYY-MM-DD")).then(
        res=> setCurrData(dataToArray(res))
    );
  }
  return (
    <div>
      <Box
        sx={{
          p: "30px 10px 10px 10px",
          display: "flex",
          alignItems: "center",
          width: 500,
          flexDirection: "column",
        }}
        elevation={1}
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

          <Box component={'form'}>
            <Button
                sx={{ width: "100%" }}
                variant="contained"
                type={'submit'}
            >
              See the results
            </Button>
          </Box>
        </Stack>

        <ListOfMovieGerneScore currData={currData} />
      </Box>
    </div>
  );
}
