import React, { useEffect, useState } from "react";
import EventListElement from "./EventListElement";
import eventData from "../_mock/json/events.json";
import Box from "@mui/material/Box";
import {TransitionGroup} from 'react-transition-group';
import {CircularProgress, Collapse} from '@mui/material';
import moment from 'moment';
import {deleteEvent, getMovieEvents} from '../api/event';
import {useQuery} from 'react-query';
import {dataToArray} from '../utils/dataToArray';
import {formatDataToForm} from '../utils/formatForm';
export default function EventParticipated() {
  const [currData, setCurrData] = useState([]);
  const userId = 20;
  const {data: event, isLoading: eventsLoading} = useQuery(['event', userId], () => getMovieEvents(userId, false), {
  });

  useEffect(() => {
    if (event && !eventsLoading) {
      const array = dataToArray(event)
      const dataCopy = [...array];
      setCurrData(formatDataToForm(dataCopy));
    }
  }, [event]);

  const onDelete = (index) => {
    let temp = [];
    let count = 0;
    deleteEvent(currData[index].eventId).then(r => console.log(r));
    for (var i = 0; i < currData.length; i++) {
      if (index === i) {
        continue;
      }
      temp[count] = currData[i];
      count++;
    }
    setCurrData(temp);
  };

  const onEdit = (index, dateTime, location) => {
    let temp = [];
    // console.log("Check+++++++++++");
    // console.log(dateTime);
    // console.log(location);
    for (let i = 0; i < currData.length; i++) {
      if (index === i) {
        temp[i] = {
          ...currData[i],
          location: location,
        };
        // dateTime Date()
        temp[i].dateTime = moment(dateTime.toString()).format("YYYY-MM-DD HH:mm");
      } else {
        temp[i] = currData[i];
      }
    }

    setCurrData(temp);
  }

  return (
    <Box
      sx={{
        alignItems: "center",
        pt: 10,
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      {
        eventsLoading ?  <CircularProgress sx={{mt: 30}} /> : (
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
        )
      }

      {/* <EventCard evetID={"1"} friends={"Friend1, Friend2"} time={"2021-01-16 00:00:00"}/> */}
    </Box>
  );
}
