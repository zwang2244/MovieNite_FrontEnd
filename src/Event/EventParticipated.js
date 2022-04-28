import React, { useEffect, useState } from "react";
import EventListElement from "./EventListElement";
import eventData from "../_mock/json/events.json";
import Box from "@mui/material/Box";
import { TransitionGroup } from "react-transition-group";
import { CircularProgress, Collapse } from "@mui/material";
import moment from "moment";
import { deleteEvent, getMovieEvents } from "../api/event";
import { useQuery } from "react-query";
import { dataToArray } from "../utils/dataToArray";
import { formatDataToForm } from "../utils/formatForm";
import EventListParticipated from "./EventListParticipated";
import { useAuth } from "../context/auth-context";
export default function EventParticipated() {
  // const [currData, setCurrData] = useState([]);
  const { user } = useAuth();
  const userId = user.userID;
  const {
    data: event,
    isLoading: eventsLoading,
    refetch: refetchEvents,
  } = useQuery(["event", userId], () => getMovieEvents(userId, false), {
    retry: true,
    retryOnMount: true,
  });

  if (eventsLoading) {
    return <CircularProgress sx={{ mt: 30 }} />;
  }

  const array = dataToArray(event);
  const dataCopy = [...array];
  const currData = formatDataToForm(dataCopy);
  // setCurrData(formatDataToForm(dataCopy));

  const onDelete = (index) => {
    refetchEvents();
  };

  const onEdit = (index, dateTime, location) => {
    refetchEvents();
  };

  return (
    <Box
      sx={{
        bgcolor: "#f0f2f5",
        alignItems: "center",
        pt: 10,
        pb: 3,
        minHeight: "100vh",
        height: "auto",
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <TransitionGroup>
        {currData.map(
          (
            event,
            index //index is used to locate which event block
          ) => (
            <Collapse key={index}>
              <EventListElement
                onEdit={onEdit}
                host={event.host}
                invitedFriendList={event.invitedFriendList}
                movie={event.movie}
                dateTime={event.dateTime}
                location={event.location}
                index={index}
                event={event.eventId}
                footage={event.footage}
                onDelete={onDelete}
                mode={"participated"}
              />
            </Collapse>
          )
        )}
      </TransitionGroup>
      {/* <EventCard evetID={"1"} friends={"Friend1, Friend2"} time={"2021-01-16 00:00:00"}/> */}
    </Box>
  );
}
