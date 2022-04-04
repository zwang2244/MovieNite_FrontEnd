import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventListElement from "./EventListElement";
import axios from "axios";
import eventData from "../_mock/json/events.json";
import Box from "@mui/material/Box";
import {useQuery} from 'react-query';
import {getMovieEvents} from '../api/event';
import {TransitionGroup} from 'react-transition-group';
import {Collapse} from '@mui/material';
import {getMovieTrending} from '../api/movie';
import convertArrayToLabel, {
  convertLabelToArray,
} from '../utils/convertArrayToLabel';
//{"data":"[{\"location\":\"44 Portage Pass\",\"host\":6,\"eventID\":17,\"dateTime\":\"2021-01-16 00:00:00\"}]","message":"操作成功","code":1}
export default function Event() {
  const [currData, setCurrData] = useState(eventData.events.read);
  const userId = 6;
  // const {data: event} = useQuery(['event', userId], () => getMovieEvents(userId));
  // console.log(event);
  // const {data: test} = useQuery("movies", getMovieTrending);
  // console.log("===============");
  // console.log(test);
  //delete the corresponding event element
  const onDelete = (index) => {
    // currData.splice(index,index); splice is not working -- probably it is now a hard copy
    let temp = [];
    let count = 0;
    for (var i = 0; i < currData.length; i++) {
      if (index === i) {
        continue;
      }
      temp[count] = currData[i];
      count++;
    }
    setCurrData(temp);
    // console.log(temp);
  };

  const onEdit = (index, data) => {
    let temp = [];
    const { location, dataTime, invitedFriendList, movie } = data;
    for (let i = 0; i < currData.length; i++) {
      if (index === i) {
        temp[i] = {
          ...currData[i],
        };
        console.log(temp[i]);
        temp[i].movie.name = movie.label;
        temp[i].invited = convertLabelToArray(invitedFriendList);
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
                      invited={event.invited}
                      movie={event.movie}
                      time={event.time}
                      location={event.location}
                      index={index}
                      onDelete={onDelete}
                  />
                </Collapse>
            )
        )}
      </TransitionGroup>

      {/* <EventCard evetID={"1"} friends={"Friend1, Friend2"} time={"2021-01-16 00:00:00"}/> */}
    </Box>
  );
}
