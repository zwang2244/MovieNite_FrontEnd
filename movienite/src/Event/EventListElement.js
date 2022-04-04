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
import { TextField } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MovieSearchAutoComplete from "../components/form/MovieSearchAutoComplete";
import { useForm } from "react-hook-form";
import EventForm, {
  FriendLists,
  MovieSearchOptions,
} from "../EventForm/EventForm";
import AutoCompleteWithMulti from "../components/form/AutoCompleteMultiSelect";
import InputText from "../components/form/InputText";
import { InputDateTime } from "../components/form/InputDateTime";
import convertArrayToLabel from "../utils/convertArrayToLabel";
import { useState } from "react";

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

  const handleCloseDeleteDialog = () => {
    setdelOpen(false);
  };
  //dialog for edition
  const [editopen, seteditOpen] = React.useState(false);

  const handleClickOpenEditDialog = () => {
    seteditOpen(true);
  };

  const handleCloseEditDialog = () => {
    seteditOpen(false);
  };
  // const defaultValue = {
  //   location: props.location,
  //   dateTime: props.time,
  //   invitedFriendList: convertArrayToLabel(props.invited),
  //   movie: {
  //     label: props.movie.name,
  //   },
  // };

  const [defaultValue, setDefaultValue] = useState({
    location: props.location,
    dateTime: props.time,
    invitedFriendList: convertArrayToLabel(props.invited),
    movie: {
      label: props.movie.name,
    },
  });

  // const {location, dateTime, movie, invitedFriendList} = defaultValue;

  // console.log('____________');
  // console.log(defaultValue);

  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: defaultValue,
  });

  const onSubmit = (data) => {
    console.log(data);
    props.onEdit(props.index, data);
    seteditOpen(false); // close
    // setDefaultValue(data);
  };
  return (
    <Paper
      sx={{
        p: 2,
        ml: "auto",
        mr: "auto",
        mt: 2,
        mb: 2,
        maxWidth: 800,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 300, height: 300 }}>
            <Img alt="complex" src={props.movie.footage} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <div className="row_container">
                <LiveTvIcon />
                <Typography variant="h6" component="div">
                  Watch
                </Typography>
                <Box
                  sx={{
                    bgcolor: "primary.main",
                    border: 1,
                    borderRadius: 10,
                    color: "primary.contrastText",
                    borderColor: "primary.main",
                    width: "200px",
                    ml: 2,
                    typography: "h6",
                  }}
                >
                  {props.movie.name}
                </Box>
              </div>
              <div className="row_container">
                <GroupIcon />
                <Typography variant="h6" component="div">
                  With
                </Typography>
                <Box
                  sx={{
                    bgcolor: "primary.main",
                    border: 1,
                    borderRadius: 10,
                    color: "primary.contrastText",
                    borderColor: "primary.main",
                    width: "200px",
                    ml: 4,
                    typography: "h6",
                  }}
                >
                  {props.invited.map((friend, index) => (
                    <Box display={"inline"} key={index}>
                      {friend +
                        (index === props.invited.length - 1 ? "" : ", ")}
                    </Box>
                  ))}
                </Box>
              </div>

              <div className="row_container">
                <MovieFilterIcon />
                <Typography variant="h6" component="div">
                  At
                </Typography>
                <Box
                  sx={{
                    bgcolor: "primary.main",
                    border: 1,
                    borderRadius: 10,
                    color: "primary.contrastText",
                    borderColor: "primary.main",
                    width: "200px",
                    ml: 7,
                    typography: "h6",
                  }}
                >
                  {moment(props.time).format("YYYY-MM-DD HH:mm")}
                </Box>
              </div>

              <div className="row_container">
                <LocationOnIcon />
                <Typography variant="h6" component="div">
                  At
                </Typography>
                <Box
                  sx={{
                    bgcolor: "primary.main",
                    border: 1,
                    borderRadius: 10,
                    color: "primary.contrastText",
                    borderColor: "primary.main",
                    width: "200px",
                    ml: 7,
                    typography: "h6",
                  }}
                >
                  {props.location}
                </Box>
              </div>
            </Grid>
            <Grid item>
              <Button
                sx={{ mr: 3 }}
                variant="outlined"
                onClick={handleClickOpenEditDialog}
              >
                Edit
              </Button>

              <Dialog open={editopen} onClose={handleCloseEditDialog}>
                <FormControl onSubmit={handleSubmit(onSubmit)}>
                  {/*Need to be handleSubmit(onSubmit) so that avoid refreshing page*/}
                  <DialogTitle>Edit your event</DialogTitle>
                  <DialogContent>
                    <Stack spacing={3}>
                      <DialogContentText>
                        Edit your choice of a potention movie, friends, time,
                        and location.
                      </DialogContentText>
                      {/*Movie */}
                      <MovieSearchAutoComplete
                        control={control}
                        name={"movie"}
                        items={MovieSearchOptions}
                        label={"Movie"}
                        placeholder={"Enter Movie"}
                      />
                      {/*Input*/}
                      <InputText
                        label={"Location"}
                        name={"location"}
                        control={control}
                      />
                      {/*Friends*/}
                      <AutoCompleteWithMulti
                        control={control}
                        name={"invitedFriendList"}
                        label={"Friend"}
                        items={FriendLists}
                        placeholder={"Invite your friends"}
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

              <Button
                sx={{ mr: 3 }}
                variant="outlined"
                color="error"
                onClick={handleClickOpenDeleteDialog}
              >
                Delete
              </Button>
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
                    You were going to watch {props.movie.name} with{" "}
                    {props.invited.map((friend, index) => (
                      <Box component={"span"} key={index}>
                        {friend +
                          (index === props.invited.length - 1 ? "" : ", ")}
                      </Box>
                    ))}{" "}
                    at time {moment(props.time).format("YYYY-MM-DD HH:mm")}.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      props.onDelete(props.index);
                      handleCloseDeleteDialog();
                    }}
                  >
                    Delete
                  </Button>
                  <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                </DialogActions>
              </Dialog>
              <Button variant="contained" color="success">
                More
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              EventID:
              <br />
              1030114
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
