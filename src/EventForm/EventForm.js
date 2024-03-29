import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Divider, FormControl, Stack } from "@mui/material";
import { Button } from "@mui/material";
import "./EventForm.css";
import { useForm } from "react-hook-form";
import MovieSearchAutoComplete from "../components/form/MovieSearchAutoComplete";
import AutoCompleteWithMulti from "../components/form/AutoCompleteMultiSelect";
import { InputDateTime } from "../components/form/InputDateTime";
import InputText from "../components/form/InputText";
import convertArrayToLabel from "../utils/convertArrayToLabel";
import useDebounce from "../hooks/useDebounce";
import { useSearch } from "../hooks/useSearch";
import { dataToArray } from "../utils/dataToArray";
import { useQuery } from "react-query";
import { getAllFriends } from "../api/friends";
import moment from "moment";
import { formatDate } from "../utils/formatDate";
import { formatForm, FormatForm } from "../utils/formatForm";
import { createNewEvent } from "../api/event";
import { useSnackbar } from "notistack";
import { getUserInfo } from "../api/user";
import AuthButton from "../components/auth-form/auth-button";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router";

export const MovieSearchOptions = convertArrayToLabel([
  "Uncharted",
  "Pulp Fiction",
  "Spirited Away",
  "The Dark Knight",
  "The Matrix",
  "Spider-Man: Into the Spider-Verse",
]);

export const FriendLists = [
  { label: "Oliver Hansen" },
  { label: "Van Henry" },
  { label: "April Tucker" },
  { label: "Ralph Hubbard" },
  { label: "Omar Alexander" },
  { label: "Carlos Abbott" },
  { label: "Miriam Wagner" },
  { label: "Bradley Wilkerson" },
  { label: "Kelly Snyder" },
  { label: "Beatriz" },
  { label: "Hanna" },
  { label: "Joel" },
  { label: "Eric" },
  { label: "Charles" },
];

const defaultValues = {
  location: "",
  dateTime: new Date(),
  invitedFriendList: [],
  movie: "",
};

export default function EventForm() {
  const { handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: defaultValues,
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  // console.log("This is userrrrr");
  // console.log(user);
  const userId = user.userID;
  // console.log(userId);
  const [search, setSearch] = useState("");
  const [isMember, setIsMember] = useState(false);
  const debounceSearch = useDebounce(search, 500);
  const { data: movieList, isLoading } = useSearch(debounceSearch);
  const { data: FriendsList, isLoading: loadingFriend } = useQuery(
    "Friends",
    () => getAllFriends(userId),
    {
      // staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
  const { enqueueSnackbar } = useSnackbar();
  const action = (key) => (
    <React.Fragment>
      <Button
        sx={{ color: "#ffffff", textTransform: "capitalize" }}
        onClick={() => {
          navigate(`/events/${key}`, { replace: false });
        }}
      >
        See event detail
      </Button>
    </React.Fragment>
  );
  const SnackBarToEvent = (eventId) => {
    enqueueSnackbar("Add a new Event", {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      key: eventId,
      variant: "success",
      action,
    });
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const getMembership = async () => {
    var userData = await getUserInfo(userId);
    const array = dataToArray(userData);
    setIsMember(array.isMember);
  };
  useEffect(() => {
    getMembership();
  });

  const onSubmit = (data) => {
    // console.log(data);
    const response = createNewEvent(formatForm(data, isMember, userId));
    // console.log(data);
    response.then((data) => {
      if (data.code === 1) {
        // console.log("We got this point");
        // eventId.
        reset(defaultValues);
        const eventId = data.data;
        SnackBarToEvent(eventId);
        // SnackBarToEvent()
      }
    });
  };
  return (
    <FormControl
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: 1 }}
      noValidate
      autoComplete="off"
    >
      <Stack sx={{ width: 1 }} spacing={4}>
        <Stack sx={{ width: 1 }} spacing={3}>
          <MovieSearchAutoComplete
            loading={isLoading}
            items={dataToArray(movieList)}
            label={"Movie"}
            name={"movie"}
            control={control}
            placeholder={"Movie"}
            onChange={onChange}
          />
          <InputText label={"Location"} name={"location"} control={control} />

          <AutoCompleteWithMulti
            control={control}
            name={"invitedFriendList"}
            label={"Friend"}
            items={dataToArray(FriendsList)}
            placeholder={"Invite your friends"}
          />
          <InputDateTime
            label={"DateTime"}
            name={"dateTime"}
            control={control}
          />
        </Stack>
        <AuthButton>Schedule</AuthButton>
      </Stack>
    </FormControl>
  );
}
