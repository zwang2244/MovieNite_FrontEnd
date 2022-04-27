import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import "./EventListElement.css";
import moment from "moment";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import GroupIcon from "@mui/icons-material/Group";
import { Button, Divider, FormControl, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MovieSearchAutoComplete from "../components/form/MovieSearchAutoComplete";
import { useForm } from "react-hook-form";
import AutoCompleteWithMulti from "../components/form/AutoCompleteMultiSelect";
import InputText from "../components/form/InputText";
import { InputDateTime } from "../components/form/InputDateTime";
import { useState } from "react";
import { createNewEvent, deleteEvent, updateEvent } from "../api/event";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import AuthButton from "../components/auth-form/auth-button";
import ClickButton from "../components/button/ClickButton";
import { useNavigate } from "react-router";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventListElement(props) {
  //dialog for deletion
  const [delopen, setdelOpen] = React.useState(false);

  const handleClickOpenDeleteDialog = () => {
    setdelOpen(true);
  };

  const handleCloseDeleteDialog = (data) => {
    // console.log(data.event);
    deleteEvent(data.event).then((res) => {
      if (res.code === 1) {
        setdelOpen(false);
        props.onDelete(1);
      }
    });
  };
  //dialog for edition
  const [editopen, seteditOpen] = React.useState(false);

  const handleClickOpenEditDialog = () => {
    seteditOpen(true);
  };

  const handleCloseEditDialog = () => {
    seteditOpen(false);
  };

  const navigate = useNavigate();

  const [defaultValue, setDefaultValue] = useState({
    location: props.location,
    dateTime: props.dateTime,
    invitedFriendList: props.invitedFriendList,
    movie: props.movie,
  });

  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: defaultValue,
  });

  const onSubmit = (data) => {
    // const response = createNewEvent(formatForm(data));
    // console.log(data);
    // console.log(data.dateTime);
    const obj = new Object();
    obj.dateTime = formatDate(data.dateTime);
    obj.eventID = props.event;
    obj.host = props.host.id;
    obj.location = data.location;
    // dateTime
    // console.log(obj);
    // console.log(obj);
    updateEvent(obj).then((res) => {
      props.onEdit(props.index, obj.dateTime, obj.location);
      seteditOpen(false); // close
    });
    // setDefaultValue(data);
  };

  const goEvent = (eventId) => {
    navigate(`/events/${eventId}`, { replace: false });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        ml: "auto",
        mr: "auto",
        mt: 2,
        mb: 2,
        maxWidth: 800,
        borderRadius: "15px",
        boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.16)",
      }}
    >
      <Typography
        sx={{ paddingBottom: 2, paddingTop: 2, paddingLeft: 6 }}
        fontSize={18}
        fontWeight={700}
        component={"div"}
      >
        {props.movie.title}
      </Typography>
      <Divider />
      <Stack
        sx={{
          paddingLeft: 6,
          paddingRight: 6,
          paddingTop: 4,
          paddingBottom: 4,
        }}
        direction={"row"}
        justifyContent={"flex-start"}
      >
        <img width={210} height={315} alt="complex" src={props?.footage} />
        <Stack
          sx={{ width: 1, paddingLeft: "80px", paddingTop: 2 }}
          spacing={4}
        >
          <Stack spacing={5}>
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
                sx={{ pl: 1, width: "115px" }}
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
                  width: "200px",
                }}
              >
                {moment(props.dateTime).format("YYYY-MM-DD HH:mm")}
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
                sx={{ pl: 1, width: "115px" }}
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
                  width: "200px",
                }}
              >
                {props.location}
              </Typography>
            </Stack>
            <Stack
              justifyContent={"flex-start"}
              alignItems={"center"}
              direction={"row"}
            >
              <GroupIcon color={"#212B36"} />
              <Typography
                color={"#212B36"}
                variant="h6"
                display={"inline"}
                sx={{ pl: 1, width: "115px" }}
              >
                Friends
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
                  width: "275px",
                  borderColor: "#919EAB48",
                }}
              >
                {props.invitedFriendList.slice(0, 4).map((friend, index) => (
                  <Box display={"inline"} key={index}>
                    {friend.firstName +
                      (index === props.invitedFriendList.length - 1 ||
                      index === 3
                        ? ""
                        : ", ")}
                  </Box>
                ))}
                {props.invitedFriendList.length > 4 ? " ..." : ""}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            sx={{ width: 1, paddingTop: 3.5 }}
            direction={"row"}
            justifyContent={"flex-end"}
            spacing={3}
          >
            {props.mode && props.mode === "participated" ? (
              ""
            ) : (
              <ClickButton
                height={"40px"}
                color={"#00AB55"}
                backgroundColor={"#fff"}
                backgroundColorAfterHover={"rgba(184,232,184,0.11)"}
                borderColor={"rgba(0,171,85,0.4)"}
                onClick={handleClickOpenEditDialog}
              >
                Edit
              </ClickButton>
            )}

            {props.mode && props.mode === "participated" ? (
              ""
            ) : (
              <ClickButton
                onClick={handleClickOpenDeleteDialog}
                height={"40px"}
                color={"#212B36"}
                backgroundColor={"#DFE3E8"}
                backgroundColorAfterHover={"#d6d9de"}
              >
                Delete
              </ClickButton>
            )}

            <ClickButton
              color={"white"}
              backgroundColor={"#212B36"}
              backgroundColorAfterHover={"#353d4d"}
              height={"40px"}
              onClick={() => goEvent(props.event)}
            >
              More
            </ClickButton>
          </Stack>
        </Stack>
        <Dialog open={editopen} onClose={handleCloseEditDialog}>
          <FormControl
            sx={{ width: "480px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/*Need to be handleSubmit(onSubmit) so that avoid refreshing page*/}
            <DialogTitle>Edit your event</DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <DialogContentText>
                  {/*Edit your choice of a potention movie, friends, time,*/}
                  {/*and location.*/}
                  Edit your location or time
                </DialogContentText>
                {/*Movie */}
                <MovieSearchAutoComplete
                  control={control}
                  name={"movie"}
                  items={[]}
                  label={"Movie"}
                  placeholder={"Enter Movie"}
                  readOnly={true}
                />

                {/*Friends*/}
                <AutoCompleteWithMulti
                  control={control}
                  name={"invitedFriendList"}
                  label={"Friend"}
                  readonly
                  items={[]}
                  readOnly={true}
                  placeholder={"Friends you invite"}
                />

                {/*Input*/}
                <InputText
                  label={"Location"}
                  name={"location"}
                  control={control}
                />

                {/*Time*/}
                <InputDateTime
                  label={"DateTime"}
                  name={"dateTime"}
                  control={control}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Box component={"form"}>
                <Button type={"submit"}>Submit</Button>
              </Box>
            </DialogActions>
          </FormControl>
        </Dialog>

        <Dialog
          open={delopen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDeleteDialog}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Delete this event?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You were going to watch {props.movie.title} with{" "}
              {props.invitedFriendList.map((friend, index) => (
                <Box component={"span"} key={index}>
                  {friend.firstName +
                    (index === props.invitedFriendList.length - 1 ? "" : ", ")}
                </Box>
              ))}{" "}
              at time {moment(props.dateTime).format("YYYY-MM-DD HH:mm")}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleCloseDeleteDialog(props);
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                setdelOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Paper>
  );
}
