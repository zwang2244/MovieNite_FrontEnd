import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllFriends } from "../api/friends";
import {
  Button,
  Paper,
  Grid,
  FormControl,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AutoCompleteWithMulti from "../components/form/AutoCompleteMultiSelect";
import { dataToArray } from "../utils/dataToArray";
import ListOfParticipants from "../EventDetail/ListOfParticipants";
import useDebounce from "../hooks/useDebounce";
import { useSearchFriend } from "../hooks/useSearchFriend";
import MovieSearchAutoComplete from "../components/form/MovieSearchAutoComplete";
import { useLocation, useNavigate } from "react-router";
import { addFriends, deleteFriends } from "../api/friends";
import { ViewColumn } from "@mui/icons-material";
import { useAuth } from "../context/auth-context";
const defaultValues = {};
// change hardcode 20
export default function AddDeleteFriends() {
  const { user } = useAuth();
  const userId = user.userID;
  const { handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: defaultValues,
  });

  let navigate = useNavigate();
  let { pathname } = useLocation();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const { data: peoplelist, isLoading } = useSearchFriend(
    debounceSearch,
    userId
  );
  const [refresh, setRefresh] = useState(true);
  const [FriendsList, setFriendsList] = useState([]);
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
    addFriends(userId, data.friend.userID).then(() =>
      refresh ? setRefresh(false) : setRefresh(true)
    );
    reset();
  };

  const getData = async () => {
    var temp = await getAllFriends(userId);
    setFriendsList(dataToArray(temp));
    console.log(dataToArray(temp));
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  const onKickOut = (userID) => {
    // deleteParticipant(eventId,userID).then(()=>refresh? setRefresh(false):setRefresh(true));
    deleteFriends(userId, userID).then(() =>
      refresh ? setRefresh(false) : setRefresh(true)
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f0f2f5",
        paddingTop: "60px",
        alignItems: "center",
        width: 1,
        height: `calc(100vh)`,
        display: "flex",
        justifyContent: "center",
        minHeight: 700,
      }}
    >
      <Paper
        sx={{
          p: "7px 10px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: 720,
          borderRadius: "18px",
          boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.16)",
        }}
        elevation={0}
      >
        <ListOfParticipants
          mode={"Friends"}
          participants={FriendsList}
          isHost={true}
          onKickOut={onKickOut}
          host={userId}
        />
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
                p: "3px 0px",
                display: "flex",
                alignItems: "center",
                width: 600,
              }}
              elevation={0}
            >
              <MovieSearchAutoComplete
                loading={isLoading}
                items={dataToArray(peoplelist)}
                label={"Friend Search"}
                name={"friend"}
                control={control}
                placeholder={"Friends"}
                onChange={onChange}
                readOnly={false}
                mode={"friends"}
              />
            </Paper>
          </div>

          <div className={"container"}>
            <Paper
              component="form"
              sx={{
                p: "2px 0px",
                display: "flex",
                alignItems: "center",
                width: 600,
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
                Add
              </Button>
            </Paper>
          </div>
        </FormControl>
      </Paper>
    </Box>
  );
}
