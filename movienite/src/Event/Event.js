import React, { useEffect, useState } from "react";
import EventCard from './EventCard';
import EventListElement from "./EventListElement";
import axios from "axios";
import eventData from "../_mock/json/events.json";
import Box from "@mui/material/Box";
//{"data":"[{\"location\":\"44 Portage Pass\",\"host\":6,\"eventID\":17,\"dateTime\":\"2021-01-16 00:00:00\"}]","message":"操作成功","code":1}
export default function Event() {
    const [currData, setCurrData] = useState(eventData.events.read);
    // async function getMovieEvents() {
    //     const data  = await axios.get('http://localhost:8088/movieevent/hosted_event', {
    //         params: {
    //             userId: 6
    //         }
    //       })
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       })
    //       .then(function () {
    //         // always executed
    //       });
    // }

    // useEffect(() => {
    //     getMovieEvents();
    // }, []);

    //delete the corresponding event element
    const onDelete = (index) => {
      // currData.splice(index,index); splice is not working -- probably it is now a hard copy
      var temp = [];
      var count = 0;
      for(var i = 0; i < currData.length; i++){
        if(index === i){
            continue;
        }
        temp[count] = currData[i];
        count++;
      }
      setCurrData(temp);
      console.log(temp);
    }

    console.log(eventData.events.read);
    return (
      <Box
      sx={{
        alignItems: "center",
        pt: 10,
        width: "100%",
        justifyContent: "space-evenly",
      }}
      > 
        {currData.map((event, index)=> //index is used to locate which event block
          <EventListElement host={event.host} 
                            invited={event.invited} 
                            movie={event.movie}
                            time={event.time}
                            index={index}
                            onDelete={onDelete}/>
        )}
        {/* <EventCard evetID={"1"} friends={"Friend1, Friend2"} time={"2021-01-16 00:00:00"}/> */}
      </Box>
  );
}
