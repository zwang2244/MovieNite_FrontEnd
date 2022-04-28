import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Collapse,
  Divider,
  FormControl,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import EventListElement from "../../Event/EventListElement";
import Box from "@mui/material/Box";

import { useForm } from "react-hook-form";
import useDebounce from "../../hooks/useDebounce";
import { useSearch } from "../../hooks/useSearch";
import Paper from "@mui/material/Paper";
import MovieSearchAutoComplete from "../../components/form/MovieSearchAutoComplete";
import { dataToArray } from "../../utils/dataToArray";
import { useLocation, useNavigate } from "react-router";
import AuthButton from "../../components/auth-form/auth-button";

const defaultValues = {
  movie: "",
};

function Index(props) {
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
    // console.log("========");
    // console.log(imdbNumber);
    navigate(`${pathname}/${imdbNumber}`);
  };
  return (
    <Box
      sx={{
        alignItems: "center",
        width: 1,
        height: `calc(100vh - ${60}px)`,
        display: "flex",
        justifyContent: "center",
        minHeight: 700,
      }}
    >
      <FormControl
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          padding: "20px",
          margin: "20px",
        }}
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
              width: 740,
              justifyContent: "space-evenly",
            }}
            elevation={0}
          >
            <Button
              sx={{
                width: "100%",
                backgroundColor: "#212B36",
                borderRadius: "12px",
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
              Search
            </Button>
          </Paper>
        </div>
      </FormControl>
    </Box>
  );
}

export default Index;
