import React from "react";
import Grid from "@mui/material/Grid";
import { Avatar, Box } from "@mui/material";
import moment from "moment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import { useAuth } from "../../context/auth-context";

function UserComment(props) {
  const { userID } = useAuth().user;
  const { userId, userAvatar, userName, time, comment, onDelete, id } = props;
  return (
    <Box sx={{ mt: 3 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={userAvatar} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Box
            sx={{
              backgroundColor: "#F4F6F8",
              padding: "20px 6px 5px 20px",
              borderWidth: 1,
              position: "relative",
              // borderColor: "#000",
              // borderStyle: "solid",
              borderRadius: 4,
            }}
          >
            <h4 style={{ margin: 0, textAlign: "left" }}>{userName}</h4>
            <p style={{ textAlign: "left", color: "#637381" }}>{comment}</p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted {moment(moment.utc(time).local().format()).fromNow()}
            </p>
            {userID === userId && (
              <IconButton
                onClick={() => onDelete(id)}
                sx={{ position: "absolute", bottom: "11px", right: "10px" }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserComment;

UserComment.defaultProps = {
  userId: "20",
  userAvatar: "",
  userName: "Michel Michel",
  time: "2022-01-01T23:28:56.782Z",
  imdbId: "tt1877830",
  comment:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque, molestie porttitor metus. Pellentesque et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat quam lectus vitae ex.",
};
